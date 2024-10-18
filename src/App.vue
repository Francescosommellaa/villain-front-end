<script>
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';

export default {
  components: {
    Navbar,
    Footer,
  }
}
</script>

<template>
  <div id="app">

  <Navbar />
  <RouterView />
  <Footer />

  </div>
</template>

<style lang="scss"></style>