<template>
  <b-navbar toggleable="lg" type="dark" variant="primary" id="topnav">
    <b-navbar-toggle target="nav-collapse">
      <i class="fas fa-globe-americas" aria-hidden="true" />
      <span v-html="language" class="language" />
      <i class="fas fa-caret-down" aria-hidden="true" />
    </b-navbar-toggle>
    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item href="#" v-for="item in languages" v-bind:key="item.iso" class="d-lg-block d-xl-block">
          <span :title="$t('languages.' + item.iso)"
            ><div
              v-html="item.name"
              :lang="item.iso"
              @click="$emit('language-selected', item)"
              :class="{ selected: item.name == language }"
            ></div
          ></span>
        </b-nav-item>
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
      languages: [
        { iso: 'en', name: 'English' },
        { iso: 'es', name: 'Espa&#241;ol' },
        { iso: 'fr', name: 'Fran&#231;ais' },
        { iso: 'ko', name: '한국어' },
        { iso: 'ar', name: 'عربى' },
        { iso: 'ja', name: '日本人' },
        { iso: 'zh', name: '中文' },
        { iso: 'ms', name: 'ဗမာ' }
      ]
    }
  }
}
</script>

<style lang="css" scoped>
.navbar {
  z-index: 9000;
  padding: 8px 16px;
  font-size: 1rem;
}

.navbar-toggler {
  padding: 0.15rem;
  border: none;
  font-size: 1rem;
}

.selected {
  color: rgba(255, 255, 255, 1);
}

.language {
  padding: 0 5px;
}
</style>
