<template>
  <div class="bg-green-400">
    <h1 class="text-4xl text-white">This is the dashboard, you are logged in!</h1>
    <button @click="Logout()" class="text-white bg-theme">Logout</button>
  </div>
</template>
<script>

export default {
  setup() {

    const Logout = () => {
      localStorage.removeItem('token')
    }
    return {
      Logout
    }
  },
}
</script>
