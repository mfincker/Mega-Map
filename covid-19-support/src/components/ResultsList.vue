<template>
  <div class="resultWrapper" ref="results">
    <div class="resultList">
      <div v-if="isEmpty" class="no-result">{{ $tc('no_location_in_this_area') }}</div>
      <div
        v-for="item in markers"
        v-bind:key="item.cartodb_id"
        class="resultItem"
        :class="{ selected: item.cartodb_id == resource.resourceId, closedOne: item.isOpen == false }"
        :ref="'result' + item.cartodb_id"
        @click="resourceClicked(item)"
      >
      <div>
        <div class="resultTop">
        <div>
          <template v-if="!!item.provider_addloc">
          <div class="addloc">{{ item.provider_addloc }}</div>
        </template>
        <div class="resultMetadata">
          <span class="resultTitle">{{ item.provider_name }}
          </span>
          <span class="resultAddress">
            <!-- <span v-if="!!item.cuisine">{{ item.cuisine }}<br /></span> -->
            {{ item.address }},
            {{ item.city }}
          </span>
          <a class="resultContact" :href="'tel:' + item.contact">{{ item.contact }}</a>
        </div>
        <span v-if="!item.isOpen" class="closed">{{ getClosedMessage() }}</span>
        <span v-if="item.isOpen" class="open">{{ getOpenMessage(item) }}</span>
        </div>
          <i class="fas fa-chevron-right fa-lg" :class="{'fa-rotate-90': showDetails && item.cartodb_id == resource.resourceId}"></i>  
        </div>
        <business-details v-if="item.cartodb_id == resource.resourceId && showDetails" :business="item" />
      </div>
      </div>
      <div v-if="!isEmpty" class="more-result" @click="$emit('zoom-out')">{{ $tc('zoom_out_for_more_results') }}</div>
    </div>
  </div>
</template>

<script>
import BusinessDetails from '@/components/BusinessDetails.vue'

export default {
  name: 'ResultsList',
  data() {
    return {
      selected: false,
      today: new Date().getDay(),
      showDetails: false
    }
  },
  components: {
    BusinessDetails
  },
  props: {
    markers: Array,
    resource: { resourceId: Number, isSetByMap: Boolean }
  },
  watch: {
    resource: function (val) {
      // if no resource are selected, hide location details
      if (!val.resourceId) {
        this.showDetails = false
      // a location is selected, keep the list scrolled to that location
      } else {
        this.showDetails= true
        this.$nextTick(() => {
          const top = this.$refs['result' + val.resourceId][0].offsetTop - this.$refs['result' + this.markers[0].cartodb_id][0].offsetTop
          this.$refs['results'].scrollTo(0, top)
        })
      }
    }, //,
    markers: function (newMarkers) {
      // some location is selected and there are displayed markers
      console.log('in markers watch - resultList')
      if (this.resource.resourceId && newMarkers) {
        // is the selected location still in the map view
        const selectedLocationInView = newMarkers.filter((c) => {
          return c.cartodb_id == this.resource.resourceId
        }).length > 0
        // if it's not in view, clear selection
        if (!selectedLocationInView) {
          this.$emit('resource-selected', {resourceId: null, isSetByMap: false})
        // if it's in view, scroll to it after the update on the markers
        } else {
          this.$nextTick(() => {
            const top = this.$refs['result' + this.resource.resourceId][0].offsetTop - this.$refs['result' + newMarkers[0].cartodb_id][0].offsetTop
            this.$refs['results'].scrollTo(0, top)
          })
        }
      }
    }
  },
  methods: {
    getClosedMessage() {
      return this.$t(`label.closed-today`)
    },
    getOpenMessage() {
      return this.$t('label.open-today')
    },
    resourceClicked(item) {
      if (!this.resource.resourceId || item.cartodb_id != this.resource.resourceId) {
        console.log('new resource clicked in list')
        this.$emit('resource-selected', { resourceId: item.cartodb_id, isSetByMap: false })
      } else {
        console.log('toggle show details in list after clicking on result')
        this.showDetails = !this.showDetails
      }
      
      // this.showDetails = !this.showDetails
      
    }

  },
  computed: {
    isEmpty() {
      return !this.markers || this.markers.length == 0
    }
  }
}
</script>

<style lang="scss">
.resultWrapper {
  flex: 1 1 100%;
  overflow-y: scroll;
  scrollbar-color: $gray-900 $gray-700;
  width: 100%;
  z-index: 2000;
}

.resultTop {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background: inherit;
}

.rotated {
  color: red;
}

.addloc {
  padding-bottom: 3px;
  color: $gray-600;
  font-size: 0.8rem;
}

.resultList {
  z-index: 2000;
  width: 100%;
  border-top: solid 1px rgba(0, 0, 0, 0.125);
  background-color: white;
}

.more-info {
  padding-right: 10px;
}

.resultItem {
  padding: 16px;
  width: calc(100% - 20px);
  display: block;
  flex: 1 1 auto;
  border: solid 1px rgba(0, 0, 0, 0.125);
  font-size: 0.8rem;
  background: theme-color('secondary');
  margin: 10px;

  @media (prefers-color-scheme: dark) {
    color: $gray-100;
    background: $gray-800;
  }

  &.selected {
    background: $gray-200 !important;
  }

  &:hover {
    background: #f8f9fa;
    cursor: pointer;
    @media (prefers-color-scheme: dark) {
      background: $gray-900;
    }
  }
}

.resultTitle {
  font-size: 1rem;
  font-weight: 600;
  display: inline-block;
  margin: 0 0 4px;
}

.resultMetadata {
  margin-bottom: 12px;
}

.resultAddress {
  display: block;
  max-width: 300px;
  margin-bottom: 4px;
}

.closed,
.open {
  display: inline-block;
  border-radius: 100px;
  background-color: white;
  border: 1px solid;
  padding: 2px 6px;
  margin-bottom: 8px;
}

.open {
  border-color: $gray-400;
  color: grey;
}

.closed {
  border-color: $gray-700;
  background-color: $gray-700;
  color: white;
}

.no-result {
  margin-top: 10px;
  text-align: center;
  font-size: 0.75rem;
}

.more-result {
  margin: 10px;
  text-align: center;
  font-size: 0.75rem;
  cursor: pointer;
  text-decoration: underline;
}


.more-info {
  align-content: flex-end;
}
</style>
