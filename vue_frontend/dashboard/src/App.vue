<template>
  <router-view/>
</template>

<script>
import { apiURL } from './settings.js'
import { useRouter } from "vue-router"
import { useStore } from 'vuex'
export default {
  setup() {
    //Auth Guard
    const router = useRouter();
    const store = useStore();

    router.beforeEach((to, from, next) => {
      //Validate Token
      if (store.state.token != '') {
        fetch(`${apiURL}validate/token`, {
            method: "GET",
            headers: {
              "authorization": store.state.token
            }
          }
        ).then(response => {
            if (response.status == 200) {
              console.log('Token valid')
              store.dispatch('auth_success', store.state.token)
            } else {
              console.log('Token not valid')
              store.dispatch('auth_logout')
            }
        })
      }
      //Check if user is authorizted to view page
      if (to.matched.some(record => record.meta.requiresAuth)) {
        // this route requires auth, check if logged in
        // if not, redirect to login page.
        if (store.getters.authStatus) {
          next({
            path: '/secure',
            query: { redirect: to.fullPath }
          })
        } else {
          next()
        }
      } else {
        next() // make sure to always call next()!
      }
    })
  },
}
</script>