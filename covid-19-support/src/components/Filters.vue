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
          {{ $t(item[0]) }}
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
import { needs } from '@/resources/resources.js'
export default {
  name: 'Filters',
  props: {
    markers: Array,
    activeFilters: Array
  },
  data() {
    return {
      selected: []
    }
  },
  mounted() {
    this.selected = this.activeFilters
  },
  methods: {
    boxSelected: function (content) {
      this.$emit('box-selected', content)
    },
    toggleChevron(evt) {
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
    need() {
      return needs[this.$route.params.need]
    },
    // Displayed filters
    filterList() {
      if (this.need.filters.length > 0) {
        return this.need.filters
      }
      return [null]
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
