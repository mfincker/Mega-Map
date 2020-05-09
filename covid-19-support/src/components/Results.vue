<template>
    <div>
    <div>Hello </div>
    <resource-map
        :markers="markers"
        @bounds="boundsUpdated"
        @center="centerUpdated"
        :mapUrl="mapUrl"
        :nearLocation="nearLocation"
    />
    </div>
</template>

<script>

import { cartoBaseURL, sqlQueries } from '@/constants'
import ResourceMap from '@/components/ResourceMap.vue'

export default {
    name: 'results',
    components: {
        ResourceMap
  },
    data() {
        return {
            entries: null,
            mapUrl: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}.png',
            bounds: null,
            centroid: [null, null]
        }
    },
    created() {
        const query = encodeURI(sqlQueries[this.$route.params.need])
        this.fetchData(query)
    },
    methods:{
        async fetchData(query) {
            const res = await fetch(cartoBaseURL + '&q=' + query)
            const entries = await res.json()
            this.entries = entries.rows
            console.log(this.entries)
        },
        centerUpdated(center) {
            this.centroid = [center.lat, center.lng]
        },
        boundsUpdated: function (bounds) {
            this.bounds = bounds
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
            return this.entries.filter((c) => c.lat && c.lon)
        },
        nearLocation() {
            if (this.$route.query.lat) {
                return { lat: this.$route.query.lat, lon: this.$route.query.lon }
            }
            return { lat: null, lon: null } 
        }

    },
    watch: {
        $route(to) {
          // update entries based on need
          if (to.params && to.params.need) {
            const query = encodeURI(sqlQueries[to.params.need])
            this.fetchData(query)
          }
        }
    }
}

</script>