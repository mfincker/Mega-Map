<template>
    <div>
    <div>Hello </div>
<!--     <filters
          :need="$route.params.need"
          :class="{ toggled: isFilterOpen }"
          :filteredMarkers="highlightFilteredMarkers"
          :highlightFilters="highlightFilters"
          @box-selected="boxSelected"
    /> -->
    <resource-map
        v-if="displayMap"
        :markers="markers"
        @bounds="boundsUpdated"
        @center="centerUpdated"
        @marker-selected="passSelectedMarker"
        :mapUrl="mapUrl"
        :nearLocation="nearLocation"
        :resource="resourceData"
    />
    </div>
</template>

<script>

import { cartoBaseURL, sqlQueries, dayFilters } from '@/constants'
import ResourceMap from '@/components/ResourceMap.vue'
// import Filters from '@/components/Filters.vue'
import { haversineDistance, sortByDistance } from '@/utilities'

export default {
    name: 'results',
    components: {
        ResourceMap,
        // Filters
  },
    data() {
        return {
            entries: null,
            mapUrl: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}.png',
            bounds: null,
            centroid: [null, null],
            resourceData: { resourceId: null, isSetByMap: false },
        }
    },
    created() {
        const query = encodeURI(sqlQueries[this.$route.params.need])
        this.fetchData(query)
    },
    methods:{
        async fetchData(query) {
            try {
                const res = await fetch(cartoBaseURL + '&q=' + query)
                const entries = await res.json()
                this.entries = entries.rows
                console.log(this.entries)
            } catch(e) {
                console.log(e)
            }
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
        }
    },
    computed: {
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

            let markers = this.entries.filter((c) => c.lat && c.lon)
            markers = markers.map((c) => ({
                            ...c, 
                            isOpen: c[dayFilter] !== '0', 
                            distance: haversineDistance(this.centroid, [c.lat, c.lon], true)
                        })).sort(sortByDistance)
            return markers
        },
        nearLocation() {
            if (this.$route.query.lat) {
                return { lat: this.$route.query.lat, lon: this.$route.query.lon }
            }
            return { lat: null, lon: null } 
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