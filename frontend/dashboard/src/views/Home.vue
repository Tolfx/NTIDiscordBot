<template>
  <div class="bg-gray-600 h-screen flex items-center justify-center">
    <div>
      <h1>{{loggedin}}</h1>
      <h1>{{authenticated}}</h1>
      <h1>{{user}}</h1>
      <button @click="signInWithDiscord()" class="bg-discord hover:bg-gray-400 text-white font-bold py-2 px-4 rounded inline-flex items-center">
        <img class="h-10" src = "../assets/logos/Discord-Logo-White.svg" alt="Logo"/>
        <span>Sign in with Discord</span>
      </button>
    </div>
  </div>
</template>

<script>
import { webURL } from '../settings.js'
import { useStore } from 'vuex'
import { computed } from 'vue'
export default {
  name: 'Home',
  setup () {
    const store = useStore()

    const signInWithDiscord = () => {
      console.log('Initiating discord sign in');
      const callbackURL = `${webURL}oauth2`,
      clientID = "835552682030792725";
      window.location.href = 
      `https://discord.com/oauth2/authorize?client_id=${clientID}&redirect_uri=${encodeURIComponent(callbackURL)}&response_type=code&scope=${encodeURIComponent("identify guilds")}`;
    }

    return {
      signInWithDiscord,
      loggedin: computed(() => store.getters.isLoggedIn),
      authenticated: computed(() => store.state.status),
      user: computed(() => store.state.userInformation)
    }
  }
}
</script>
