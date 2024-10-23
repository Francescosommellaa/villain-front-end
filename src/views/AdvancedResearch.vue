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
      selectSkill: this.$route.params.skill || '',
      isLoading: true,
      selectedRating: null,
      minReviews: 0,
      maxReviews: 50,
    };
  },
  methods: {
    // Chiamta alle api
    getApi(urlApi, type = 'villains', search = '') {
      this.isLoading = true;

      if (search) {
        urlApi += `${search}`;
      }

      axios.get(urlApi)
        .then(response => {
          this.isLoading = false;
          if (type === 'villains') {
            this.villains = response.data.villains;
            this.paginatorLink = response.data.villains.links;
            this.maxReviews = response.data.maxReviews;
            console.log(urlApi);
          } else {
            this[type] = response.data[type];
            this.isLoading = false;
          }
        })
        .catch(error => {
          console.log(error);
          this.isLoading = false;
        });
    },

    applyFilter() {
      let searchParams = this.selectedRating ? `?rating=${this.selectedRating}` : '';
      this.getApi(store.urlApi + 'villains-rating', 'villains', searchParams);
    },

    getApiResearch() {
      const params = {};
      if (this.selectSkill) {
        params.skill_id = this.selectSkill;
      } 
      if(this.selectedRating) {
        params.rating = this.selectedRating;
      }
      if (this.minReviews) {
        params.min_reviews = this.minReviews;
      }
      console.log(params);

      const url = `${store.urlApi}list-by-filters?${new URLSearchParams(params).toString()}`;
      this.getApi(url, 'villains');
    },
  },
  mounted() {
    this.getApiResearch();
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
          <input type="radio" :id="'rating-' + rating.value" :value="rating.value" v-model="selectedRating" @change="getApiResearch" />
          <label :for="'rating-' + rating.value" class="ms">
            <span v-for="star in 5" :key="star" class="star">
              <i :class="star <= rating.value ? 'fa-solid fa-star' : 'fa-regular fa-star'"></i>
            </span>
          </label>
        </li>
      </ul>
    </div>

    <div class="filter-section">
      <h4>Minimum Reviews:</h4>
      <div class="progress-container">
        <input type="range" :min="0" :max="maxReviews" v-model="minReviews" @change="getApiResearch"/>
        <span class="ms">{{ minReviews }} reviews</span>
      </div>
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
          v-for="(villain, index) in villains"
          :key="index"
          :villain="villain"
        />
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

    .ms {
      margin-left: 10px;
    }

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
