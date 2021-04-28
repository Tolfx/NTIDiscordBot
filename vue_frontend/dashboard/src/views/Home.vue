<template>
  <div class="bg-gray-600 h-screen flex items-center justify-center">
    <div>
      <h1>{{loggedin}}</h1>
      <button class="bg-discord hover:bg-gray-400 text-white font-bold py-2 px-4 rounded inline-flex items-center">
        <img class="h-10" src = "../assets/logos/Discord-Logo-White.svg" alt="Logo"/>
        <span>Sign in with Discord</span>
      </button>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { computed } from 'vue'
export default {
  name: 'Home',
  setup () {
    const store = useStore()
    return {
      loggedin: computed(() => store.getters.isLoggedIn)
    }
  }
}
</script>
