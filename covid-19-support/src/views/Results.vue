<template>
  <div id="results" :class="{ noMap: !displayMap }">
    <div id="map-details" :class="{ noMap: !displayMap }">
      <resource-map
        v-if="displayMap"
        :markers="markers"
        @bounds="boundsUpdated"
        @center="centerUpdated"
        @marker-selected="passSelectedMarker"
        :mapUrl="mapUrl"
        :nearLatLonZoom="nearLatLonZoom"
        :resource="resourceData"
        :zoomDiff="zoomDiff"
        :resetMap="resetMap"
      />
      <div id="result-details" ref="result-details" :class="{ noMap: !displayMap }">
        <filters
          ref="filters"
          :class="{ noMap: !displayMap }"
          :need="$route.params.need"
          :activeFilters="activeFilters"
          @box-selected="boxSelected"
        />
        <results-list
          :class="{ noMap: !displayMap }"
          :fetchDataState="fetchDataState"
          :markers="markers"
          :resource="resourceData"
          @resource-selected="passSelectedMarker"
          @zoom-out="zoomOut"
          :displayMap="displayMap"
          @scroll="scroll"
        />
      </div>
    </div>
  </div>
</template>

<script>
import 'whatwg-fetch'
import { cartoBaseURL, booleanFilters, complexFilters, dayFilters, MappedRouteQueries, zipDBName } from '../lib/constants'
import ResourceMap from '../components/ResourceMap'
import ResultsList from '../components/ResultsList'
import Filters from '../components/Filters'
import { addOrRemove, haversineDistance, sortByDistance } from '../lib/utilities'
import { latLng } from 'leaflet'
import Logger from '../lib/Logger'
import QueryBuilder from '../lib/QueryBuilder'
import StatusEnum from '../lib/enums/StatusEnum'

