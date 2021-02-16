import Vue from 'vue'
import Router from 'vue-router'
import Results from '../views/Results.vue'
import AboutUs from '../views/AboutUs.vue'
import BlmStatement from '../views/BlmStatement.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/about-us',
      name: 'AboutUs',
      component: AboutUs
    },
    {
      path: '/blm-statement',
      name: 'BlmStatement',
      component: BlmStatement
    },
    {
      path: '/:need',
      name: 'Results',
      component: Results,
      props: true
    }
  ]
})
