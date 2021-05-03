<template>
  <div class="bg-green-400">
    <h1 class="text-4xl text-white">This is the dashboard, you are logged in!</h1>
    <button @click="Logout()" class="text-white bg-theme">Logout</button>
  </div>
</template>
<script>
import { useStore } from 'vuex'
export default {
  setup() {
    const store = useStore();

    console.log(store.state.status)
    console.log(store.state.userInformation)

    //Calling Logout
    const Logout = () => {
      store.dispatch('auth_logout')
    }

    return {
      Logout
    }
  },
}
</script>
