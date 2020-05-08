<template>
  <div class="resultWrapper">
    <div ref="results" class="resultList">
      <div
        v-for="(item, index) in filteredMarkers"
        v-bind:key="index"
        class="resultItem"
        :class="{ selected: index == location.locValue, closedOne: item.oc == false }"
        :ref="'result' + index"
        @click="$emit('location-selected', { locValue: index, isSetByMap: false })"
      >
        <h5 class="resultTitle">{{ item.marker.provider_name }}</h5>
        <template v-if="!!item.marker.provider_addloc"
          ><div class="addloc">{{ item.marker.provider_addloc }}</div></template
        >
        <div v-if="!item.oc" class="closed">{{ getClosedMessage() }}</div>
        <span class="resultAddress">
          <span v-if="!!item.marker.cuisine">{{ item.marker.cuisine }}<br /></span>
          {{ item.marker.address }},
          {{ item.marker.city }}
        </span>
        <template v-if="item.marker.discount_medical == 1"
          ><span :title="$tc('label.discount_medical', 1)"><i class="fas fa-user-md" /></span
        ></template>
        <template v-if="item.marker.family_meal == 1"
          ><span :title="$tc('category.family', 2)"><i class="fas fa-user-friends" /></span
        ></template>
        <template v-if="item.marker.meal_student == 1"
          ><span :title="$tc('label.meal_student', 1)"><i class="fas fa-school" /></span
        ></template>
        <!-- <template v-if="item.marker.meal_student == 1"
          ><span :title="$tc('label.meal_public', 1)"><i class="fas fa-users" /></span
        ></template> -->
        <template v-if="item.marker.public == 1"
          ><span :title="$tc('label.meal_public', 1)"><i class="fas fa-users" /></span
        ></template>
        <template v-if="item.marker.drive_thru == 1"
          ><span :title="$t('label.drive_thru')"><i class="fas fa-car-side" /></span
        ></template>
        <template v-if="item.marker.curbside == 1"
          ><span :title="$tc('label.curbside', 1)"><i class="fas fa-car" /></span
        ></template>
        <template v-if="item.marker.order_online == 1"
          ><span :title="$t('label.order_online')"><i class="fas fa-mouse" /></span
        ></template>
        <template v-if="item.marker.delivery == 1"
          ><span :title="$t('label.delivery')"><i class="fas fa-shipping-fast" /></span
        ></template>
      </div>
    </div>
  </div>
</template>

<script>
import { weekdaysJs } from '../constants'

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
    filteredMarkers: Array,
    location: { locValue: Number, isSetByMap: Boolean },
    selectedDay: Number
  },
  watch: {
    location: function (locationVal) {
      if (locationVal.isSetByMap) {
        var top = this.$refs['result' + locationVal.locValue][0].offsetTop - 330
        this.$refs['results'].scrollTo(0, top)
      }
    }
  },
  methods: {
    getClosedMessage: function () {
      if (this.selectedDay > 6) {
        return this.$t(`label.closed-today`)
      }

      return `${this.$t('label.closed-on')} ${this.$t(`dayofweek.${weekdaysJs[this.selectedDay].day}`)}`
    }
  }
}
</script>

<style lang="scss">
.resultWrapper {
  scrollbar-color: $gray-900 $gray-700;
}

.addloc {
  margin-bottom: 8px;
}
.resultList {
  max-height: calc(100vh - 294px);
  overflow-y: auto;
}
.resultItem {
  padding: 10px;
  display: block;
  min-height: 100px;
  border-bottom: solid 1px rgba(0, 0, 0, 0.125);
  font-size: 0.8rem;
  max-width: 282px;
  background: theme-color('secondary');

  @media (prefers-color-scheme: dark) {
    color: $gray-100;
    background: $gray-800;
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
  font-size: 0.9rem;
  margin-bottom: 0;
}
.resultAddress {
  font-size: 0.8rem;
  display: block;
  max-width: 262px;
}
.closedOne {
  /* background: #f9f9f9 !important; */
}
</style>