export default {
  name: 'results',
  components: {
    ResourceMap,
    ResultsList,
    Filters
  },
  data() {
    return {
      mapUrl: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}.png',
      bounds: null,
      centroid: [null, null],
      resourceData: { resourceId: null, isSetByMap: false },
      activeFilters: [],
      zoomDiff: 0,
      fetchDataState: StatusEnum.LOADING,
      nearLatLonZoom: { lat: null, lon: null, zoom: null },
      resetMap: false,
      county: {}
    }
  },
  async created() {
    await this.fetchMapCenter(this.$route)
    await this.setUpResults(this.$route)
  },
  methods: {
    async setUpResults(route) {
      const { conditions: resourceConditions, selections: resourceSelections } = MappedRouteQueries.get(route.params.need)
      const generatedQuery = new QueryBuilder()
        .select(...resourceSelections)
        .condition(...resourceConditions)
        .genStringSelectQuery()
      this.fetchAndStoreData(generatedQuery)
    },
    async fetchMapCenter(route) {
      try {
        const generatedZipQuery = new QueryBuilder(zipDBName)
          .select('*')
          .condition(['zip', parseInt(route.query.near)])
          .genStringSelectQuery()

        const res = await fetch(cartoBaseURL + '&q=' + generatedZipQuery)

        const row = await res.json()
        if (row.rows.length == 1) {
          this.nearLatLonZoom = { lat: row.rows[0].lat, lon: row.rows[0].lon, zoom: 13 }
          this.county = Object.keys(row.rows[0]).filter((attr) => {
            return row.rows[0][attr] == 1 && attr != 'cartodb_id'
          })
        } else {
          alert(this.$t('message.error_getting_zip'))
          this.$router.push('/')
        }
      } catch (e) {
        console.log(e)
        alert(this.$t('message.error_getting_zip'))
        Logger.logEvent('Zip fetch error', { event_category: 'data_fetch', event_label: 'error ' + e })
        this.$router.push('/')
      }
    },
    async fetchAndStoreData(query) {
      try {
        const liveQueryFromStore = this.$store.getters.getCurrentLiveQuery
        if (query === liveQueryFromStore.query) {
          return liveQueryFromStore.entries
        }
        this.fetchDataState = StatusEnum.LOADING

        const response = await (await fetch(cartoBaseURL + '&q=' + query)).json()

        this.$store.commit('setCurrentLiveQuery', {
          entries: response.rows,
          query: query
        })
        this.fetchDataState = StatusEnum.LOADED
      } catch (e) {
        this.fetchDataState = StatusEnum.ERROR
        Logger.logEvent('Data fetch error', { event_category: 'data_fetch', event_label: 'error ' + e })
        console.error(e)
      }
    },
    boxSelected: function (filter) {
      this.activeFilters = addOrRemove(this.activeFilters, filter)
    },
    centerUpdated(center) {
      this.centroid = [center.lat, center.lng]
    },
    boundsUpdated: function (bounds) {
      this.bounds = bounds
    },
    passSelectedMarker: function (val) {
      this.resourceData = val
      this.showList = false
    },
    zoomOut() {
      this.zoomDiff = 2
      this.$nextTick(() => (this.zoomDiff = 0))
    },
    scroll(offset) {
      if (this.displayMap) {
        this.$refs['result-details'].scrollTo(0, offset + this.$refs['filters'].$el.offsetHeight)
      }
    }
  },
  computed: {
    currentBusiness() {
      if (this.resourceData == null || this.markers == null) {
        return null
      }
      return this.markers.length > 0 && this.resourceData.resourceId > -1
        ? this.markers.filter((c) => c.cartodb_id == this.resourceData.resourceId)[0]
        : null
    },
    displayMap() {
      const needWithMap = ['meal', 'free_grocery', 'snap_wic_retailer', 'free_food', 'school_meal', 'ballot_drop']
      return needWithMap.includes(this.$route.params.need) || this.activeFilters.includes('in_person')
    },
    markers() {
      // TODO(Complexity) Improve Cyclomatic complexity of method
      const liveQueryFromStore = this.$store.getters.getCurrentLiveQuery
      if (!liveQueryFromStore.entries) {
        return null
      }

      let markers = liveQueryFromStore.entries

      const dayFilter = dayFilters[new Date().getDay()]

      // TODO(Typescript) Add Boolean Filters Union type to avoid this issue
      /**
       * There should be no need to check for outdated filters
       */
      // Filter out results based on boolean filters

      this.activeFilters.forEach((element) => {
        if (booleanFilters.has(element)) {
          markers = markers.filter((c) => c[element] == 1)
        }
      })

      // Filter out items based on complexFilters
      complexFilters.forEach((f) => {
        if (this.activeFilters.includes(f.name)) {
          markers = markers.filter((c) => {
            const bools = f.columns.map((d) => c[d] == 1)
            return f.combine(bools)
          })
        }
      })
      // Filter out markers based on map bounds
      if (this.displayMap && this.bounds) {
        markers = markers
          .filter((c) => c.lat && c.lon)
          .filter((c) => {
            return this.bounds.contains(latLng(c.lat, c.lon))
          })
      }
      markers = markers.map((c) => ({
        ...c,
        isOpen: c[dayFilter] !== '0' && c[dayFilter] !== '',
        distance: haversineDistance(this.centroid, [c.lat, c.lon], true)
      })) //.sort(sortByDistance)
      if (this.activeFilters.includes('open_today')) {
        markers = markers.filter((c) => c.isOpen)
      }
      // Sorting
      if (this.displayMap) {
        markers = markers.sort(sortByDistance)
      }
      this.$store.commit('setCurrentMarkers', markers)
      markers = this.$store.getters.getCurrentMarkers
      return markers
    }
  },
  watch: {
    $route: async function (to, from) {
      const { conditions: fromConditions, selections: fromSelections } = MappedRouteQueries.get(from.params.need)

      const old_query = new QueryBuilder()
        .select(...fromSelections)
        .condition(...fromConditions)
        .genStringSelectQuery()

      // has near changed?
      if (!(typeof to.query.near === 'undefined') && to.query.near == from.query.near) {
        this.resetMap = true
        this.$nextTick(() => {
          this.resetMap = false
        })
      } else {
        await this.fetchMapCenter(to)
      }

      const { conditions: toConditions, selections: toSelections } = MappedRouteQueries.get(to.params.need)

      const new_query = new QueryBuilder()
        .select(...toSelections)
        .condition(...toConditions)
        .genStringSelectQuery()

      console.log('OLD QUERY: ' + old_query + '\nNEW QUERY: ' + new_query)
      if (old_query != new_query) {
        const { conditions: fetchConditions, selections: fetchSelections } = MappedRouteQueries.get(to.params.need)

        const fetchQuery = new QueryBuilder()
          .select(...fetchSelections)
          .condition(...fetchConditions)
          .genStringSelectQuery()

        this.fetchAndStoreData(fetchQuery)
        this.activeFilters = []
      }
    }
  }
}
</script>

<style type="text/css">
#results {
  width: 100%;
  height: 100%;
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  position: absolute;
}

#results.noMap {
  padding-top: 96px;
}

#map-details {
  display: flex;
  flex-direction: column;
  height: 100%;
}

#map-details.noMap {
  padding-top: 8px;
  position: relative !important;
}

@media (min-width: 1024px) {
  #map-details {
    flex-wrap: wrap;
    padding-top: 104px;
  }

  #result-details {
    width: 50% !important;
  }

  #result-details.noMap {
    width: 100% !important;
  }
}

#result-details {
  flex: 1 1 100%;
  overflow-y: auto;
  scrollbar-color: $gray-900 $gray-700;
  width: 100%;
  z-index: 500;
  background-color: #e9ecef;
}
</style>
