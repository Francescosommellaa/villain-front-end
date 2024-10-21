<script>
import VillainCard from "../components/VillainCard.vue";
import { store } from '@/store/store';
import axios from 'axios';
import Jumbotron from '../components/Jumbotron.vue';

export default {
  name: 'Home',
  components: {
    VillainCard,
    Jumbotron
  },
  data() {
    return {
      villains: [],
      skills: [],
      services: [],
      universes: [],
      paginatorLink: [],
      villanPerSkill: [],
      reserched: false,
      selectSkill: '',
      isLoading: true,

      currentPage: 1,
      villainsPerPage: 10,
    };
  },
  methods: {
    // Chiamta alle api
    getApi(urlApi, type = 'villains', search = '') {
      this.isLoading = true;
      if (search) {
        urlApi += `?search=${search}`;
      }
      axios.get(urlApi)
        .then(response => {
          console.log('chiamta:', urlApi)
          if (type === 'villains') {
            this.isLoading = false;
            this.villains = response.data.villains.data
            this.paginatorLink = response.data.villains.links
          } else {
            this[type] = response.data[type]
            this.isLoading = false;
            console.log(this[type])
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    filterBySkill() {
      if (this.selectSkill) {
        const url = `${store.urlApi}villains-by-skills/${this.selectSkill}`;
        this.getApiResearch(url);
      }
    },
    getApiResearch(urlApi) {
      this.isLoading = true;
      axios.get(urlApi)
        .then(response => {
          this.isLoading = false;
          this.reserched = true;
          console.log(response.data)
          this.villanPerSkill = response.data
        })
        .catch(error => {
          this.isLoading = false;

          console.log(error)
        })
    },
  },
  mounted() {
    // Chiamte axios
    this.getApi(store.urlApi + 'villains', 'villains');
    // this.getApi(store.urlApi + 'universes', 'universes');
    this.getApi(store.urlApi + 'skills', 'skills');
    // this.getApi(store.urlApi + 'services', 'services');
  },
};

</script>

<template>
  <Jumbotron />
  <main>
    <!-- Search bar -->
     <div class="select_bar">
      <select name="skills" id="skills" @change="filterBySkill()" v-model="selectSkill">
        <option value="" disabled selected>Select by skills</option>
        <option v-for="skill in skills" :value="skill.id">{{ skill.name }}</option>
      </select>
      <button>Show All</button>
     </div>
    <!-- card printing  -->
    <div v-for="(skill, skillIndex) in villanPerSkill" :key="skillIndex" v-if="reserched && !isLoading">
      <h2 v-if="!isLoading">{{ skill.name }}</h2>
      <div class="villains-flex">
          <VillainCard 
            v-for="(villain, index) in skill.villains" 
            :key="index" 
            :villain="villain" 
          />
      </div>
    </div>
    <div v-else class="villains-flex">

    <VillainCard v-for="(villain, index) in villains" :key="index" :villain="villain" />
    
        <!-- pagination -->
        <div class="pagination">
          <div v-if="villains.length" class="paginator_btn">
              <button v-for="link in paginatorLink" v-html="link.label" @click="getApi(link.url)" :disabled="link.active || !link.url"></button>
          </div>
        </div>
      </div>
  </main>
</template>

<style scoped lang="scss">
@use '../assets/style/generals/variables' as *;
@use '../assets/style/generals/view-style/views-style';
@import '../assets/style/main.scss';

main{
  padding-top: 4em;
}

.villain-card {
  flex: 0 1 calc(25% - 2em);
    box-sizing: border-box;
    margin-bottom: 1em;
    cursor: pointer;
    transition: all 0.3s ease;

// Responsive for smaller screens
@media (max-width: 1400px) {
    flex: 0 1 calc(33.33% - 2em); 
  }
  
  @media (max-width: 1260px) {
    flex: 0 1 calc(50% - 2em); 
  }

  @media (max-width: 880px) {
  flex: 0 1 calc(100% - 4em); 
  }


  @media (max-width: 700px) {
    flex: 0 1 calc(100% - 2em); 
  }
}

.pagination {
  text-align: center;
  margin-top: 20px;
}
h2{
  text-align: center;
  margin: 20px auto;
}

// Select bar

.select_bar {
    display: flex;
    align-items: center;
    margin: 120px auto;
    width: 80%;
    select {
        padding: 8px;
        border: 1px solid #ced4da;
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
        font-size: 1rem;
        flex: 1;
    }
    button {
        padding: 11px 20px;
        background-color: #007bff;
        color: white;
        border: none;
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
        cursor: pointer;
        transition: background-color 0.3s;

        &:hover {
            background-color: #0056b3;
        }
    }
    
}




</style>
