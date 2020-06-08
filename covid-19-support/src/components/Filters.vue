<template>
  <div v-if="filterList[0] != null" class="filters">
    <div v-for="(item, index) in filterList" v-bind:key="index" class="filter">
      <template v-if="!Array.isArray(item)">
        <b-form-checkbox v-model="selected" :value="item.var" @change="$emit('box-selected', item.var)">
          {{ $tc(item.label, 2) }}
        </b-form-checkbox>
      </template>
      <template v-else>
        <div v-b-toggle="item[0]" @click="toggleChevron" class="collaps-toggle">
          {{ item[0] }}
          <i class="fas fa-chevron-right"></i>
        </div>

        <b-collapse :id="item[0]">
          <b-form-checkbox
            v-for="(item_sub, index_sub) in item.slice(1)"
            v-model="selected"
            v-bind:key="'' + index + '_' + index_sub"
            :value="item_sub.var"
            @change="$emit('box-selected', item_sub.var)"
          >
            {{ $tc(item_sub.label, 2) }}
          </b-form-checkbox>
        </b-collapse>
      </template>
    </div>
    <b-button id="apply" variant="primary">{{ $t('label.apply') }}</b-button>
  </div>
</template>

<script>
export default {
  name: 'Filters',
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
    toggleChevron(evt) {
      console.log(evt)
      if (evt.target.tagName == 'I') {
        evt.target.classList.toggle('fa-rotate-90')
      } else {
        evt.target.getElementsByTagName('i')[0].classList.toggle('fa-rotate-90')
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
    // Displayed filters
    filterList() {
      switch (this.need) {
        case 'free_grocery':
          return [
            // { var: 'children', label: 'label.children' },
            // { var: 'seniors', label: 'label.seniors' },
            { var: 'open_today', label: 'label.open_today' }
            // { var: 'safe_pick_up', label: 'label.safe_pick_up' }
          ]
        case 'snap_wic_retailer':
          return [
            { var: 'wic', label: 'label.wic' },
            { var: 'special_hours', label: 'label.special_hours' },
            { var: 'safe_pick_up', label: 'label.safe_pick_up' },
            { var: 'farmers_market', label: 'label.farmers_market' }
          ]
        case 'meal':
          return [
            { var: 'children', label: 'label.children' },
            // { var: 'seniors', label: 'label.seniors' },
            { var: 'open_today', label: 'label.open_today' }
            // { var: 'safe_pick_up', label: 'label.safe_pick_up' }
          ]
        case 'mental_health':
          return [
            // { var: 'free', label: 'label.free' },
            { var: 'in_person', label: 'label.in_person' },
            { var: 'telehealth', label: 'label.telehealth' }
          ]
        case 'health':
          return [
            // { var: 'free', label: 'label.free' },
            { var: 'in_person', label: 'label.in_person' },
            { var: 'telehealth', label: 'label.telehealth' },
            [
              'Area',
              { var: 'med_primary_care', label: 'health.primary_care' },
              { var: 'med_mental_health', label: 'health.mental_health' }
            ],
            [
              'Payment options',
              { var: 'free', label: 'label.free' },
              { var: 'sliding_scale', label: 'health.sliding_scale' },
              { var: 'financial_assistance', label: 'health.financial_assistance' }
            ]
          ]
        case 'legal_assistance':
          return [
            { var: 'legal_criminal', label: 'legal.legal_criminal' },
            { var: 'legal_domviolence', label: 'legal.legal_domviolence' },
            { var: 'legal_worker_protection', label: 'legal.legal_worker_protection' },
            { var: 'legal_healthcare', label: 'legal.legal_healthcare' },
            { var: 'legal_housing', label: 'legal.legal_housing' },
            { var: 'legal_immigration', label: 'legal.legal_immigration' }
          ]
        default:
          return [null]
      }
    }
  }
}
</script>

<style lang="scss">
.filter {
  position: relative;
  justify-content: space-evenly;
  z-index: 3000;
  width: 100%;
  font-size: 0.8em;
  padding: 8px 16px;
  background-color: white;
  border-top: 1px solid rgba(0, 0, 0, 0.125);
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.125);
}

.filters {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.custom-checkbox {
  color: #495057;
  background: white;
  margin-bottom: 4px;
  width: 80%;
  display: inline-block !important;
  line-height: 1;
}

.custom-control-label {
  padding-top: 5px;
}

.custom-checkbox .custom-control-input:checked ~ .custom-control-label::before {
  background-color: theme-color(primary);
  border-color: rgba(0, 0, 0, 0.3);
}

.collaps-toggle {
  margin: 5px 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

#apply {
  margin-top: 15px;
}
</style>
