<template>
  <b-jumbotron fluid id="blm-banner" header-level="5" header-tag="h3">
    <template v-slot:header>
      Black Lives Matter.
    </template>
    <div id="blm-links">
      <b-button class="blm-button" @click="$emit('blm-resource-selected')">Support Black-owned businesses</b-button>
      <b-button class="blm-button" to="/blm-statement" target="_blank">Read our statement on BLM</b-button>
    </div>
  </b-jumbotron>
</template>

<script>
export default {
  name: 'blm-banner'
}
</script>
<style type="scss" scoped>
#blm-banner {
  padding: 15px;
  background-color: black !important;
  color: white;
  position: relative;
}

.container {
  max-width: 650px !important;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.display-5 {
  align-self: center;
  text-align: center;
}

#blm-links {
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.blm-button {
  border-radius: 15px !important;
  margin: 5px;
}
</style>
