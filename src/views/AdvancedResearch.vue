<script>
import VillainCard from "../components/VillainCard.vue";
export default {
  name: 'AdvancedResearch',
  components: {
    VillainCard,
  },
  data() {
    return {
      villains: [],
      currentPage: 1,
      villainsPerPage: 12,
    };
  },
  computed: {
    paginatedVillains() {
      const start = (this.currentPage - 1) * this.villainsPerPage;
      const end = this.currentPage * this.villainsPerPage;
      return this.villains.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.villains.length / this.villainsPerPage);
    },
  },

  methods: {
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
  },
  mounted() {
    // 15 Fake Card
    this.villains = Array.from({ length: 15 }, (v, i) => ({
      img: `https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png`,
      name: `Villain ${i + 1}`,
      service: `Servizio diabolico ${i + 1}`,
      rating: Math.floor(Math.random() * 5) + 1,
    }));
    console.log(this.villains);
  },
};
</script>
<template>
<main>
  <div id="advanced-filter" class="left">
    <h2>Filtra i nostri Villain</h2>

    <div class="filter-section">
      <h4>Filtro tipo 1</h4>
      <ul>
        <li>Filtro 1</li>
        <li>Filtro 2</li>
        <li>Filtro 3</li>
        <li>Filtro 4</li>
      </ul>
    </div>

    <div class="filter-section">
      <h4>Filtro tipo 2</h4>
      <ul>
        <li>Filtro 1</li>
        <li>Filtro 2</li>
        <li>Filtro 3</li>
        <li>Filtro 4</li>
      </ul>
    </div>

    <div class="filter-section">
      <h4>Filtro tipo 3</h4>
      <ul>
        <li>Filtro 1</li>
        <li>Filtro 2</li>
        <li>Filtro 3</li>
        <li>Filtro 4</li>
      </ul>
    </div>
  </div>

  <div class="right">
    <div class="villains-flex">
        <VillainCard
          v-for="(villain, index) in paginatedVillains"
          :key="index"
          :villain="villain"
        />
      </div>

      <!-- pagination -->
      <div class="pagination">
        <a v-if="currentPage > 1" @click="prevPage">
          <i class="fa-solid fa-chevron-left"></i>
        </a>
        <span>Pagina {{ currentPage }} di {{ totalPages }}</span>
        <a v-if="currentPage < totalPages" @click="nextPage">
          <i class="fa-solid fa-chevron-right"></i>
        </a>
      </div>
  </div>
</main>
</template>

<style scoped lang="scss">
@use '../assets/style/generals/variables' as *;
@use '../assets/style/generals/view-style/views-style';
@import '../assets/style/main.scss';

#advanced-filter {
  padding: 1em;      
  max-width: 300px;
  margin: 20px auto;

  h2 {
    color: $primary;   
    margin-bottom: 20px;
    text-transform: uppercase;
  }

  .filter-section {
    margin-bottom: 20px;
    
    h4 {
      color: $secondary;              
      margin-bottom: 10px;
      position: relative;
    }

    li {
      padding: 10px;
      background-color: $gray-100;
      margin-bottom: 10px;
      border-radius: 5px;
      transition: background-color 0.3s ease, transform 0.3s ease;
      font-size: 1rem;
      color: $gray-800;
      display: flex;
      align-items: center;

      &:hover {
        background-color: $primary;
        color: $light;              
        transform: translateX(5px); 
        cursor: pointer;
      }
    }
  }
}

main {
  display: flex;

  .left{
    flex: 0 1 calc(20%);
    border-right: 2px solid $gray-600;
  }
  .right{
    flex: 0 1 calc(80%);
  }
}

.villain-card {
  flex: 0 1 calc(25% - 2em);
  box-sizing: border-box;
  margin-bottom: 20px;
  cursor: pointer;
  transition: all 0.3s ease;

// Responsive for smaller screens
@media (max-width: 1500px) {
  flex: 0 1 calc(33.33% - 2em); 
}

@media (max-width: 1280px) {
  flex: 0 1 calc(50% - 2em); 
}

  // Schermi tablet
@media (max-width: 900px) {
  flex: 0 1 calc(100% - 2em); 
}
}

.pagination {
  text-align: center;
  margin-top: 20px;
}


</style>
