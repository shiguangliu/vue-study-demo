import { createApp } from 'vue'
import App from './App.vue'
import Element from 'element-plus'
import Router from './router'
// import store from './store'
import 'element-ui/lib/theme-chalk/index.css';

const vue = createApp(App)
vue.use(Element)
vue.use(Router)
// vue.use(store)
vue.mount('#app')
vue.Vue.config.productionTip = false
// vue.use(Element)
// createApp(App).mount('#app')
// createApp(App).Vue.config.productionTip = false

