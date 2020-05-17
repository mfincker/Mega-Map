<template>
  <b-navbar sticky="true" toggleable="lg" type="dark" variant="primary" id="topnav">
    <b-navbar-toggle target="nav-collapse" />
    <b-collapse id="nav-collapse" v-model="navState" is-nav>
      <b-navbar-nav>
        <b-nav-item to="/">
          Home
        </b-nav-item>
        <b-nav-item to="/about-us">
          About us
        </b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-item-dropdown right>
          <template v-slot:button-content>
            <i class="fas fa-globe-americas" aria-hidden="true" />
            <span v-html="language" class="language" />
          </template>
          <b-dropdown-item href="#" v-for="item in languages" v-bind:key="item.iso" class="d-lg-block d-xl-block">
            <span :title="$t('languages.' + item.iso)"
              ><div
                v-html="item.name"
                :lang="item.iso"
                @click="$emit('language-selected', item)"
                :class="{ selected: item.name == language }"
              ></div
            ></span>
          </b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
export default {
  name: 'app-header',
  props: {
    language: String
  },
  data() {
    return {
      navState: false,
      languages: [
        { iso: 'en', name: 'English' },
        { iso: 'es', name: 'Espa&#241;ol' },
        { iso: 'fr', name: 'Fran&#231;ais' },
        { iso: 'ko', name: '한국어' },
        { iso: 'ar', name: 'عربى' },
        { iso: 'ja', name: '日本人' },
        { iso: 'zh', name: '中文' },
        { iso: 'ms', name: 'ဗမာ' },
        { iso: 'vi', name: 'Tiếng Việt' },
        { iso: 'tl', name: 'Tagalog' }
      ]
    }
  },
  watch: {
    navState: function (val) {
      this.$emit('toggled-nav-bar', val)
    }
  }
}
</script>

<style lang="css" scoped>
.navbar {
  z-index: 99999 !important;
  padding: 8px 16px;
  font-size: 1rem;
  display: block;
}

.navbar-toggler {
  padding: 0.15rem;
  border: none;
  font-size: 1rem;
}

.language {
  padding: 0 5px;
}
</style>
