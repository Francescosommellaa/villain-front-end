<script>
import { store } from "@/store/store";
import VillainCard from "../components/VillainCard.vue";
import axios from "axios";
import Loader from "@/components/Loader.vue";

export default {
  name: 'AdvancedResearch',
  components: {
    VillainCard,
    Loader
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
      selectService: '',
      selectUniverse: '',
      isLoadingFirst: true,
      isLoadingVillains: true,
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
          if (type === 'villains') {
            this.isLoadingVillains = false;
            this.villains = response.data.villains;
            this.paginatorLink = response.data.villains.links;
            this.maxReviews = response.data.maxReviews;
            console.log(urlApi);
          } else {
            this[type] = response.data[type];
            this.isLoadingFirst = false;
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
      // Controlli service e universe
      if (this.selectService) {
        params.service_id = this.selectService;
      }
      if (this.selectUniverse) {
        params.universe_id = this.selectUniverse;
      }
      this.isLoadingVillains = true;
      const url = `${store.urlApi}list-by-filters?${new URLSearchParams(params).toString()}`;
      this.getApi(url, 'villains');
    },
    // gestione selezione skill
    selectedSkill(skillId) {
        if (this.selectSkill === skillId) {
            this.selectSkill = null;
        } else {
            this.selectSkill = skillId; 
        }
        this.$router.push({ 
            name: this.$route.name, 
            params: { skill: skillId }
        });
        this.getApiResearch();
    },

    selectedService(serviceId) {
        if (this.selectService === serviceId) {
            this.selectService = null;
        } else {
            this.selectService = serviceId; 
        }
        this.getApiResearch();
    },

    selectedUniverse(universeId) {
        if (this.selectUniverse === universeId) {
            this.selectUniverse = null;
        } else {
            this.selectUniverse = universeId; 
        }
        this.getApiResearch();
    },

    resetFilter(){
      console.log('reset')
      this.selectService = '';
      this.selectSkill = '';
      this.selectUniverse = '';
      this.selectedRating = null;

      this.getApiResearch();
    }
  },

    watch: {
  '$route.params.skill': {
    immediate: true,
    handler(newSkill) {
      this.selectSkill = newSkill || '';
      this.getApiResearch();
    }
  }
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
<div class="loader" v-if="isLoadingFirst">
      <Loader/>
  </div>
<main v-else>
  <div id="advanced-filter" class="left">

    <h2>Filtra i nostri Villain</h2>
    <span class="btn btn-primary" @click="resetFilter">Clear Filters</span>
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



    <div class="filter-section d-none">
      <h4>Services:</h4>
      <ul>
        <li 
            v-for="service in services" 
            :key="service.id" 
            :class="{ 'btn-primary': service.id == selectService }"
            @click="selectedService(service.id)">
            {{ service.name }}
          </li>
      </ul>
    </div>

    <div class="filter-section d-none">
      <h4>Universes:</h4>
      <ul>
        <li v-for="universe in universes"
        :key="universe.id" 
            :class="{ 'btn-primary': universe.id == selectUniverse }"
            @click="selectedUniverse(universe.id)">
        {{ universe.name }}</li>
      </ul>
    </div>

    <div class="filter-section">
      <h4>Skills</h4>
        <ul>
          <li 
            v-for="skill in skills" 
            :key="skill.id" 
            :class="{ 'btn-primary': skill.id == selectSkill }"
            @click="selectedSkill(skill.id)">
            {{ skill.name }}
          </li>
        </ul>
      </div>
    </div>

  <div class="right">
    <div class="loader" v-if="isLoadingVillains">
      <Loader/>
  </div>
    <div v-else-if="villains.length" class="villains-flex">
        <VillainCard
          v-for="(villain, index) in villains"
          :key="index"
          :villain="villain"
        />
      </div>
      <div v-else class="no_villains">
        <h2>No Villain Found</h2>
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

  .d-none{
    display: none;
  }

  
  .filter-section {
    margin-bottom: 20px;
    
    .btn-primary{
      color: white;
    }

    input[type='range'] {
      accent-color: $primary; 
    }

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
.no_villains{
  color: red;
  text-align: center;
  margin-top: 50px;
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
