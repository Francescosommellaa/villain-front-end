<script>
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';

export default {
  components: {
    Navbar,
    Footer,
  },
  data() {
    return {
      lastScrollPosition: 0,
      isSticky: false,
      isVisible: true
    };
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll() {
      const currentScroll = window.pageYOffset;

      if (currentScroll > this.lastScrollPosition && currentScroll > 100) {
        this.isSticky = true;
        this.isVisible = false;
      } else if (currentScroll < this.lastScrollPosition) {
        this.isSticky = true;
        this.isVisible = true;
      } else if (currentScroll === 0) {
        this.isSticky = false;
        this.isVisible = true;
      }

      this.lastScrollPosition = currentScroll;
    }
  }
}
</script>

<template>
  <div id="app">

  <nav :class="['navbar', { 'navbar-sticky': isSticky, 'navbar-hidden': !isVisible }]">
    <Navbar />
  </nav>
  <RouterView />
  <Footer />

  </div>
</template>

<style lang="scss">
.navbar {
  position: relative;
  width: 100%;
  transition: top 0.5s ease;

  &.navbar-sticky {
    position: fixed;
    top: 0; 
    left: 0;
    z-index: 1000; 
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }

  &.navbar-hidden {
    top: -100px;
  }
}

</style>