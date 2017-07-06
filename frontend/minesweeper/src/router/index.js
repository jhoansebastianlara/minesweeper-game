import Vue from 'vue'
import Router from 'vue-router'
import Play from '@/components/play/Play'
import PageNotFound from '@/components/page-not-found/PageNotFound'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'play',
      component: Play
    }, {
      path: '/*',
      name: 'page-not-found',
      component: PageNotFound
    }
  ],
  mode: 'history'
})
