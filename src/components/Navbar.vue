<script>
export default {
  name: 'Navbar',
  computed: {
    currentRoute() {
      return this.$route.path; // Ottieni il percorso attuale
    }
  }
}
</script>

<template>
  <nav class="navbar">
    <!-- Left Section (Logo) -->
    <div class="navbar-left">
      <picture>
        <!-- Image for small screens -->
        <source media="(max-width: 768px)" srcset="../assets/images/logo/logo-dk/logo-dk-mark.png">
        <!-- Image for big screens -->
        <img src="../assets/images/logo/logo-dk/logo-dk-horizontal.png" alt="Logo" class="logo">
      </picture>
    </div>

    <!-- Middle Section (Navigation Links) -->
    <nav class="navbar-center">
      <router-link class="nav-link" :class="{ active: currentRoute === '/' }" to="/">Home</router-link>
      <router-link class="nav-link" :class="{ active: currentRoute === '/AdvancedReserch' }" to="/AdvancedReserch">Advanced Reserch</router-link>
    </nav>

    <!-- Right Section (Button) -->
    <button class="btn btn-primary">became a villain</button>
  </nav>
</template>

<style scoped lang="scss">
@use '../assets/style/generals/variables' as *;
@import '../assets/style/main.scss';

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: $body-bg;
}

.navbar-left .logo {
  width: 150px;
  height: auto;
  transition: width 0.3s ease;
}

.navbar-center {
  display: flex;
  gap: 2em;
}

.nav-link {
  text-decoration: none;
  list-style: none;
  color: $gray-800;
  font-size: $font-size-base;
  position: relative;
  transition: color 0.4s;

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

/* Media Queries for mobile */
@media (max-width: 780px) {
  .navbar {
    padding: 10px;
  }

  .navbar-left .logo {
    width: 40px; // Riduci la larghezza del logo sui dispositivi mobili
  }

  .navbar-center {
    gap: 1em; // Riduci lo spazio tra i link di navigazione
  }

  .btn.btn-primary {
    font-size: 0.9rem; // Riduci leggermente la dimensione del testo del pulsante
    padding: 0.4rem 0.8rem; // Riduci padding del pulsante per mobile
  }
}
</style>
