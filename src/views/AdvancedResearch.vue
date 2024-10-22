<script>
import { store } from "@/store/store";
import VillainCard from "../components/VillainCard.vue";
import axios from "axios";

export default {
  name: 'AdvancedResearch',
  components: {
    VillainCard,
  },
  data() {
    return {
      villains: [],
      skills: [],
      services: [],
      universes: [],
      paginatorLink: [],
      selectSkill: this.$route.params.skill || '', // Set initial skill from route
      isLoading: true,
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
    getApi(urlApi, type = 'villains') {
      this.isLoading = true;
      axios.get(urlApi)
        .then(response => {
          console.log(response.data)
          this.isLoading = false;
          if (type === 'villains') {
            this.villains = response.data.villains;
            this.paginatorLink = response.data.villains.links;
          } else {
          this.isLoading = false;
            this[type] = response.data[type];
          }
        })
        .catch(error => {
          console.log(error);
          this.isLoading = false;
        });
    },
    getApiResearch() {
      const params = {};
      if (this.selectSkill) {
        params.skill_id = this.selectSkill;
      } 

      const url = `${store.urlApi}list-by-filters?${new URLSearchParams(params).toString()}`;
      this.getApi(url, 'villains');
    },
  },
  mounted() {
    // Fetch the villains filtered by the skill passed from Home
    this.getApiResearch(); // This will fetch villains based on the skill

    // Fetch additional data
    this.getApi(store.urlApi + 'universes', 'universes');
    this.getApi(store.urlApi + 'skills', 'skills');
    this.getApi(store.urlApi + 'services', 'services');
  },
};
</script>



<template>
<div v-if="isLoading">

</div>
<main v-else>
  <div id="advanced-filter" class="left">

    <h2>Filtra i nostri Villain</h2>

    <div class="filter-section">
      <h4>Services:</h4>
      <ul>
        <li v-for="service in services">{{ service.name }}</li>
      </ul>
    </div>

    <div class="filter-section">
      <h4>Universes:</h4>
      <ul>
        <li v-for="universe in universes">{{ universe.name }}</li>
      </ul>
    </div>

    <div class="filter-section">
      <h4>Skills</h4>
      <ul>
        <li v-for="skill in skills">{{ skill.name }}</li>
      </ul>
    </div>
  </div>

  <div class="right">
    <div class="villains-flex">
        <VillainCard
          v-for="(villain, index) in villains"
          :key="index"
          :villain="villain"
        />
      </div>

      <!-- pagination -->
      <!-- <div class="pagination">
        <a v-if="currentPage > 1" @click="prevPage">
          <i class="fa-solid fa-chevron-left"></i>
        </a>
        <span>Pagina {{ currentPage }} di {{ totalPages }}</span>
        <a v-if="currentPage < totalPages" @click="nextPage">
          <i class="fa-solid fa-chevron-right"></i>
        </a>
      </div> -->
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
    background: linear-gradient(45deg, $primary, $secondary, $accent, $accent);
    background-clip: text;
    color: transparent; 
    margin-bottom: 20px;
    text-transform: uppercase;
  }

  .filter-section {
    margin-bottom: 20px;
    
    
    h4 {
      color: $secondary;              
      line-height: 50px;
      position: relative;
    }
    ul{
      max-height: 250px;
      overflow-y: auto;
      overflow-x: hidden;


      li {
        padding: 10px;
        margin-bottom: 10px;
        border-radius: 5px;
        transition: background-color 0.3s ease, transform 0.3s ease;
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
}

main {
  display: flex;
  margin-top: 6em;

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

@media (max-width: 900px) {
  flex: 0 1 calc(100% - 2em); 
}

@media (max-width: 700px) {
  flex: 0 1 100%; 
}
}

.pagination {
  text-align: center;
  margin-top: 20px;
}


</style>
