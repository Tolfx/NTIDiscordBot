<template>
  <div class="flex h-screen">
      <Sidebar/>
      <div class="flex-1 flex flex-col overflow-hidden">
        <Header/>
        <main class="flex-1 overflow-x-hidden overflow-y-auto">
            <div class="container mx-auto px-6 py-8">
                <router-view/>
            </div>
        </main>
      </div>
  </div>
</template>
<script>
import Sidebar from './Sidebar'
import Header from './Header'
export default ({
    components: {
        Sidebar,
        Header
    },
    setup () {
        
    },
})
</script>

<style>

</style>