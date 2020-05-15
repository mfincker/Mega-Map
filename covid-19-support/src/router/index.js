import Vue from 'vue'
import Router from 'vue-router'
import Results from '@/components/Results.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/:need',
      name: 'Results',
      component: Results,
      props: true
    }
  ]
})
