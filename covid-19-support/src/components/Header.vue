<template>
  <b-navbar toggleable="lg" type="dark" variant="primary" id="topnav">
    <!-- <b-navbar-brand href="#">
      <i18n path="title" tag="span" class="pagetitle">
        <span class="ncblue">NC</span>
      </i18n>
    </b-navbar-brand> -->

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-item href="#" v-for="item in languages" v-bind:key="item.iso" class="d-none d-lg-block d-xl-block">
          <span :title="$t('languages.' + item.iso)"
              ><div v-html="item.name" :lang="item.iso" @click="$emit('language-selected', item)"
              :class="{ 'selected' : item.name == language }"></div
            ></span>
        </b-nav-item>

        <!-- <b-nav-item right>
          <b-nav-form>
            <b-button size="sm" class="my-2 my-sm-0" variant="buttons" type="button" @click="$bvModal.show('about-us')"
              ><i class="fas fa-plus-square" aria-hidden="true" /> {{ $t('about.devhelp.addbusiness') }}</b-button
            >
          </b-nav-form>
        </b-nav-item> -->

        <!-- <b-nav-item right @click="$bvModal.show('about-us')">
          {{ $t('about.linktext') }}
        </b-nav-item> -->
        <b-nav-item-dropdown right class="d-lg-none">
          <template v-slot:button-content>
            <i class="fas fa-globe-americas" aria-hidden="true" />
            <span v-html="language" class="language" />
          </template>
          <b-dropdown-item href="#" v-for="item in languages" v-bind:key="item.iso">
            <span :title="$t('languages.' + item.iso)"
              ><div v-html="item.name" :lang="item.iso" @click="$emit('language-selected', item)"
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
      languages: [
        { iso: 'en', name: 'English' },
        { iso: 'es', name: 'Espa&#241;ol' },
        { iso: 'fr', name: 'Fran&#231;ais' },
        { iso: 'ko', name: '한국어' },
        { iso: 'ar', name: 'عربى' },
        { iso: 'ja', name: '日本人' },
        { iso: 'zh', name: '中文' },
        { iso: 'ms', name: 'ဗမာ' },
      ]
    }
  }
}
</script>

<style lang="css" scoped>
#topnav {
  /* position: absolute; */
  width: 100%;
  z-index: 1050;
}

.navbar {
  min-height: 37px;
}

.navbar-toggler{
  padding: 0.15rem;
}

.selected {
  color: rgba(255, 255, 255, 1)
}

.navbar-brand {
  margin-right: 2px !important;
  font-size: 0.8rem !important;
  padding: 0.2rem 0 !important;
  font-weight: 600;
}

.language {
  padding: 0 5px;
}

@media (min-width: 768px) {
  .navbar-brand {
    margin-right: 2px !important;
    font-size: 1.25rem !important;
  }
}

.ncblue {
  color: $teal;
}
</style>
