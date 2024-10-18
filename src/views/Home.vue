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
      search: '',
      isLoading: true,

      currentPage: 1,
      villainsPerPage: 10,
    };
  },
  // computed: {
  //   paginatedVillains() {
  //     // Se villains non è un array o è vuoto, ritorna un array vuoto
  //     if (this.isLoading === true) {
  //       return [];
  //     }
  //     const start = (this.currentPage - 1) * this.villainsPerPage;
  //     const end = this.currentPage * this.villainsPerPage;
  //     return this.villains.slice(start, end);
  //   },
  //   totalPages() {
  //     // Stesso controllo su villains per calcolare le pagine totali
  //     if (this.isLoading === true) {
  //       return 1;
  //     }
  //     return Math.ceil(this.villains.length / this.villainsPerPage);
  //   },
  // },

  watch: {
    search(newSearch) {
      this.getApi(store.urlApi + 'villains', 'villains', newSearch);
    }
  },

  methods: {
    // nextPage() {
    //   if (this.currentPage < this.totalPages) {
    //     this.currentPage++;
    //   }
    // },
    // prevPage() {
    //   if (this.currentPage > 1) {
    //     this.currentPage--;
    //   }
    // },
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
            // console.log(this.villains)
            this.paginatorLink = response.data.villains.links
            // console.log(this.paginatorLink)
          } else {
            this[type] = response.data
            console.log(this[type])
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
  },
  mounted() {
    // 15 Fake Card
    // this.villains = Array.from({ length: 15 }, (v, i) => ({
    //   img: `/src/assets/images/placeholders/frieza.webp`,
    //   name: `Villain ${i + 1}`,
    //   service: `Servizio diabolico ${i + 1}`,
    //   rating: Math.floor(Math.random() * 5) + 1,
    // }));
    // console.log(this.villains);
    // Chiamte axios
    this.getApi(store.urlApi + 'villains', 'villains');
    // this.getApi(store.urlApi + 'universes', 'universes');
    // this.getApi(store.urlApi + 'skills', 'skills');
    // this.getApi(store.urlApi + 'services', 'services');
  },
};

</script>

<template>
  <Jumbotron />
  <main>
    <!-- card printing  -->
    <div class="villains-flex">
      <VillainCard v-for="(villain, index) in villains" :key="index" :villain="villain" />
    </div>

    <!-- pagination -->
    <div class="pagination">
      <div v-if="villains.length" class="paginator_btn">
          <button v-for="link in paginatorLink" v-html="link.label" @click="getApi(link.url)" :disabled="link.active || !link.url"></button>
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
</style>
