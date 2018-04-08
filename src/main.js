// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueResource from 'vue-resource'
import router from './router'
import Axios from 'axios'
import Layout from '@/components/layout.vue'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import '@/common/stylus/index.styl'

Vue.use(VueAwesomeSwiper)
Vue.use(VueResource)


Vue.prototype.$axios = Axios
Vue.http.options.emulateJSON = true
/* eslint-disable no-new */
new Vue({
  el: '#guoqianchen',
  router,
  // template: '<Layout/>',
  // components: { Layout }
  render:h => h(Layout)
})
