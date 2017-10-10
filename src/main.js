import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import fastclick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'

// Vue.config.productionTip = false
import 'common/stylus/index.styl'

fastclick.attach(document.body)
// 图片懒加载
Vue.use(VueLazyLoad, {
  loading: '/static/loading-svg/loading-spokes.svg',
  try: 3
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
