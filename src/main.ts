import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import './styles/index.scss'
import dayjs from 'dayjs'
Vue.config.productionTip = false

Vue.use(ElementUI)

Vue.filter('DateFormat', function (value: any) {
  return dayjs(value).format('YYYY-MM-DD')
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')