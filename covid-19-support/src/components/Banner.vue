<template>
  <b-jumbotron fluid id="pebt-banner" header-level="5" header-tag="h5">
    <template v-slot:header>
      {{ $t('pebt.header') }}
    </template>
    <template v-slot:lead>
      {{ $t('pebt.lead') }}
      <b-button id="close-banner" @click="$emit('hide-banner')"><i class="fa fa-times-circle-o fa-lg" aria-hidden="true"></i> </b-button>
    </template>
    <b-button variant="primary" :href="$t('pebt.link_url')" target="_blank">{{ $t('pebt.link') }}</b-button>
  </b-jumbotron>
</template>

<script>
export default {
  name: 'banner'
}
</script>
<style type="scss" scoped>
#pebt-banner {
  padding: 15px;
  background-color: #f48171;
  color: white;
  position: relative;

  &.btn-primary {
    background-color: #fdba5e;
  }
}

.container {
  max-width: 650px !important;
}

@media (max-width: 350px) {
  #pebt-banner {
    padding-bottom: 100px;
  }
}

#close-banner {
  position: absolute;
  right: 5px;
  background-color: inherit !important;
  color: white;
  border: none;
}
</style>
