<template>
  <b-jumbotron fluid id="pebt-banner" header-level="5" header-tag="h3">
    <template v-slot:header>
      {{ $t('pebt.header') }}
    </template>
    <template v-slot:lead>
      {{ $t('pebt.lead') }}
    </template>
    <b-button variant="primary" href="https://ca.p-ebt.org/" target="_blank">{{ $t('pebt.link') }}</b-button>
  </b-jumbotron>
</template>

<script>
export default {
  name: 'banner'
}
</script>
<style type="scss">
#pebt-banner {
  padding: 15px;
  background-color: #f48171;

  &.btn-primary {
    background-color: #fdba5e;
  }

  &.container {
    max-width: 650px !important;
  }
}
</style>
