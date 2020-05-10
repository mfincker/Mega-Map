<template>
  <div class="home">
    <app-header :language="language.name" @language-selected="changeLanguage" />
    <search 
      :need="need" 
      :userLocation="userLocation"
      @need-selected="needSelected"
      @near-location-selected="nearLocationSelected"
    />
     <router-view/>
    <!-- <about-us-modal /> -->

    <!-- <div class="d-flex" id="wrapper" :class="{ toggled: isFilterOpen }" v-if="!!entries">
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
    </div> -->
  </div>
</template>

<script>
import AppHeader from '@/components/Header.vue'
import Search from '@/components/Search.vue'

export default {
  name: 'app',
  props: {
    msg: String
  },
  created() {
    // Get user location
    this.getUserLocation()

    if (this.$route.params && this.$route.params.need) {
      this.need = this.$route.params.need
    }
  },
  components: {
    AppHeader,
    Search
  },
  data() {
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    return {
      need: null,
      language: { name: 'English', iso: 'en' },
      darkModeMediaQuery: darkModeMediaQuery,
      darkMode: darkModeMediaQuery.matches,
      nearLocation: { lat: null, lon: null },
      userLocation: { lat: null, lon: null },
      errorStr: null
    }
  },
  methods: {
    needSelected: function (val) {
      this.need = val
      console.log("needSelected:")
      console.log(val)

      if (this.nearLocation.lat && this.nearLocation.lon && this.need) {
        console.log('going to ' + this.need)
        this.$router.push({ path: this.need, query: { lat: this.nearLocation.lat, lon: this.nearLocation.lon } })
      } 
      // window.gtag('event', 'What do you need?', { event_category: 'Search - (' + this.language.name + ')', event_label: val })
    },
    nearLocationSelected: function(val) {
      this.nearLocation = val
      console.log("nearLocationSelected:")
      console.log(val)

      if (this.nearLocation.lat && this.nearLocation.lon && this.need) {
        console.log('going to ' + this.need)
        this.$router.push({ path: this.need, query: { lat: this.nearLocation.lat, lon: this.nearLocation.lon } })
      } 
    },
    changeLanguage: function (item) {
      this.language = item
      this.$root.updateLang(item.iso)
    },

    async getUserLocation() {
      try {
        const location = await this.requestUserLocation()
        this.userLocation = { lon: location.coords.longitude, lat: location.coords.latitude }
      } catch (e) {
        this.errorStr = e.message
      }
    },
    async requestUserLocation() {
      return new Promise((resolve, reject) => {
        if (!('geolocation' in navigator)) {
          reject(new Error('Geolocation is not available.'))
        }
        navigator.geolocation.getCurrentPosition(
          (pos) => resolve(pos),
          (err) => reject(err)
        )
      })
    }
  },
  watch: {
    $route(to) {
      // update need based on route
      if (to.params && to.params.need) {
      this.need = to.params.need
    } else {
      this.need = null
    }
    }
  }
}
</script>

<style></style>
