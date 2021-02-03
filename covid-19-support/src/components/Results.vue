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
          :markers="markers"
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
import { cartoBaseURL, sqlQueries, booleanFilters, complexFilters, dayFilters, MappedRouteQueries, zipDBName } from '../constants'
import ResourceMap from './ResourceMap'
import ResultsList from './ResultsList'
import Filters from './Filters'
import { addOrRemove, haversineDistance, sortByDistance } from '../utilities'
import { latLng } from 'leaflet'
import Logger from '../lib/Logger'
import QueryBuilder from '../lib/QueryBuilder'

export const StatusEnum = Object.freeze({ loading: 1, error: 2, loaded: 3 })

export default {
  name: 'results',
  components: {
    ResourceMap,
    ResultsList,
    Filters
  },
  data() {
    return {
      entries: null,
      mapUrl: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}.png',
      // mapUrl:
      // 'https://api.mapbox.com/styles/v1/stanford-datalab/ckafqd6k80vmc1jmoyy9hswlu/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic3RhbmZvcmQtZGF0YWxhYiIsImEiOiJja2FmanA0bnMwZG9rMnJvNzAyY3Q5bXRkIn0.utHFnJ3XvT1_0Shoaio5Zw'
      bounds: null,
      centroid: [null, null],
      resourceData: { resourceId: null, isSetByMap: false },
      activeFilters: [],
      zoomDiff: 0,
      fetchDataState: StatusEnum.loading,
      nearLatLonZoom: { lat: null, lon: null, zoom: null },
      resetMap: false,
      county: {},
      showEditForm: false,
      editedLocation: null,
      cachedEntries: {}
    }
  },
  created() {
    this.setUpMap(this.$route)
  },
  methods: {
    async setUpMap(route) {
      const { conditions: resourceConditions, selections: resourceSelections } = MappedRouteQueries.get(route.params.need)

      // Get map center
      await this.fetchMapCenter(this.$route)

      const generatedQuery = new QueryBuilder()
        .select(...resourceSelections)
        .condition(...resourceConditions)
        .genStringSelectQuery()

      this.fetchData(generatedQuery)
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
    async fetchData(query) {
      try {
        // console.log(cartoBaseURL + '&q=' + query)
        if (!this.cachedEntries[query]) {
          this.fetchDataState = StatusEnum.loading
          const res = await fetch(cartoBaseURL + '&q=' + query)
          this.handleErrors(res)
          const entries = await res.json()
          this.cachedEntries[query] = entries.rows
        }
        this.entries = this.cachedEntries[query]
        this.fetchDataState = StatusEnum.loaded
      } catch (e) {
        this.fetchDataState = StatusEnum.error
        Logger.logEvent('Data fetch error', { event_category: 'data_fetch', event_label: 'error ' + e })

        console.log(e)
      }
    },
    handleErrors(response) {
      if (!response.ok) {
        throw Error(response.statusText)
      }
    },
    closeEditForm() {
      this.showEditForm = false
    },
    displayEditForm(item) {
      this.showEditForm = true
      this.editedLocation = item
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
    },
    buildQuery(route, log = true) {
      // query building
      let query = sqlQueries[route.params.need]

      if (log) {
        // log resource selection
        Logger.logEvent('Resource selection', {
          event_category: 'language - (' + this.$i18n.locale + ')',
          event_label: 'resource - ' + route.params.need
        })

        // log location selection
        if (!(typeof route.query.near === 'undefined')) {
          Logger.logEvent('Location selection', {
            event_category: 'language - (' + this.$i18n.locale + ')',
            event_label:
              'county - ' +
              this.county.reduce((a, c) => {
                return a + c + ' '
              }, '')
          })
        } else {
          Logger.logEvent('Location selection', {
            event_category: 'language - (' + this.$i18n.locale + ')',
            event_label: 'undefined'
          })
        }
      }
      return encodeURI(query)
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
      if (!this.entries) {
        return null
      }
      var today = new Date().getDay()
      const dayFilter = dayFilters[today]
      let markers = this.entries

      // Filter out results based on boolean filters
      this.activeFilters.forEach((element) => {
        if (booleanFilters.includes(element)) {
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

        this.fetchData(fetchQuery)
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
