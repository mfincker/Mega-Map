<template>

    <div class="filters" v-if="filterList[0] != null">
      <!-- <p>{{ $tc('FILTERS') }}</p> -->
      <div>
        <b-form-checkbox
        v-for="(item, index) in filterList"
        v-bind:key="index"
        :value="item"
        @change="$emit('box-selected', item)"
    >{{ $tc(`label.${item}`) }}</b-form-checkbox>
      </div>
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
          return ['seniors', 'children', 'public', 'safe_pick_up']
        case 'snap_wic_retailer':
          return ['wic', 'special_hours', 'safe_pick_up', 'farmers_market']
        case 'meal':
          return ['seniors', 'children', 'public', 'safe_pick_up']
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
  /*top: 0;*/
  display: flex;
  flex-direction: column;
  z-index: 10;
  width: 100%;
  /*background-color: white;*/
  font-weight: 400;
  font-size: 0.75em;
  line-height: 1.5;
  vertical-align: middle;
  padding: 10px 0px 6px 0px;
  max-width: 500px;
  margin: 0 auto;
}

.filters > p {
  /*padding-left: 3px !important;*/
  margin: 0 auto !important;
  /*text-decoration: underline;*/
}

.filters > div {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
}

.custom-checkbox {
  /*font-size: 0.75rem;*/
  /*margin-left: 15px;*/
  /*text-align: center;*/
  /*vertical-align: middle;*/
  width: 48% !important;
  /*max-width: 160px;*/
  color: #495057;
  /*padding: 0px 10px 0px 5px !;*/
  border: 1px solid rgb(206, 212, 218);
  border-radius: 0px;
  background: white;
  margin-bottom: 2px;
}

@media (min-width: 768px) {
  .filters > div {
    justify-content: center;
  }
  .custom-checkbox {
    max-width: 175px;
    margin: 0px 5px;
  }
}

.custom-control {
  padding-left: 1.8rem !important;
}

.custom-control-label {
  padding-top: 3px;
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
