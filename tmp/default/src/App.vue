<template>
  <div id="app">
    <!-- <component :is="currentView"></component> -->
    <router-view/>
  </div>
</template>

<script>
import Loading from './components/Loading'
import Index from './pages/Index/index'

export default {
  name: 'App',
  components: {
    Index,
    Loading
  },
  data() {
    return {
      currentView: 'Loading'
    }
  },
  mounted() {
    const self = this
    setTimeout(() => {
      self.currentView = 'Index'
    }, 1e3)
  }
}
</script>

<style></style>
