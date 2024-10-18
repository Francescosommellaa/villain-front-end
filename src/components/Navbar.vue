<script>
export default {
  name: 'Navbar',
  computed: {
    currentRoute() {
      return this.$route.path;
    }
  }
}
</script>

<template>
  <nav class="navbar">
    <!-- Left Section (Logo) -->
    <div class="navbar-left">
      <router-link :class="{ active: currentRoute === '/' }" to="/">
        <picture class="logo-container">
          <!-- Logo piccolo per schermi piccoli -->
          <source media="(max-width: 768px)" srcset="../assets/images/logo/logo-dk/logo-dk-mark.png">
          <!-- Logo per schermi più grandi -->
          <img src="../assets/images/logo/logo-dk/logo-dk-horizontal.png" alt="Logo" class="logo">
        </picture>
      </router-link>
    </div>

    <!-- Middle Section (Navigation Links) -->
    <nav class="navbar-center">
      <router-link class="nav-link" :class="{ active: currentRoute === '/' }" to="/">Home</router-link>
      <router-link class="nav-link" :class="{ active: currentRoute === '/AdvancedResearch' }" to="/AdvancedResearch">Advanced Research</router-link>
    </nav>

    <!-- Right Section (Button) -->
    <div class="navbar-right">
      <!-- Bottone per desktop -->
      <button class="btn btn-secondary btn-desktop">
        Become a Villain
      </button>

      <!-- Bottone per mobile con icona Font Awesome -->
      <button class="btn btn-secondary btn-mobile">
        <i class="fa-solid fa-arrow-right-to-bracket"></i>
      </button>
    </div>
  </nav>
</template>

<style scoped lang="scss">
@use '../assets/style/generals/variables' as *;
@import '../assets/style/main.scss';

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.8em 2em;
  background-color: $body-bg;
}

/* Logo con animazione più fluida */
.logo-container img {
  width: auto;
  height: 35px;
  transition: height 0.4s ease-in-out; // Animazione più fluida

  @media (max-width: 768px) {
    height: 30px;
  }
}

.navbar-center {
  display: flex;
  gap: 2em;
}

.nav-link {
  color: $gray-800;
  font-size: $font-size-base;
  position: relative;
  transition: color 0.4s, transform 0.3s ease;

  &:hover {
    color: $navbar-dark-hover-color;
  }
}

.nav-link.active {
  font-weight: $font-weight-bold;
  color: $black;
}

.nav-link.active::after {
  content: '';
  position: absolute;
  bottom: -3px;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: $dark;
}
.navbar-right .btn-mobile {
  display: none;
}
.navbar-right .btn-desktop {
  display: inline-block;
}

@media (max-width: 768px) {

  .navbar-right .btn-mobile {
    display: inline-block;
  }

  .navbar-right .btn-desktop {
    display: none;
  }

  .btn.btn-secondary {
    padding: 0.4rem 0.6rem;
  }
}
</style>
