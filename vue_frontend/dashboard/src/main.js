require('dotenv').config()
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/tailwind.css'
import Axios from 'axios'

const app = createApp(App)

app.config.globalProperties.$http = Axios;
const token = localStorage.getItem('token')
if (token) {
    app.config.globalProperties.$http.defaults.headers.common['Authorization'] = token
}

createApp(App).use(store).use(router).mount('#app')
