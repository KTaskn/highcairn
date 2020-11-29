import Vue from 'vue'
import Vuesax from 'vuesax'
import App from './App.vue'
import TopPage from './components/pages/TopPage.vue'
import EditPage from './components/pages/EditPage.vue'
import Router from 'vue-router'

import 'vuesax/dist/vuesax.css'
import 'material-icons/iconfont/material-icons.css'


Vue.config.productionTip = false

Vue.use(Router)
Vue.use(Vuesax, {
})

const routes = new Router({
  routes: [
    {
      path: '/',
      name: 'TopPage',
      component: TopPage
    },
    {
      path: '/editor',
      name: 'EditPage',
      component: EditPage
    }
  ]
})

new Vue({
  router: routes,
  render: h => h(App)
}).$mount('#app')
