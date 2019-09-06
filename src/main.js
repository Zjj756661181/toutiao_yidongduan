import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import Vant from 'vant'
import VeeValidate, { Validator } from 'vee-validate'
// 导入VeeValidate的中文包
import zhCN from 'vee-validate/dist/locale/zh_CN'
import 'vant/lib/index.css'
import '@/style/index.less'

Vue.use(Vant)
// 配置插件VeeValidate
Vue.use(VeeValidate)
// 配置中文
Validator.localize('zhCN', zhCN)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
