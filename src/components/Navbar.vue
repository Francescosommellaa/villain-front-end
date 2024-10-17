<template>
    <nav>
      <ul>
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/portfolio">Portfolio</router-link></li>
        <li><router-link to="/contact">Contatti</router-link></li>
      </ul>
    </nav>
  </template>
  
  <style scoped lang="scss">
  @import '../assets/style/main.scss';
  nav ul {
    display: flex;
    list-style: none;
    background-color: $primary-color;
  }
  nav li {
    margin: 0 15px;
  }
  </style>