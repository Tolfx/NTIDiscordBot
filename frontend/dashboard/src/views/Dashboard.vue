<template>
  <div>
    <h1>NTI Discord Absencer</h1>
    <div>
      <span>Logged in as Tolfx</span>
      <button @click="Logout()" class="text-white bg-theme">Logout</button>
    </div>

    <!-- Each cards -->
    <div>

      <div>
        <img src="a cool image depedning on this topic" alt="">
        <div>
          <a href="/dashboard/config">Configurations</a>
        </div>
      </div>

      <div>
        <img src="a cool image depedning on this topic" alt="">
        <div>
          <a href="/dashboard/active-lessons">Active lessons</a>
        </div>
      </div>

      <div>
        <img src="a cool image depedning on this topic" alt="">
        <div>
          <a href="/dashboard/ended-lessons">Ended lessons</a>
        </div>
      </div>

      <div>
        <img src="a cool image depedning on this topic" alt="">
        <div>
          <a href="/dashboard/students">Students</a>
        </div>
      </div>

      <div>
        <img src="a cool image depedning on this topic" alt="">
        <div>
          <a href="/dashboard/classes">Classes</a>
        </div>
      </div>

    </div>
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
