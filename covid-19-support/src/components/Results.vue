<template>
  <div id="results" :class="{ noMap: !displayMap }">
    <div id="map-details">
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
      />
      <filters :need="$route.params.need" :markers="markers" :activeFilters="activeFilters" @box-selected="boxSelected" />
      <results-list :markers="markers" :resource="resourceData" @resource-selected="passSelectedMarker" @zoom-out="zoomOut"/>
    </div>
  </div>
</template>

<script>
import { cartoBaseURL, sqlQueries, dayFilters, booleanFilters, complexFilters, countyLatLon } from '@/constants'
import ResourceMap from '@/components/ResourceMap.vue'
import ResultsList from '@/components/ResultsList.vue'
// import BusinessDetails from '@/components/BusinessDetails.vue'
import Filters from '@/components/Filters.vue'
// import { haversineDistance, sortByDistance, addOrRemove } from '@/utilities'
import { haversineDistance, addOrRemove } from '@/utilities'
// import { haversineDistance } from '@/utilities'
import { latLng } from 'leaflet'

export default {
  name: 'results',
  components: {
    ResourceMap,
    ResultsList,
    // BusinessDetails,
    Filters
  },
  data() {
    return {
      entries: null,
      mapUrl: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}.png',
      bounds: null,
      centroid: [null, null],
      resourceData: { resourceId: null, isSetByMap: false },
      activeFilters: [],
      zoomDiff: 0
    }
  },
  created() {
    const query = encodeURI(sqlQueries[this.$route.params.need])
    this.fetchData(query)
    // console.log('results created')
  },
  methods: {
    async fetchData(query) {
      try {
        const res = await fetch(cartoBaseURL + '&q=' + query)
        const entries = await res.json()
        this.entries = entries.rows
        // console.log(res)
      } catch (e) {
        console.log(e)
      }
    },
    boxSelected: function (filter) {
      this.activeFilters = addOrRemove(this.activeFilters, filter)
      // console.log('in results.boxSelected')
      // console.log(this.activeFilters)
    },
    centerUpdated(center) {
      this.centroid = [center.lat, center.lng]
    },
    boundsUpdated: function (bounds) {
      this.bounds = bounds
    },
    passSelectedMarker: function (val) {
      // console.log('passSelectedMarker')
      // console.log(val)
      this.resourceData = val
      this.showList = false
    },
    zoomOut() {
      this.zoomDiff = 2
      this.$nextTick(() => this.zoomDiff = 0)
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
      const needWithMap = ['meal', 'free_grocery', 'snap_wic_retailer']
      return needWithMap.includes(this.$route.params.need)
    },
    markers() {
      if (!this.entries) {
        return null
      }
      var today = new Date().getDay()
      const dayFilter = dayFilters[today]

      let markers = this.entries
        .filter((c) => c.lat && c.lon)
        .filter((c) => {
          return this.bounds.contains(latLng(c.lat, c.lon))
        })

      // Filter out the boolean items
      this.activeFilters.forEach((element) => {
        if (booleanFilters.includes(element)) {
          markers = markers.filter((c) => c[element] == '1')
        }
      })
      // Filter out items based on complexFilters
      complexFilters.forEach((f) => {
        if (this.activeFilters.includes(f.name)) {
          markers = markers.filter((c) => {
            const bools = f.columns.map((d) => c[d] == '1')
            return f.combine(bools)
          })
        }
      })

      markers = markers.map((c) => ({
        ...c,
        isOpen: c[dayFilter] !== '0',
        distance: haversineDistance(this.centroid, [c.lat, c.lon], true)
      })) //.sort(sortByDistance)

      return markers
    },
    nearLatLonZoom() {
      if (this.$route.query.near) {
        return countyLatLon[this.$route.query.near]
      }
      return countyLatLon['anywhere']
    }
  },
  watch: {
    $route: function (to, from) {
      // update entries based on need
      console.log('changing route')
      if (to.params && to.params.need && to.params.need != from.params.need) {
        const query = encodeURI(sqlQueries[to.params.need])
        this.activeFilters = []
        // console.log(this.activeFilters)
        this.fetchData(query)
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

.noMap {
  position: relative !important;
}

#map-details {
  display: flex;
  flex-direction: column;
  height: 100%;
}
</style>
