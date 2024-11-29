import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import router from './router/index.js'
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/theme-chalk/dark/css-vars.css'
import 'element-plus/dist/index.css'
import {createPinia} from "pinia";

import 'font-awesome/css/font-awesome.min.css';

const pinia = createPinia()
const app = createApp(App)

for (const [key,component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}


app
    .use(pinia)
    .use(router)
    .use(ElementPlus)

    .mount('#app')
