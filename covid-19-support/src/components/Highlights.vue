<template>
  <div class="row highlights" v-if="valueBoxes[0] != null">
    <div class="col-6 col-md-3 order-md-1">
      <value-box :content="valueBoxes[0]" class="bg-blue" @box-selected="boxSelected" />
    </div>
    <div class="col-6 col-md-3 order-md-2">
      <value-box :content="valueBoxes[1]" class="bg-green" @box-selected="boxSelected" />
    </div>
    <div class="col-6 col-md-3 order-md-4">
      <value-box :content="valueBoxes[2]" class="bg-green" @box-selected="boxSelected" />
    </div>
    <div class="col-6 col-md-3 order-md-3">
      <value-box :content="valueBoxes[3]" class="bg-blue" @box-selected="boxSelected" />
    </div>
  </div>
</template>

<script>
import ValueBox from './ValueBox.vue'
import { complexFilters } from '../constants'

export const countFeature = (filteredMarkers = [], feature) =>
  (filteredMarkers || []).reduce((total, c) => (c.marker.accesstype.indexOf(feature) && c.oc > -1 ? total + 1 : total), 0)

export const countBoolean = (filteredMarkers, fieldName) =>
  (filteredMarkers || []).reduce((total, c) => (c.marker['' + fieldName] == '1' && c.oc ? total + 1 : total), 0)

export const countComplexFilter = (filteredMarkers, complexFilter) => {
  const ct = (filteredMarkers || []).reduce((total, c) => {
    const boolFiltersArray = complexFilter.columns.map((d) => c.marker['' + d] == '1')
    const keepMarker = complexFilter.combine(boolFiltersArray)
    return keepMarker && c.oc ? total + 1 : total
  }, 0)
  return ct
}

export default {
  name: 'Highlights',
  components: {
    ValueBox
  },
  props: {
    need: String,
    filteredMarkers: Array,
    highlightFilters: Array
  },
  methods: {
    boxSelected: function (content) {
      this.$emit('box-selected', content)
    },
    buildBoxValue(labelId, icon, count, pluralize = false) {
      const label = `label.${labelId}`
      var selected = this.highlightFilters !== undefined ? this.highlightFilters.includes(labelId) : ''

      return {
        icon,
        value: count,
        title: pluralize ? this.$tc(label, count) : this.$t(label),
        need: labelId,
        selected: selected
      }
    }
  },
  computed: {
    // Counts
    countPickup() {
      return countBoolean(this.filteredMarkers, 'in_store_pickup')
    },
    countCurbside() {
      return countBoolean(this.filteredMarkers, 'curbside')
    },
    countDeliveryOrCurbside() {
      // Location that offer either delivery or curbside
      const complexFilter = complexFilters.filter((c) => c.name == 'curbside_or_delivery')[0]
      return countComplexFilter(this.filteredMarkers, complexFilter)
    },
    countSeniors() {
      return countBoolean(this.filteredMarkers, 'seniors')
    },
    countChildren() {
      return countBoolean(this.filteredMarkers, 'children')
    },
    countPublic() {
      return countBoolean(this.filteredMarkers, 'public')
    },
    countSeniorHours() {
      return countBoolean(this.filteredMarkers, 'special_hours')
    },
    countFreeStudentMeal() {
      return countBoolean(this.filteredMarkers, 'meal_student')
    },
    countPublicMeal() {
      return countBoolean(this.filteredMarkers, 'meal_public')
    },
    countFamilyMeal() {
      // Family meal kits to purchase
      return countBoolean(this.filteredMarkers, 'family_meal')
    },
    countOrderOnline() {
      return countBoolean(this.filteredMarkers, 'order_online')
    },
    countPayOnline() {
      return countBoolean(this.filteredMarkers, 'pay_online')
    },
    countMustPreOrder() {
      return countBoolean(this.filteredMarkers, 'must_preorder')
    },
    countDiscountMedical() {
      return countBoolean(this.filteredMarkers, 'discount_medical')
    },
    countDelivery() {
      return countBoolean(this.filteredMarkers, 'delivery')
    },
    countProduce() {
      return countBoolean(this.filteredMarkers, 'free_produce')
    },
    countGroceries() {
      return countBoolean(this.filteredMarkers, 'free_groceries')
    },
    countFarmPickUp() {
      return countBoolean(this.filteredMarkers, 'farm_pick_up')
    },
    countFarmersMarket() {
      return countBoolean(this.filteredMarkers, 'farmers_market')
    },
    countFreeResource() {
      return countBoolean(this.filteredMarkers, 'free')
    },
    countSnap() {
      return countBoolean(this.filteredMarkers, 'snap')
    },
    countWic() {
      return countBoolean(this.filteredMarkers, 'wic')
    },
    countCallInAdvance() {
      return countBoolean(this.filteredMarkers, 'call_in_advance')
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
        case 'grocery':
          return [this.freeResourceValueBox, this.snapValueBox, this.wicValueBox, this.seniorShoppingValueBox]
        case 'free_grocery':
          return [this.seniorsValueBox, this.childrenValueBox, this.publicValueBox, this.curbsideOrDeliveryValueBox]
        case 'snap_wic_retailer':
          return [this.wicValueBox, this.seniorShoppingValueBox, this.curbsideOrDeliveryValueBox, this.farmersMarketValueBox]
        case 'food_bev':
          return [this.orderOnlineValueBox, this.curbsidePickupValueBox, this.deliveryValueBox, this.seniorShoppingValueBox]
        case 'restaurant':
          return [this.orderOnlineValueBox, this.curbsidePickupValueBox, this.medicalDiscountsValueBox, this.deliveryValueBox]
        case 'family': // Family Meal Kits
          return [this.orderOnlineValueBox, this.curbsidePickupValueBox, this.deliveryValueBox, this.mustPreOrderValueBox]
        case 'farm': // Farms
          return [this.curbsidePickupValueBox, this.onFarmPickupValueBox, this.farmersMarketValueBox, this.orderOnlineValueBox]
        case 'meal': // Prepared Meals
          return [this.seniorsValueBox, this.childrenValueBox, this.publicValueBox, this.curbsideOrDeliveryValueBox]
        case 'pharmacy':
          return [this.orderOnlineValueBox, this.curbsidePickupValueBox, this.seniorShoppingValueBox, this.deliveryValueBox]
        case 'pet':
          return [this.orderOnlineValueBox, this.curbsidePickupValueBox, this.medicalDiscountsValueBox, this.deliveryValueBox]
        default:
          return [null, null, null, null, null]
      }
    }
  }
}
</script>

<style lang="scss">
.highlights {
  margin: 4px !important;

  transition: height 0.25s ease-out;
  height: 116px;

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
    height: 108px;
  }
}
</style>
