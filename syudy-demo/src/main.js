import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import Router from './router'
import 'element-plus/dist/index.css'

const vue = createApp(App)
vue.use(ElementPlus)
vue.use(Router)
vue.mount('#app')
vue.Vue.config.productionTip = false

