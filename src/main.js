import 'web-animations-js'
import Vue from 'vue'
import { MdButton, MdIcon } from 'vue-material/dist/components'

import App from './App.vue'

Vue.config.productionTip = false

Vue.use(MdButton)
Vue.use(MdIcon)

new Vue({
  render: h => h(App),
}).$mount('#app')
