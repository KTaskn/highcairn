import Vue from 'vue'
import Vuesax from 'vuesax'
import Router from 'vue-router'
import App from './App.vue'
import TopPage from './components/pages/TopPage.vue'
import EditPage from './components/pages/EditPage.vue'

import 'material-icons/iconfont/material-icons.css'
import 'vuesax/dist/vuesax.css'


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
