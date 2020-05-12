<template>
  <span>
    <b-list-group class="list-group-flush">
      <b-list-group-item variant="sideNav" button class="backtolist" @click="$emit('close-details')">
        <i class="fas fa-arrow-left" />
        {{ $t('label.backtolist') }}
      </b-list-group-item>
    </b-list-group>
    <b-list-group class="list-group-flush business-details">
      <b-list-group-item variant="sideNav" :class="infotype">
        <!-- <i class="fas" :class="icon" /> -->
        <div>
          <div class="title">
            <i :class="businessIcon(business)"></i>
            <div class="busName">
              <h5>{{ business.provider_name }}</h5>
              <span v-if="!!business.provider_addloc">{{ business.provider_addloc }}</span>
              <!-- <template v-if="!!business.marker.cuisine">{{ business.marker.cuisine }}</template> -->
            </div>
          </div>
          <p>
            <b>{{ $t('label.address') }}:</b><br />
            {{ business.address }}, {{ business.city }}, {{ business.state }}
            {{ business.zip }}<br />
            <a :href="businessGoogleMapUrl">
              View on Google Maps
            </a>
          </p>

          <p>
            <icon-list-item
              v-if="business.discount_medical == 1"
              icon="fas fa-user-md"
              :title="$tc('label.discount_medical', 1)"
            />
            <icon-list-item v-if="business.family_meal == 1" icon="fas fa-user-friends" :title="$tc('category.family', 2)" />
            <icon-list-item v-if="business.meal_student == 1" icon="fas fa-school" :title="$tc('label.meal_student', 1)" />
            <icon-list-item v-if="business.meal_public == 1" icon="fas fa-users" :title="$tc('label.meal_public', 1)" />
            <icon-list-item v-if="business.free_produce == 1" icon="fas fa-apple-alt" :title="$tc('label.free_produce', 1)" />
            <icon-list-item
              v-if="business.free_groceries == 1"
              icon="fas fa-shopping-basket"
              :title="$tc('label.free_groceries', 1)"
            />
            <icon-list-item v-if="business.curbside == 1" icon="fas fa-car" :title="$tc('label.curbside', 1)" />
            <icon-list-item v-if="business.drive_thru == 1" icon="fas fa-car-side" :title="$t('label.drive_thru')" />
            <icon-list-item v-if="business.order_online == 1" icon="fas fa-mouse" :title="$t('label.order_online')" />
            <icon-list-item v-if="business.delivery == 1" icon="fas fa-shipping-fast" :title="$t('label.delivery')" />
          </p>
          <p>
            <icon-list-item
              v-if="!!business.contact"
              icon="fas fa-phone-alt"
              :title="business.contact"
              :link="'tel:' + business.contact"
            />

            <!-- <icon-list-item
              v-if="!!business.marker.contactspanish"
              icon="fas fa-phone-alt"
              :title="business.marker.contactspanish + ' (' + $t('languages.es').toLowerCase() + ')'"
              :link="'tel:' + business.marker.contactspanish"
            /> -->

            <icon-list-item
              v-if="!!business.web_link"
              icon="fas fa-globe"
              :title="getDomain(business.web_link)"
              :link="business.web_link"
            />

            <icon-list-item
              v-if="!!business.email"
              icon="fas fa-envelope"
              :title="getDomain(business.email)"
              :link="'mailto:' + business.email"
            />
          </p>
          <opening-hours :business="business" :title="$t('label.openinghours')"></opening-hours>

          <opening-hours :business="business" :title="$t('label.seniorhours')" :senior="true"></opening-hours>

          <template v-if="!!business.instructions">
            <p>
              <b>{{ $t('label.instructions') }}:</b><br />{{ business.instructions }}
            </p>
          </template>
          <template v-if="!!business.offers">
            <p>
              <b>{{ $t('label.offers') }}:</b><br />{{ business.offers }}
            </p>
          </template>
          <template v-if="!!business.notes">
            <p>
              <b>{{ $t('label.notes') }}:</b><br />{{ business.notes }}
            </p>
          </template>
          <p class="updated">Details last updated: {{ business.last_update }}</p>
        </div>
      </b-list-group-item>
    </b-list-group>
  </span>
</template>

<script>
import OpeningHours from '@/components/OpeningHours.vue'
import IconListItem from '@/components/IconListItem.vue'
import { businessIcon } from '@/utilities'
export default {
  name: 'BusinessDetails',
  components: {
    OpeningHours,
    IconListItem
  },
  data() {
    return {}
  },
  props: {
    infotype: { type: String },
    icon: { type: String },
    business: Object
  },
  methods: {
    getDomain: function (url) {
      var urlParts = url.replace('http://', '').replace('https://', '').replace('www.', '').split(/[/?#]/)
      return urlParts[0]
    },
    businessIcon: businessIcon
  },
  computed: {
    businessGoogleMapUrl() {
      var url =
        'https://www.google.com/maps/search/?api=1&query=' +
        (this.business.provider_addloc
          ? encodeURI(this.business.provider_addloc)
          : encodeURI(this.business.provider_name)) +
        '+' +
        encodeURI(this.business.address) +
        '+' +
        encodeURI(this.business.city) +
        '+' +
        encodeURI(this.business.state) +
        '+' +
        encodeURI(this.business.zip)

      return url.replace(/%20/g, '+').toLowerCase()
    }
  }
}
</script>

<style scoped lang="scss">
.business-details {
  max-height: calc(100vh - 237px);
  overflow-y: auto;
  overflow-x: hidden;
}
.backtolist {
  font-size: 0.8rem;

  i {
    margin-right: 0.375rem;
  }

  // &:hover {
  //   background: rgba(0, 0, 0, 0.05) !important;
  //   cursor: pointer;
  // }
}

.title {
  margin: 0 0 0.75rem 0;
  display: inline-block;

  i {
    font-size: 3rem;
    color: #ee8842;
    margin: 7px 10px 7px 0;
    float: left;
  }
}

.busName {
  margin-left: 54px;
  width: 208px;
}

.green {
  font-size: 0.8rem;
  // color: #666;

  & > div {
    width: 243px;
  }
}

.updated {
  color: #aaa;
}

a {
  color: #ee8842 !important;
}
</style>
