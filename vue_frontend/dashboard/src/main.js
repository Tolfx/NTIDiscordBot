require('dotenv').config()
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/tailwind.css'

fetch("http://localhost:5623/validate/token", {
    method: "GET",
    headers: {
      "authorization": store.state.token
    }
  }
).then(response => {
    if (response.status != 200) {
        console.log('Token not valid')
        localStorage.removeItem('token')
    }
})
createApp(App).use(store).use(router).mount('#app')
