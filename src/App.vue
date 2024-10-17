<script>
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';
import Jumbotron from './components/Jumbotron.vue';

export default {
  components: {
    Navbar,
    Footer,
    Jumbotron
  }
}
</script>

<template>
  <div id="app">

    <Navbar />
    <Jumbotron />
    <Footer />

  </div>
</template>

<style lang="scss"></style>