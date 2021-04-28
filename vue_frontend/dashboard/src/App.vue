<template>
  <router-view/>
</template>

<script>
import { useRouter } from "vue-router"
import { useStore } from 'vuex'
export default {
  setup() {
    //Auth Guard
    const router = useRouter();
    const store = useStore();


    router.beforeEach((to, from, next) => {
      if (to.matched.some(record => record.meta.requiresAuth)) {
        // this route requires auth, check if logged in
        // if not, redirect to login page.
        if (!store.getters.isLoggedIn) {
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