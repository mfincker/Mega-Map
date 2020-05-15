<template>
  <div class="home">
    <app-header :language="language.name" @language-selected="changeLanguage"/>
    <h5 v-if="initialSearch">{{ $tc('sidebar.what-are-you-looking-for', 1) }}</h5>
      <search 
      :need="need" 
      :nearLocation="nearLocation"
      :userLocation="userLocation"
      @need-selected="needSelected"
      @near-location-selected="nearLocationSelected"
    />
     <router-view/>
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
      this.initialSearch = false
    }
    if (this.$route.query && this.$route.query.near) {
      this.nearLocation = this.$route.query.near
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
      nearLocation: null,
      userLocation: { lat: null, lon: null },
      errorStr: null,
      initialSearch: true
    }
  },
  methods: {
    needSelected: function (val) {
      this.need = val
      console.log("needSelected:")
      console.log(val)

      if (this.nearLocation) {
        console.log('going to ' + this.need)
        this.$router.push({ path: this.need, query: { near: this.nearLocation} })
        this.initialSearch = false
      } 

      // window.gtag('event', 'What do you need?', { event_category: 'Search - (' + this.language.name + ')', event_label: val })
    },
    nearLocationSelected: function(val) {
      this.nearLocation = val
      console.log("nearLocationSelected:")
      console.log(val)

      if (this.nearLocation && this.need) {
        console.log('going to ' + this.need)
        this.$router.push({ path: this.need, query: { near: this.nearLocation} })
        this.initialSearch = false
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
      console.log(to)
      // update need based on route
      if (to.path == '/') {
        this.initialSearch = true
        this.need = null
        this.nearLocation = null
      } else {
        this.initialSearch = false
        if (to.params.need) {
          this.need = to.params.need
        }
        if (to.query.near) {
          this.nearLocation = to.query.near
        }
      }
    }
  }
}
</script>

<style scope>
h5 {
  text-align: center;
  width: 300px;
  margin: 0 auto;
  font-weight: 300 !important;
  padding-top: 50px !important;
  padding-bottom: 20px !important;
}

.home {
  height: 100vh;
  /*border: 1px solid blue;*/
  display: flex;
  flex-direction: column;
}

#search-result {
  position: relative;
  width: 100%;
  flex: 1 1 auto;
  /*border: 1px solid black;*/
}

</style>
