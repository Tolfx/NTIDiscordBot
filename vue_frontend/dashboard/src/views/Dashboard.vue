<template>
  <div class="bg-green-400">
    <h1 class="text-4xl text-white">This is the dashboard, you are logged in? {{authenticated}}</h1>
    <h1>{{userInformation}}</h1>
    <button @click="Logout()" class="text-white bg-theme">Logout</button>
  </div>
</template>
<script>
import { useStore } from 'vuex'
import { computed } from 'vue'
export default {
  setup() {
    const store = useStore();

    //Calling Logout
    const Logout = () => {
      store.dispatch('auth_logout')
    }
  
    return {
      authenticated: computed(() => store.state.status),
      userInformation: computed(() => store.state.userInformation),
      Logout
    }
  },
}
</script>
