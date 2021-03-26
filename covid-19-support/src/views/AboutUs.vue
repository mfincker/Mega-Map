<template>
  <!-- About Us -->
  <div id="about-us">
    <h3>{{ $t('about.about-us.header') }}</h3>
    <i18n path="about.about-us.p1.text" tag="p"></i18n>
    <i18n path="about.about-us.p2.text" tag="p"></i18n>
    <i18n path="about.about-us.p3.text" tag="p">
      <a href="https://www.unboxproject.org/">{{ $t('about.about-us.p3.link') }}</a>
    </i18n>

    <h3>{{ $t('about.our-story.header') }}</h3>
    <p>
      <b>{{ $t('about.our-story.school-meals.title') }}</b> <br />
      <i>{{ $t('about.our-story.school-meals.subtitle') }}</i>
    </p>
    <i18n path="about.our-story.p1" tag="p"></i18n>
    <i18n path="about.our-story.p2.text" tag="p">
      <a href="https://www.sfgate.com/news/bayarea/article/Stanford-Students-Faculty-Create-Community-15293218.php">{{
        $t('about.our-story.p2.link0')
      }}</a>
      <a href="https://www.mercurynews.com/2020/03/20/map-where-in-the-bay-area-to-get-free-school-lunches-during-coronavirus-closures/">{{
        $t('about.our-story.p2.link1')
      }}</a>
      <a href="https://www.nbcbayarea.com/news/coronavirus/school-meal-pickup-locations-expand-as-state-ordered-to-stay-home/2259136/">{{
        $t('about.our-story.p2.link2')
      }}</a>
      <a
        href="https://www.kqed.org/news/11807973/grab-and-go-and-drive-up-services-allow-families-to-pick-up-food-at-shuttered-california-schools"
        >{{ $t('about.our-story.p2.link3') }}</a
      >
      <a href="https://paloaltoonline.com/news/2020/05/24/stanford-students-connect-public-to-free-student-lunches-via-texting-service">{{
        $t('about.our-story.p2.link4')
      }}</a>
      <a href="https://news.stanford.edu/2020/03/26/stanford-students-map-free-meals-bay-area-schoolchildren/">{{
        $t('about.our-story.p2.link5')
      }}</a>
      <a
        href="https://localnewsmatters.org/2020/05/26/stanford-team-launches-community-resources-website/?_gl=1*xgt6j5*_ga*ODk1NDk0MDc2LjE1ODk4MzA4ODE"
        >{{ $t('about.our-story.p2.link6') }}</a
      >
      <a href="https://www.facebook.com/watch/live/?v=722162215220117&ref=search">{{ $t('about.our-story.p2.link7') }}</a>
      <a
        href="https://twitter.com/Stanford/status/1277732918190718978?ref_src=twsrc%5Etfw%7Ctwcamp%5Etweetembed%7Ctwterm%5E1277732918190718978%7Ctwgr%5E%7Ctwcon%5Es1_&ref_url=https%3A%2F%2Fopenreferral.org%2Fcollaboration-in-crisis-responses-to-the-pandemic-across-our-network%2F"
      >
        {{ $t('about.our-story.p2.link8') }}</a
      >
      <a href="https://med.stanford.edu/pedsadvocacy.html">{{ $t('about.our-story.p2.link9') }}</a>
      <a href="https://med.stanford.edu/pedsadvocacy/engagement/COVID19.html">{{ $t('about.our-story.p2.link10') }}</a>
      <a href="https://www.nokidhungry.org/find-free-meals">{{ $t('about.our-story.p2.link11') }}</a>
    </i18n>
    <i18n path="about.our-story.p3" tag="p"></i18n>

    <p>
      <b>{{ $t('about.our-story.building-beyond.title') }}</b> <br />
      <i>{{ $t('about.our-story.building-beyond.subtitle') }}</i>
    </p>
    <i18n path="about.our-story.p4" tag="p"></i18n>
    {{ $t('about.our-story.p5') }}
    <ol>
      <li>{{ $t('about.our-story.p6') }}</li>
      <li>{{ $t('about.our-story.p7') }}</li>
      <li>{{ $t('about.our-story.p8') }}</li>
    </ol>

    <h3>{{ $t('about.our-team.header') }}</h3>
    <i18n path="about.our-team.p1" tag="p"></i18n>
    <p>
      <b>{{ $t('about.our-team.lead') }}:</b> Charlie Hoffs
    </p>
    <p>
      <b>{{ $t('about.our-team.data-engineers') }}:</b> Anjali Katta, Anthony Chen, Ashwin Wagadarikar, Deeya Viradia, Gowri Vadmal, Jared
      Klegar, Matthew Ding, Rob Resma, Darlene Wong
    </p>
    <p>
      <b>{{ $t('about.our-team.developers') }}:</b> Carlos Alba, Claire Huang, Marvin Bolaňos
    </p>
    <p>
      <b>{{ $t('about.our-team.translate') }}:</b> Angela Chau, Benjamin Reyes Topacio, Celine Gandingco, Karen I. Amaya Aguirre, Micah
      Trautwein, Rachel Koo, Songnan Wang
    </p>
    <p>
      <b>{{ $t('about.our-team.data-warriors') }}:</b> Abby Romo, Aidan Lee ({{ $t('about.our-team.school-meals-lead') }}), Allie Szekely
      ({{ $t('about.our-team.project-manager') }}), Alvin Lee, Andy Chen, Angelina Polselli, Anna Greene ({{
        $t('about.our-team.dv-lead')
      }}), Anna Zheng, Annabelle Smith, Aulden Foltz, Christopher LeBoa, Clarissa Lee, Dana Zhao, Emily Yang ({{
        $t('about.our-team.school-meals-lead')
      }}), Isabelle Foster, Kaile Maske, Kashika Bharol ({{ $t('about.our-team.health-lead') }}), Matthew Choi, Miles Montegut, Ryan Lee,
      Zoya Chughtai ({{ $t('about.our-team.health-lead') }})
    </p>
    <i18n path="about.our-team.p2.text" tag="p">
      <a href="https://nccovidsupport.org/">{{ $t('about.our-team.p2.link0') }}</a>
      <a href="https://datalab.stanford.edu/impact-lab">{{ $t('about.our-team.p2.link1') }}</a>
      <a href="https://biglocalnews.org/">{{ $t('about.our-team.p2.link2') }}</a>
    </i18n>

    <h3>{{ $t('about.info-sources.header') }}</h3>
    <i18n path="about.disclaimer.p" tag="p"></i18n>
    <i18n path="about.info-sources.p1" tag="p"></i18n>
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
        <a href="https://ecologycenter.org/fmfinder/">{{ $t('about.info-source.link3') }}</a>
      </li>
      <li>
        <a href="https://sfgov.maps.arcgis.com/apps/webappviewer/index.html?id=bb080a525416426c9f96057a00367b4d">{{
          $t('about.info-source.link4')
        }}</a>
      </li>
      <li>
        <a href="https://www.arcgis.com/apps/webappviewer/index.html?appid=ddf8ba621416421ebd3fa5ebeeb5e684">{{
          $t('about.info-source.link5')
        }}</a>
      </li>
      <li>
        <a href="https://www.acgov.org/maps/food-services.htm">{{ $t('about.info-source.link6') }}</a>
      </li>
      <li>
        <a href="https://cocogis.maps.arcgis.com/apps/webappviewer/index.html?id=fea1f3021a50455495b7e7e11325ecd4">{{
          $t('about.info-source.link7')
        }}</a>
      </li>
      <li>
        <a href="https://calfresh.dss.ca.gov/food/officelocator/">{{ $t('about.info-source.link8') }}</a>
      </li>
      <li>
        <i18n path="about.info-source.p2.text" tag="p">
          <a href="findcovidtesting.org">{{ $t('about.info-source.p2.link0') }}</a>
          <a href="https://services.arcgis.com/8ZpVMShClf8U8dae/arcgis/rest/services/TestingLocations_public/FeatureServer">{{
            $t('about.info-source.p2.link1')
          }}</a>
        </i18n>
      </li>
    </ul>

    <h3>{{ $t('about.contact-us.header') }}</h3>
    <i18n path="about.contact-us.p1.text" tag="p">
      <a href="https://www.unboxproject.org/blog/bayareacommunityorgimpact">{{ $t('about.contact-us.p1.link0') }}</a>
      <a href="https://github.com/dcl-covid-19/mega-map-dev">{{ $t('about.contact-us.p1.link1') }}</a>
      <a href="info@unboxproject.org">{{ $t('about.contact-us.p1.link2') }}</a>
    </i18n>

    <h3>{{ $t('about.disclaimer.header') }}</h3>
    <p>
      Bay Area Community (“BAC” or “we”) is a volunteer-driven project. Although we work hard to keep this site as up-to-date and accurate
      as possible, the information on this website is provided “as is,” “as available,” and “with all faults.” Your access to, any reliance
      upon, and/or use of the information is at your sole risk. Please make sure to contact the resource directly for the latest updates.
      Due to the uncertainty surrounding the rapid spread of COVID-19, information is changing frequently.
    </p>
    <p>
      BAC does not provide any of the services listed on this site, nor are we affiliated with any of the organizations listed. BAC makes no
      claims, promises or guarantees about the accuracy, completeness, or adequacy of the contents of this website and expressly disclaims
      liability for errors and omissions in the contents of this website. No warranty of any kind, implied, expressed or statutory is given
      with respect to the contents of this website or its hyperlinks to other Internet resources. References in this application or website
      to any specific services or the use of any trade, entity or corporation name is for the information and convenience of the public, and
      does not constitute endorsement or recommendation.
    </p>
    <p>
      BAC shall assume no liability for any errors, omissions, or inaccuracies in the information provided, regardless of their cause, or
      for any decisions made or actions taken or not taken by the user of this application or website (“you”) in reliance upon any
      information or data furnished hereunder. By using this application or website, you agree to indemnify and hold harmless BAC and its
      volunteers, employees, representatives, agents, and affiliates from any claims or demands arising out of or in connection with your
      use of this application or website.
    </p>
    <p>
      BAC may modify this disclaimer at any time without notice to you by posting a revised disclaimer on this application or website. The
      use of this information indicates your unconditional acceptance of the above disclaimer.
    </p>
    <p>
      Note on data sharing: The information on the BAC website has been gathered from public web sources by volunteers or entered by
      business owners/resource providers. The data is provided to assist the public, local businesses, government partners, and non-profits
      during the COVID-19 pandemic. The data should not be used for commercial ventures or other purposes without the express permission of
      BAC.
    </p>
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
