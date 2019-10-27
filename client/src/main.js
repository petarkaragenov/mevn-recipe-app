import Vue from 'vue'
import axios from 'axios';
import VueLazyLoad from 'vue-lazyload'
import App from './App.vue'
import router from './router'

import 'vue-image-lightbox/dist/vue-image-lightbox.min.css'
import './assets/index.css'

window.axios = axios

Vue.config.productionTip = false

Vue.use(VueLazyLoad)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
