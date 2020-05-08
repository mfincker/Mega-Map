<template>
  <div class="home">
    <app-header :language="language.name" @language-selected="changeLanguage" />
    <!-- <about-us-modal /> -->
    <div class="d-flex" id="wrapper" :class="{ toggled: isFilterOpen }">
      <search-filter
        :isFilterOpen="isFilterOpen"
        :need="need"
        :day="day"
        :filteredMarkers="filteredMarkers"
        :highlightFilteredMarkers="highlightFilteredMarkers"
        :location="locationData"
        :show-list="showList"
        @location-selected="passLocation"
        @toggle="isFilterOpen = !isFilterOpen"
        @need-selected="needSelected"
        @day-selected="daySelected"
      />

      <div id="page-content-wrapper">
        <highlights
          :need="need"
          :class="{ toggled: isFilterOpen }"
          :filteredMarkers="highlightFilteredMarkers"
          :highlightFilters="highlightFilters"
          @box-selected="boxSelected"
        />

        <resource-map
          :filteredMarkers="filteredMarkers"
          :class="{ noselection: need == 'none' }"
          :location="locationData"
          @location-selected="passLocation"
          @bounds="boundsUpdated"
          @center="centerUpdated"
          :mapUrl="mapUrl"
          :userLocation="userLocation"
        />
      </div>
    </div>
  </div>
</template>

<script>
import AppHeader from './components/Header.vue'
import SearchFilter from './components/SearchFilter.vue'
import Highlights from './components/Highlights.vue'
import ResourceMap from './components/ResourceMap.vue'
// import AboutUsModal from './components/AboutUs.vue'
import { latLng } from 'leaflet'
// import { haversineDistance } from './utilities'
import { haversineDistance, sortByDistance } from './utilities'

// import { spreadsheetUrl, weekdays, dayFilters, booleanFilters, dayAny } from './constants'
import { cartoBaseURL, sqlQueries, dayFilters, booleanFilters, dayAny, complexFilters } from './constants'

function extend(obj, src) {
  for (var key in src) {
    obj.push(src[key])
  }
  return obj
}

function addOrRemove(array, item) {
  const exists = array.includes(item)

  if (exists) {
    return array.filter((c) => {
      return c !== item
    })
  } else {
    const result = array
    result.push(item)
    return result
  }
}

