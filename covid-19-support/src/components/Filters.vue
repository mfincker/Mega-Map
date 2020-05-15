<template>
  <div class="filters" v-if="filterList[0] != null">
    <b-form-checkbox
      v-for="(item, index) in filterList"
      v-model="selected"
      v-bind:key="index"
      :value="item"
      @change="$emit('box-selected', item)"
    >
      {{ $tc(`label.${item}`) }}
    </b-form-checkbox>
  </div>
</template>

<script>
// import ValueBox from '@/components/ValueBox.vue'
import { complexFilters } from '@/constants'

export const countFeature = (markers = [], feature) =>
  (markers || []).reduce((total, c) => (c.accesstype.indexOf(feature) && c.isOpen > -1 ? total + 1 : total), 0)

export const countBoolean = (markers, fieldName) =>
  (markers || []).reduce((total, c) => (c[fieldName] == '1' && c.isOpen ? total + 1 : total), 0)

export const countComplexFilter = (markers, complexFilter) => {
  const ct = (markers || []).reduce((total, c) => {
    const boolFiltersArray = complexFilter.columns.map((d) => c['' + d] == '1')
    const keepMarker = complexFilter.combine(boolFiltersArray)
    return keepMarker && c.isOpen ? total + 1 : total
  }, 0)
  return ct
}

