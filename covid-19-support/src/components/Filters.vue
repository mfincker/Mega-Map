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
          return ['children', 'seniors', 'open_today', 'safe_pick_up']
        case 'snap_wic_retailer':
          return ['wic', 'special_hours', 'safe_pick_up', 'farmers_market']
        case 'meal':
          return ['seniors', 'children', 'open_today', 'safe_pick_up']
        case 'mental_health':
          return ['free', 'in_person', 'telehealth']
        case 'medical':
          return ['free', 'in_person', 'telehealth']
        default:
          return [null]
      }
    }
  }
}
</script>

<style lang="scss">
.filters {
  position: relative;
  justify-content: space-evenly;
  z-index: 3000;
  width: 100%;
  font-size: 0.85em;
  padding: 8px 16px;
  background-color: white;
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
