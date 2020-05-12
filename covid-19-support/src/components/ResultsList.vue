<template>
  <div class="resultWrapper">
    <div ref="results" class="resultList">
      <div
        v-for="item in markers"
        v-bind:key="item.cartodb_id"
        class="resultItem"
        :class="{ selected: item.cartodb_id == resource.resourceId, closedOne: item.isOpen == false }"
        :ref="'result' + item.cartodb_id"
        @click="$emit('resource-selected', { resourceId: item.cartodb_id, isSetByMap: false })"
      >
        <h5 class="resultTitle">{{ item.provider_name }}</h5>
        <template v-if="!!item.provider_addloc"
          ><div class="addloc">{{ item.provider_addloc }}</div></template
        >
        <div v-if="!item.isOpen" class="closed">{{ getClosedMessage() }}</div>
        <span class="resultAddress">
          <span v-if="!!item.cuisine">{{ item.cuisine }}<br /></span>
          {{ item.address }},
          {{ item.city }}
        </span>
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
    resource: { resourceId: Number, isSetByMap: Boolean },
  },
  watch: {
    resource: function (val) {
      if (val.isSetByMap) {
        var top = this.$refs['result' + val.resourceId][0].offsetTop - 330
        this.$refs['results'].scrollTo(0, top)
      }
    }
  },
  methods: {
    getClosedMessage: function () {
      return this.$t(`label.closed-today`)
    }
  }
}
</script>

<style lang="css">
.resultWrapper {
  scrollbar-color: $gray-900 $gray-700;
}

.addloc {
  /*margin-bottom: 8px;*/
}
.resultList {
  /*max-height: calc(100vh - 294px);*/
  /*max-height: 120px;*/
  overflow-y: auto;
  height: 120px;
  width: 100%;
  position: absolute;
  bottom: 0;
  /*background-color: rgb(115, 10, 110, 0.5);*/
  z-index: 2000;
}
.resultItem {
  padding: 3px;
  display: block;
  height: 80px;
  border-bottom: solid 1px rgba(0, 0, 0, 0.125);
  font-size: 0.75rem;
  /*max-width: 282px;*/
  background: theme-color('secondary');

  @media (prefers-color-scheme: dark) {
    color: $gray-100;
    background: $gray-800;
  }

  &.selected {
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
  font-size: 0.75rem;
  margin: 5 auto !important;
  padding: 0 !important;
}
.resultAddress {
  font-size: 0.6rem;
  display: block;
  max-width: 262px;
}
.closedOne {
  /* background: #f9f9f9 !important; */
}
</style>
