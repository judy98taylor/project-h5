import Vue from 'vue'
import Router from 'vue-router'
let Index = () => import('@/pages/Index/index.vue')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    }
  ]
})
