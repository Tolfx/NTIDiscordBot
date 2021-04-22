<template>
  <!-- Sidebar -->
  <div class="flex h-screen">
    <sidebar/>
  </div>
  <!-- End Sidebar -->
  
  <router-view/>
</template>
<script>
import sidebar from './components/Sidebar'

export default ({
  components: {
    sidebar
  },
  setup() {
    
  },
})
</script>


<style>
</style>
