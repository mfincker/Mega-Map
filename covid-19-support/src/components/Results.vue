<template>
    <div>Hello </div>
</template>

<script>
import { spreadsheetUrl } from '@/constants'

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
        async fetchData() {
            const res = await fetch(spreadsheetUrl)
            const entries = await res.json()
            this.entries = entries.feed.entry
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