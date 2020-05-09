<template>
  <div id="search">
    <b-list-group horizontal class="need-location-group">
      <b-list-group-item>
<!--         <h6>{{ $t('sidebar.what-do-you-need') }}</h6> -->
        <b-form-select :value="need" :options="needOptions" @change="(opt) => $emit('need-selected', opt)" />
      </b-list-group-item>
      <b-list-group-item>
        <!-- <h6>{{ $t('sidebar.what-do-you-need') }}</h6> -->
        <b-form-select v-model="location" :options="locationOptions" @change="(opt) => $emit('near-location-selected', opt)" />
      </b-list-group-item>
    </b-list-group>
<!--     <b-list-group class="need-location-group">
      <b-list-group-item variant="sideNav">
        <h6>{{ $t('searchbar.what-do-you-need') }}</h6>
        <b-form-select :value="need" :options="needOptions" @change="(opt) => $emit('need-selected', opt)" />
      </b-list-group-item>
      <b-list-group-item variant="sideNav">
        <h6>{{ $t('searchbar.where') }}</h6>
        <b-form-select :value="day" :options="dayOptions" @change="(opt) => $emit('day-selected', opt)" />
      </b-list-group-item>
    </b-list-group> -->
  </div>
</template>

<script>


export default {
  name: 'search',
  data() {
    return {
      location: null
    }
  },
  props: {
    need: String,
    userLocation: { lat: Number, lon: Number }
  },
  computed: {
    needOptions() {
      return [
        { value: null, text: this.$tc('sidebar.what-do-you-need', 1), disabled: true },
        { value: 'meal', text: this.$tc('category.meal', 2) },
        { value: 'free_grocery', text: this.$tc('category.free_grocery', 2) },
        { value: 'snap_wic_retailer', text: this.$tc('category.snap_wic_retailer', 2) }
      ]
    },
    locationOptions() {
      let locations =  [
        { value: null, text: this.$tc('sidebar.where', 1), disabled: true },
        { value: {lat: 37.633192, lon: -121.938116}, text: this.$tc('county.alameda') }
      ]

      if (this.userLocation && this.userLocation.lat && this.userLocation.lon) {
        locations.splice(1, 0, { value: this.userLocation, text: this.$tc('sidebar.current_location', 1) })
      }

      return locations
    }
  }
}
</script>

<style lang="scss" scoped>
.custom-select {
  font-size: 0.8rem;
}

#search {
  margin: auto;
}

.b-form-select {
  min-width: 500px;
}

#search-filter-wrapper {
  margin-left: -290px;
  -webkit-transition: margin 0.25s ease-out;
  -moz-transition: margin 0.25s ease-out;
  -o-transition: margin 0.25s ease-out;
  transition: margin 0.25s ease-out;
  z-index: 1035;
  max-height: 100vh;
  max-width: 294px;
  background: theme-color('secondary');
  @media (prefers-color-scheme: dark) {
    background: theme-color('secondaryDark');
  }
}

#wrapper.toggled #search-filter-wrapper {
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
  @media (prefers-color-scheme: dark) {
    box-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
  }
}

.tab,
#wrapper.toggled .tab {
  z-index: 0;
  box-shadow: 0px 0px 14px 0px rgba(0, 0, 0, 0.4);
  @media (prefers-color-scheme: dark) {
    box-shadow: 0px 0px 14px 0px rgba(255, 255, 255, 0.5);
  }
}

.sidebar-heading {
  padding: 0.875rem 1.25rem;
  font-size: 1.2rem;
}

.list-group {
  width: 290px;
  /* border-bottom: solid 1px rgba(0, 0, 0, 0.125); */
  padding: 0;
}

.list-group-item {
  border: none !important;
  padding: 0 1.25rem;
  border-bottom: none;
}

.list-group.need-location-group {
  padding: 1rem 0 0 0 !important;
}

.list-group-flush.need-location-group .list-group-item:first-child {
  padding-bottom: 1rem !important;
}

.side-nav {
  background: theme-color('secondary');
  @media (prefers-color-scheme: dark) {
    background: theme-color('secondaryDark');
  }
}

.tab {
  font-size: 0.8rem;
  width: 30px;
  height: 60px;
  position: absolute;
  top: 169px;
  z-index: 500;
  left: 0;
  background: theme-color('secondary');
  @media (prefers-color-scheme: dark) {
    background: theme-color('secondaryDark');
  }
  transition: left 0.25s ease-out;
  cursor: pointer;
}

#wrapper.toggled .tab {
  left: 290px;
}

#wrapper.toggled .tab i {
  transform: rotate(90deg);
}
.tab i {
  font-size: 1.5rem;
  color: theme-color('buttons');
  transform: rotate(-90deg);
  margin-top: 18px;
  margin-left: 7px;
}

@media (min-width: 768px) {
  .tab {
    margin-left: 0;
    font-size: 1rem;
  }
}
</style>
