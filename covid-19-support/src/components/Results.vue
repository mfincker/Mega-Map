<template>
  <div id="results">
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
      />
      <filters :need="$route.params.need" :markers="markers" :activeFilters="activeFilters" @box-selected="boxSelected" />
      <results-list :markers="markers" :resource="resourceData" @resource-selected="passSelectedMarker" />
    </div>

    <!-- <BusinessDetails
      :infotype="'green'"
      :icon="'fa-tractor'"
      :business="currentBusiness"
      v-if="currentBusiness != null"
      @close-details="closeDetails"
    ></BusinessDetails> -->
  </div>
</template>

<script>
import { cartoBaseURL, sqlQueries, dayFilters, booleanFilters, complexFilters } from '@/constants'
import ResourceMap from '@/components/ResourceMap.vue'
import ResultsList from '@/components/ResultsList.vue'
// import BusinessDetails from '@/components/BusinessDetails.vue'
import Filters from '@/components/Filters.vue'
// import { haversineDistance, sortByDistance, addOrRemove } from '@/utilities'
import { haversineDistance, addOrRemove } from '@/utilities'
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
      activeFilters: []
    }
  },
  created() {
    const query = encodeURI(sqlQueries[this.$route.params.need])
    this.fetchData(query)
  },
  methods: {
    async fetchData(query) {
      try {
        const res = await fetch(cartoBaseURL + '&q=' + query)
        const entries = await res.json()
        this.entries = entries.rows
        console.log(this.entries)
      } catch (e) {
        console.log(e)
      }
    },
    boxSelected: function (filter) {
      this.activeFilters = addOrRemove(this.activeFilters, filter)
      console.log(this.activeFilters)
    },
    centerUpdated(center) {
      this.centroid = [center.lat, center.lng]
    },
    boundsUpdated: function (bounds) {
      this.bounds = bounds
    },
    passSelectedMarker: function (val) {
      console.log(val)
      this.resourceData = val
      this.showList = false
    },
    closeDetails: function () {
      return
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
      const countyLatLon = {
        'san-francisco': { lat: 37.7749, lon: -122.4194, zoom: 13 },
        alameda: { lat: 37.8097, lon: -122.25328, zoom: 13 },
        anywhere: { lat: 37.594, lon: -122.223, zoom: 10 }
      }

      if (this.$route.query.near) {
        return countyLatLon[this.$route.query.near]
      }
      return countyLatLon['anywhere']
    }
  },
  watch: {
    $route(to, from) {
      // update entries based on need
      if (to.params && to.params.need && to.params.need != from.params.need) {
        const query = encodeURI(sqlQueries[to.params.need])
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

#map-details {
  display: flex;
  flex-direction: column;
  height: 100%;
}
</style>
