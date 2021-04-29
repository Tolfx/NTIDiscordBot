<template>
  <div class="flex items-center justify-center bg-discord h-screen">
      <div>
          <h1>oAuth2 redirect page</h1>
      </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'

export default {
    setup () {
        const router = useRouter()

        //localStorage.setItem('token', 'awdawd')
        //localStorage.removeItem('token')
        router.push('/dashboard')
    }
}
</script>
