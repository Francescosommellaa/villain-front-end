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
      ratings: [],
      paginatorLink: [],
      isLoading: true,
      currentPage: 1,
      villainsPerPage: 12,
      selectedRating: null,
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

    applyFilter() {
      let searchParams = this.selectedRating ? `?rating=${this.selectedRating}` : '';
      this.getApi(store.urlApi + 'villains-rating', 'villains', searchParams);
      // console.log('Rating response:', this.selectedRating);
    },

    // Chiamta alle api
    getApi(urlApi, type = 'villains', search = '') {
      this.isLoading = true;

      if (search) {
        urlApi += `${search}`;
      }

      axios.get(urlApi)
        .then(response => {
          // console.log('API response:', response.data);
          // console.log('Rating response API:', this.selectedRating);
          if (type === 'villains') {
            this.isLoading = false;
            this.villains = response.data.villains.data;
            this.paginatorLink = response.data.villains.links;
            console.log('response if:', response.data);

          } else {
            this[type] = response.data[type];
            this.isLoading = false;
            // console.log(this[type]);
            console.log('response else:', response.data);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
  },
  mounted() {
    // Chiamte axios
    this.getApi(store.urlApi + 'villains', 'villains');
    this.getApi(store.urlApi + 'universes', 'universes');
    this.getApi(store.urlApi + 'skills', 'skills');
    this.getApi(store.urlApi + 'services', 'services');
    this.getApi(store.urlApi + 'ratings', 'ratings');
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
      <h4>Rating:</h4>
      <ul>
        <li v-for="rating in ratings" :key="rating">
          <input type="radio" :id="'rating-' + rating.value" :value="rating.value" v-model="selectedRating" @change="applyFilter" />
          <label :for="'rating-' + rating.value">
            <span v-for="star in 5" :key="star" class="star">
              <i :class="star <= rating.value ? 'fa-solid fa-star' : 'fa-regular fa-star'"></i>
            </span>
          </label>
        </li>
      </ul>
    </div>

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
    background: linear-gradient(45deg, $primary, $secondary, $accent, $accent);
    background-clip: text;
    color: transparent; 
    margin-bottom: 20px;
    text-transform: uppercase;
  }

  .filter-section {
    margin-bottom: 20px;

    .star {
      color: $primary;
      font-size: 1rem;
      padding: 0 0.1rem
    }    
    
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
