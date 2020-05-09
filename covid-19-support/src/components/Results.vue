<template>
    <div>Hello </div>
</template>

<script>

import { cartoBaseURL, sqlQueries } from './constants'

export default {
    name: 'results',
    data() {
        return {
            entries: null
        }
    },
    created() {
        this.fetchData()
    },
    methods:{
        async fetchData(query) {
          const res = await fetch(cartoBaseURL + '&q=' + query)
          const entries = await res.json()
          this.entries = entries.rows
          console.log(this.entries)
        }
    },
    computed: {
        displayMap() {
            const needWithMap = ['meal', 'free_grocery', 'snap_wic_retailer']
            return needWithMap.includes(this.$route.params.need)
        }
    }
}

</script>