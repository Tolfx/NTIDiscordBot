<template>
  <router-view/>
</template>

<script>
import { useRouter } from "vue-router"

export default {
  setup() {
    const router = useRouter();

    //Auth Guard
    const auth = null
    router.beforeEach((to, from, next) => {
      if (to.matched.some(record => record.meta.requiresAuth)) {
        // this route requires auth, check if logged in
        // if not, redirect to login page.
        if (!auth) {
          next({
            path: '/',
            //query: { redirect: to.fullPath }
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