export default {
  name: 'app',
  props: {
    msg: String
  },
  watch: {
    currentPage: 'fetchData'
  },
  created() {
    // Get user location
    this.getUserLocation()
    // Get all data
    this.fetchData(query)
  },
  components: {
    AppHeader,
    Highlights,
    SearchFilter,
    ResourceMap
    // AboutUsModal
  },
  data() {
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    return {
      entries: null,
      need: 'none',
      day: dayAny,
      isFilterOpen: true,
      language: { name: 'English', iso: 'en' },
      locationData: { locValue: null, isSetByMap: false },
      showList: false,
      highlightFilters: [],
      bounds: null,
      centroid: [35.91371, -79.057919],
      darkModeMediaQuery: darkModeMediaQuery,
      darkMode: darkModeMediaQuery.matches,
      mapUrl: '',
      userLocation: { lat: null, lon: null },
      errorStr:null
    }
  },
  mounted() {
    this.mapUrl = this.darkMode
      ? 'https://{s}.basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}.png'
      : 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}.png'
    this.darkModeMediaQuery.addListener((e) => {
      this.darkMode = e.matches
      this.mapUrl = this.darkMode
        ? 'https://{s}.basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}.png'
        : 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}.png'
    })
  },
  methods: {
    centerUpdated(center) {
      this.centroid = [center.lat, center.lng]
    },
    boundsUpdated: function (bounds) {
      this.bounds = bounds
    },
    getDay: function (day) {
      if (day == 0) {
        return 6
      } else {
        return day - 1
      }
    },
    boxSelected: function (content) {
      this.highlightFilters = addOrRemove(this.highlightFilters, content.need)
    },
    isAnyDaySelected(day) {
      return day >= dayAny
    },
    needSelected: async function (val) {
      this.entries = null
      this.need = val
      this.highlightFilters = []

      const query = encodeURI(sqlQueries[val])
      this.fetchData(query)
      // window.gtag('event', 'What do you need?', { event_category: 'Search - (' + this.language.name + ')', event_label: val })
    },
    daySelected: function (val) {
      this.day = val
      this.highlightFilters = []
      // window.gtag('event', 'When do you need it?', {
      //   event_category: 'Search - (' + this.language.name + ')',
      //   event_label: weekdays[this.getDay(val)].day
      // })
    },
    changeLanguage: function (item) {
      this.language = item
      this.$root.updateLang(item.iso)
    },
    async fetchData(query) {
      const res = await fetch(cartoBaseURL + '&q=' + query)
      const entries = await res.json()
      this.entries = entries.rows
      console.log(this.entries)
    },
    async getUserLocation() {
      try {
        const location = await this.requestUserLocation();
        this.userLocation = { lon: location.coords.longitude, lat: location.coords.latitude }
      } catch(e) {
        this.errorStr = e.message;
      }
    },
    async requestUserLocation() {
      return new Promise((resolve, reject) => {
        if(!("geolocation" in navigator)) {
          reject(new Error('Geolocation is not available.'))
        }
        navigator.geolocation.getCurrentPosition(pos => {
          resolve(pos)
        }, err => {
          reject(err)
        })
      })
    },
    passLocation: function (val) {
      this.locationData = val
      this.showList = false
      this.isFilterOpen = true
      // var proName = this.filteredMarkers[val.locValue].marker.provider_addloc.$t
      //   ? ', ' + this.filteredMarkers[val.locValue].marker.provider_addloc.$t
      //   : ''

      //   window.gtag('event', val.isSetByMap ? 'Marker clicked' : 'List item clicked', {
      //     event_category: 'View details - (' + this.language.name + ')',
      //     event_label: this.filteredMarkers[val.locValue].marker.provider_name + proName
      //   })
    }
  },
  computed: {
    filteredMarkers() {
      if (this.entries == null) return null

      // Double check sql results for data quality but assumes we got the right resources based on query
      let markers = this.entries.filter(
          (c) => c.status == 1 && c.lat != 'error' && c.lon != 'error' && c.lat && c.lon
        )

      // Filter out the boolean items
      this.highlightFilters.forEach((element) => {
        if (booleanFilters.includes(element)) {
          markers = markers.filter((c) => c[element] == 1)
        }
      })

      // Filter out items based on complexFilters
      complexFilters.forEach((f) => {
        if (this.highlightFilters.includes(f.name)) {
          markers = markers.filter((c) => {
            const bools = f.columns.map((d) => c[d] == 1)
            return f.combine(bools)
          })
        }
      })

      var today = new Date().getDay()
      var selectedDay = today
      if (!this.isAnyDaySelected(this.day)) {
        selectedDay = this.day
      }

      const dayFilter = dayFilters[this.getDay(selectedDay)]
      var open = markers.filter((c) => c[dayFilter] !== '0')
      var closed = markers.filter((c) => c[dayFilter] == '0')

      var retList = extend(
        open.map((marker) => ({
          marker,
          oc: true,
          distance: haversineDistance(this.centroid, [marker.lat, marker.lon], true)
        })),
        closed.map((marker) => ({
          marker,
          oc: false,
          distance: haversineDistance(this.centroid, [marker.lat, marker.lon], true)
        }))
      ).sort(sortByDistance)

      return retList
    },
    highlightFilteredMarkers() {
      if (this.entries == null) return null

      var contained = [] //makers in map boundingbox
      this.filteredMarkers.forEach((m) => {
        if (this.bounds.contains(latLng(m.marker.lat, m.marker.lon))) contained.push(m)
      })

      if (!this.isAnyDaySelected(this.day)) {
        return contained
      }

      return contained.map((m) => {
        let obj = Object.assign({}, m)
        obj.oc = true
        return obj
      })
    }
  }
}
</script>

<style></style>
