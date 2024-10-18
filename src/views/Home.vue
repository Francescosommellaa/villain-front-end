<script>
import VillainCard from "../components/VillainCard.vue";

export default {
  name: 'Home',
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

    <!-- card printing  -->
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
  </main>
</template>

<style scoped lang="scss">
@use '../assets/style/generals/variables' as *;
@import '../assets/style/main.scss';

.villains-flex {
  display: flex;
  flex-wrap: wrap;
  gap: 2em;
  justify-content: center;
  margin: 0 4em;
}

.villain-card {
  flex: 0 1 calc(25% - 2em);
  box-sizing: border-box;
  margin-bottom: 20px;
  cursor: pointer;
}

.fa-solid {
  margin: 0 1em;
  cursor: pointer;
  padding: 0.3em 0.5em;
  border-radius: 200px;

  &:hover{
    border: 1px solid $gray-600;
  }
}

// Responsive for smaller screens
@media (max-width: 1024px) {
  .villain-card {
    flex: 0 1 calc(33.33% - 20px);
  }
}

@media (max-width: 768px) {
  .villain-card {
    flex: 0 1 calc(50% - 20px);
  }
}

@media (max-width: 480px) {
  .villain-card {
    flex: 0 1 100%;
  }
}

.pagination {
  text-align: center;
  margin-top: 20px;
}

</style>
