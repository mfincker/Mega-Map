<template>
  <!-- About Us -->
  <div id="about-us">
    <h3>{{ $t('about.about-us.header') }}</h3>
    <i18n path="about.about-us.p1.text" tag="p">
      <a
        href="https://www.google.com/maps/d/u/0/viewer?mid=1xfWfgbjULao-rlKJFfWT07hR-StV4Zx9&ll=37.46071505887045%2C-121.93017180578084&z=11"
        >{{ $t('about.about-us.p1.link') }}</a
      >
    </i18n>
    <i18n path="about.about-us.p2.text" tag="p">
      <a href="https://nccovidsupport.org/">NC Covid Support</a>
    </i18n>
    <i18n path="about.about-us.p3.text" tag="p">
      <a href="https://github.com/dcl-covid-19/mega-map-dev">{{ $t('about.about-us.p3.link') }}</a>
    </i18n>
    <!-- Info sources -->
    <h3>{{ $t('about.info-sources.header') }}</h3>
    <p>{{ $t('about.info-sources.p1') }}</p>
    <ul>
      <li>
        <a
          href="https://usda-fns.hub.arcgis.com/datasets/USDA-FNS::snap-store-locations/data?geometry=41.839%2C-10.004%2C-171.911%2C74.154&page=5"
          >{{ $t('about.info-source.link1') }}</a
        >
      </li>
      <li>
        <a href="https://www.wicstorelocator.com/address_geo.php">{{ $t('about.info-source.link2') }}</a>
      </li>
      <li>
        <a href="https://www.shfb.org/">{{ $t('about.info-source.link3') }}</a>
      </li>
      <li>
        <a href="http://med.stanford.edu/pedsadvocacy.html">{{ $t('about.info-source.link4') }}</a>
      </li>
    </ul>
    <p>{{ $t('about.info-sources.p2') }}</p>
    <!-- Contact Us -->
    <h3>{{ $t('about.contact-us.header') }}</h3>
    <i18n path="about.contact-us.p1.text" tag="p"> <a href="mailto:hi@bayareacommunity.org">hi@bayareacommunity.org</a>. </i18n>
    <!-- Disclaimer -->
    <h3>{{ $t('about.disclaimer.header') }}</h3>
    <p>{{ $t('about.disclaimer.p') }}</p>
  </div>
</template>
<script>
export default {
  name: 'about-us'
}
</script>
<style lang="scss">
#about-us {
  max-width: 1024px;
  padding: 24px 24px 100px;
  margin: 0 auto;
}
</style>