export default {
  name: 'Filters',
  components: {
    // ValueBox
  },
  props: {
    need: String,
    markers: Array,
    activeFilters: Array
  },
  data() {
    return {
      selected: []
    }
  },
  methods: {
    boxSelected: function (content) {
      this.$emit('box-selected', content)
    },
    buildBoxValue(labelId, icon, count, pluralize = false) {
      const label = `label.${labelId}`
      var selected = this.activeFilters !== undefined ? this.activeFilters.includes(labelId) : ''

      return {
        icon,
        value: count,
        title: pluralize ? this.$tc(label, count) : this.$t(label),
        need: labelId,
        selected: selected
      }
    }
  },
  watch: {
    activeFilters: function (val) {
      if (val.length == 0) {
        this.selected = []
      }
    }
  },
  computed: {
    // Counts
    countPickup() {
      return countBoolean(this.markers, 'in_store_pickup')
    },
    countCurbside() {
      return countBoolean(this.markers, 'curbside')
    },
    countDeliveryOrCurbside() {
      // Location that offer either delivery or curbside
      const complexFilter = complexFilters.filter((c) => c.name == 'curbside_or_delivery')[0]
      return countComplexFilter(this.markers, complexFilter)
    },
    countSeniors() {
      return countBoolean(this.markers, 'seniors')
    },
    countChildren() {
      return countBoolean(this.markers, 'children')
    },
    countPublic() {
      return countBoolean(this.markers, 'public')
    },
    countSeniorHours() {
      return countBoolean(this.markers, 'special_hours')
    },
    countFreeStudentMeal() {
      return countBoolean(this.markers, 'meal_student')
    },
    countPublicMeal() {
      return countBoolean(this.markers, 'meal_public')
    },
    countFamilyMeal() {
      // Family meal kits to purchase
      return countBoolean(this.markers, 'family_meal')
    },
    countOrderOnline() {
      return countBoolean(this.markers, 'order_online')
    },
    countPayOnline() {
      return countBoolean(this.markers, 'pay_online')
    },
    countMustPreOrder() {
      return countBoolean(this.markers, 'must_preorder')
    },
    countDiscountMedical() {
      return countBoolean(this.markers, 'discount_medical')
    },
    countDelivery() {
      return countBoolean(this.markers, 'delivery')
    },
    countProduce() {
      return countBoolean(this.markers, 'free_produce')
    },
    countGroceries() {
      return countBoolean(this.markers, 'free_groceries')
    },
    countFarmPickUp() {
      return countBoolean(this.markers, 'farm_pick_up')
    },
    countFarmersMarket() {
      return countBoolean(this.markers, 'farmers_market')
    },
    countFreeResource() {
      return countBoolean(this.markers, 'free')
    },
    countSnap() {
      return countBoolean(this.markers, 'snap')
    },
    countWic() {
      return countBoolean(this.markers, 'wic')
    },
    countCallInAdvance() {
      return countBoolean(this.markers, 'call_in_advance')
    },
    // Value Boxes
    callInAdvanceValueBox() {
      return this.buildBoxValue('call_in_advance', 'fa-phone', this.countCallInAdvance)
    },
    freeResourceValueBox() {
      return this.buildBoxValue('free', 'fa-shopping-basket', this.countFreeResource)
    },
    snapValueBox() {
      return this.buildBoxValue('snap', 'fa-users', this.countSnap, true)
    },
    wicValueBox() {
      return this.buildBoxValue('wic', 'fa-users', this.countWic, true)
    },
    orderOnlineValueBox() {
      return this.buildBoxValue('order_online', 'fa-mouse', this.countOrderOnline)
    },
    curbsidePickupValueBox() {
      return this.buildBoxValue('curbside', 'fa-car', this.countCurbside, true)
    },
    deliveryValueBox() {
      return this.buildBoxValue('delivery', 'fa-shipping-fast', this.countDelivery)
    },
    onFarmPickupValueBox() {
      return this.buildBoxValue('farm_pick_up', 'fa-tractor', this.countFarmPickUp, true)
    },
    farmersMarketValueBox() {
      return this.buildBoxValue('farmers_market', 'fa-store', this.countFarmersMarket, true)
    },
    seniorShoppingValueBox() {
      return this.buildBoxValue('special_hours', 'fa-history', this.countSeniorHours)
    },
    medicalDiscountsValueBox() {
      return this.buildBoxValue('discount_medical', 'fa-user-md', this.countDiscountMedical, true)
    },
    openToPublicValueBox() {
      return this.buildBoxValue('meal_public', 'fa-users', this.countPublicMeal, true)
    },
    freeStudentMealsValueBox() {
      return this.buildBoxValue('meal_student', 'fa-school', this.countFreeStudentMeal, true)
    },
    freeProduceValueBox() {
      return this.buildBoxValue('free_produce', 'fa-apple-alt', this.countProduce, true)
    },
    freeGroceryValueBox() {
      return this.buildBoxValue('free_groceries', 'fa-shopping-basket', this.countGroceries, true)
    },
    mustPreOrderValueBox() {
      return this.buildBoxValue('must_preorder', 'fa-phone', this.countMustPreOrder, true)
    },
    curbsideOrDeliveryValueBox() {
      return this.buildBoxValue('curbside_or_delivery', 'fa-shipping-fast', this.countDeliveryOrCurbside)
    },
    seniorsValueBox() {
      return this.buildBoxValue('seniors', '', this.countSeniors)
    },
    childrenValueBox() {
      return this.buildBoxValue('children', '', this.countChildren)
    },
    publicValueBox() {
      return this.buildBoxValue('public', '', this.countPublic)
    },
    // Displayed boxes
    valueBoxes() {
      switch (this.need) {
        case 'free_grocery':
          return [this.seniorsValueBox, this.childrenValueBox, this.publicValueBox, this.curbsideOrDeliveryValueBox]
        case 'snap_wic_retailer':
          return [this.wicValueBox, this.seniorShoppingValueBox, this.curbsideOrDeliveryValueBox, this.farmersMarketValueBox]
        case 'meal': // Prepared Meals
          return [this.seniorsValueBox, this.childrenValueBox, this.publicValueBox, this.curbsideOrDeliveryValueBox]
        default:
          return [null, null, null, null, null]
      }
    },
    filterList() {
      switch (this.need) {
        case 'free_grocery':
          return ['children', 'seniors', 'open_today', 'safe_pick_up']
        case 'snap_wic_retailer':
          return ['wic', 'special_hours', 'safe_pick_up', 'farmers_market']
        case 'meal':
          return ['seniors', 'children', 'open_today', 'safe_pick_up']
        case 'mental_health_telehealth':
          return ['free']
        case 'mental_health_in_person':
          return ['free']
        case 'medical_in_person':
          return ['free']
        case 'medical_telehealth':
          return ['free']
        default:
          return [null]
      }
    }
  }
}
</script>

<style lang="css">
.filters {
  position: relative;
  justify-content: space-evenly;
  z-index: 3000;
  width: 100%;
  font-size: 0.7em;
  padding: 8px 16px;
  border-top: 1px solid rgba(0, 0, 0, 0.125);
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.125);
}

.custom-checkbox {
  color: #495057;
  background: white;
  margin-bottom: 4px;
  width: 50%;
  display: inline-block !important;
  line-height: 2;
}

.highlights {
  position: absolute;
  top: 0;
  margin: 0 !important;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  padding: 1px !important;
  z-index: 10;
  background: white;
  box-sizing: border-box;

  transition: height 0.25s ease-out;
  /*height: 116px;*/

  div.col-md-3 {
    padding: 0 !important;
  }
}

#wrapper.toggled .highlights {
  transition: margin-left 0.25s ease-out;
  @media (min-width: 768px) {
    margin-left: 294px !important;
  }
}

@media (min-width: 768px) {
  .highlights {
    /*height: 108px;*/
  }
}
</style>
