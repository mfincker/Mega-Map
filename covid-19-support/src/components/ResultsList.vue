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
        @click="$emit('resource-selected', { resourceId: item.cartodb_id, isSetByMap: false })"
      >
      <div class='left'>
        <template v-if="!!item.provider_addloc">
          <div class="addloc">{{ item.provider_addloc }}</div>
        </template>
        <span class="resultTitle">{{ item.provider_name }}</span>
        <span class="resultAddress">
          <!-- <span v-if="!!item.cuisine">{{ item.cuisine }}<br /></span> -->
          {{ item.address }},
          {{ item.city }}
        </span>
        <div class="resultContact">{{ item.contact }}</div>
      </div>
      <div class='right'>
         <span v-if="!item.isOpen" class="closed">{{ getClosedMessage() }}</span>
        <span v-if="item.isOpen" class="open">{{ getOpenMessage(item) }}</span>
        <div>More info</div>
      </div>
        <!-- <template v-if="item.family_meal == 1"
          ><span :title="$tc('category.family', 2)"><i class="fas fa-user-friends" /></span
        ></template>
        <template v-if="item.meal_student == 1"
          ><span :title="$tc('label.meal_student', 1)"><i class="fas fa-school" /></span
        ></template> -->
        <!-- <template v-if="item.marker.meal_student == 1"
          ><span :title="$tc('label.meal_public', 1)"><i class="fas fa-users" /></span
        ></template> -->
        <!-- <template v-if="item.public == 1"
          ><span :title="$tc('label.meal_public', 1)"><i class="fas fa-users" /></span
        ></template>
        <template v-if="item.drive_thru == 1"
          ><span :title="$t('label.drive_thru')"><i class="fas fa-car-side" /></span
        ></template>
        <template v-if="item.curbside == 1"
          ><span :title="$tc('label.curbside', 1)"><i class="fas fa-car" /></span
        ></template>
        <template v-if="item.order_online == 1"
          ><span :title="$t('label.order_online')"><i class="fas fa-mouse" /></span
        ></template>
        <template v-if="item.delivery == 1"
          ><span :title="$t('label.delivery')"><i class="fas fa-shipping-fast" /></span
        ></template> -->
      </div>
    </div>
  </div>
</template>

<script>
import { dayFilters } from '@/constants'
export default {
  name: 'ResultsList',
  data() {
    return {
      selected: false,
      today: new Date().getDay()
    }
  },
  components: {},
  props: {
    markers: Array,
    resource: { resourceId: Number, isSetByMap: Boolean }
  },
  watch: {
    resource: function (val) {
      console.log("scroll based on resourceSelected change")
        var top = this.$refs['result'+ val.resourceId][0].offsetTop - this.$refs['result'+ this.markers[0].cartodb_id][0].offsetTop
        this.$refs['results'].scrollTo(0, top)
    }//,
    // markers: function () {
    //   console.log(this.$refs)
    //   if (this.resource && typeof this.$refs['result' + this.resource.resourceId] !== []) {
    //     var top = this.$refs['result' + this.resource.resourceId][0].offsetTop
    //     this.$refs['results' + this.resource.resourceId].scrollTo(0, top)
    //   }
    // }
  },
  methods: {
    getClosedMessage: function () {
      return this.$t(`label.closed-today`)
    },
    getOpenMessage(item) {
      var today = new Date().getDay()
      const dayFilter = dayFilters[today]

      return this.$t('open-today') + ': ' + item[dayFilter]
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

.addloc {
  padding-bottom: 3px;
  color: $gray-600;
  font-size: 0.8rem;
}

.left {
  width: 70%;
}

.right {
  width: 30%;
  font-size: 0.8rem;
}


.resultList {
  z-index: 2000;
  width: 100%;
  border-top: solid 1px rgba(0, 0, 0, 0.125);
}

.resultItem {
  padding: 16px;
  width: 100%;
  /* display: block; */
  display: flex;
  flex: 1 1 auto;
  border-bottom: solid 1px rgba(0, 0, 0, 0.125);
  font-size: 0.8rem;
  background: theme-color('secondary');

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

  a {
    color: #000;
  }

  & > span > i {
    margin-right: 8px;
    color: #2eb7cb;
    font-size: 1rem;
    margin-top: 6px;
  }
}

.resultTitle {
  font-size: 1rem;
  font-weight: 600;
  display: inline-block;
  margin: 0 0 4px;
}

.resultAddress {
  display: block;
  max-width: 300px;
  margin-bottom: 4px;
}

.closed,
.open {
}

.closed {
  color: grey;
}

.open {
  color: green;
}

.no-result {
  margin-top: 10px;
  text-align: center;
  font-size: 0.75rem;
}
</style>
