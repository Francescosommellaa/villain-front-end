<script>
import VillainCard from "../components/VillainCard.vue";
import { store } from '@/store/store';
import axios from 'axios';
import Jumbotron from '../components/Jumbotron.vue';
import Loader from "@/components/Loader.vue";

export default {
  
  name: 'Home',
  components: {
    VillainCard,
    Jumbotron,
    Loader
  },
  data() {
    return {
      villains: [],
      skills: [],
      paginatorLink: [],
      villanPerSkill: [],
      reserched: false,
      selectSkill: '',
      selectService: '',
      selectUniverse: '',
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
        urlApi += search={search};
      }
      axios.get(urlApi)
        .then(response => {
          console.log('chiamta:', urlApi)
          if (type === 'villains') {
            this.villains = response.data.villains.data 
            this.paginatorLink = response.data.villains.links
          } else {
            this[type] = response.data[type]
            console.log(this[type])
          }
        })
        .catch(error => {
          console.log(error)
        })
      },
      getSponsoredVillains() {
      const urlApi = store.urlApi + 'active-sponsorship';
      axios.get(urlApi)
        .then(response => {
          console.log('API Sponsorship:', urlApi);
          this.isLoading = false;
          this.villains = response.data.villains;
        })
        .catch(error => {
          console.log(error);
          this.isLoading = false;
        });
    },
      filterBySkill() {
        const params = {};

        if (this.selectSkill) {
          params.skill_id = this.selectSkill;
        }
      },

  },
  mounted() {
    // Chiamte axios
    // this.getApi(store.urlApi + 'villains', 'villains');
    // this.getApi(store.urlApi + 'universes', 'universes');
    this.getApi(store.urlApi + 'skills', 'skills');
    // this.getApi(store.urlApi + 'services', 'services');
    this.getSponsoredVillains();
  },
};

</script>

<template>
  <Jumbotron :skills="skills"/>
  <main>
    <div class="content">
      <div class="text-container">
        <h2 class="title">Discover Premium Villains</h2>
        <p class="presentation">Welcome to our exclusive selection of sponsored villains! Our antagonists are fearsome and iconic, part of a chosen group offering unique services and top-rated reviews. Take your time to explore their profiles, review their specialties, and check out their top-rated reviews from past clients</p>
      </div>
      <div class="loader" v-if="isLoading">
        <Loader/>
    </div>
      <div v-else class="section-card">
        <div class="villains-flex">
        <VillainCard v-for="(villain, index) in villains" :key="index" :villain="villain" class="highlight"/>
    
          <!-- pagination -->
          <!-- <div  class="pagination">
            <div v-if="villains.length" class="paginator_btn">
                <button v-for="link in paginatorLink" v-html="link.label" @click="getApi(link.url)" :disabled="link.active || !link.url" :class="{ 'active': link.active }"></button>
            </div>
          </div> -->
        </div>
      </div>
      <div class="text-container">
        <h2 class="title">HOW TO HIRE IN VILLAIN</h2>
        <h3 class="presentation"><strong>Hiring a villain from our roster is easy and straightforward. Follow these steps:</strong></h3>
        <ul>
          <li>
            <strong>Explore our selection: </strong>
            Browse the villain profiles and read their descriptions, skills, and reviews to find the one that best fits your needs.
          </li>
          <li>
            <strong>Use the search filter: </strong>
            Refine your search based on the specific skills you're looking for, such as sabotage, henchman recruitment, or world domination planning.
          </li>
          <li>
            <strong>Contact the chosen villain: </strong>
            Once you've found your ideal antagonist, click the contact button and fill out the request form, specifying the details of your mission or adventure.
          </li>
          <li>
            <strong>Negotiate the terms :</strong>
            After sending your request, the villain will respond with a quote or proposal. You can discuss terms, services, and costs, making sure everything is perfectly planned.
          </li>
          <li>
            <strong>Begin the adventure: </strong>
            Once the agreement is reached, your villain will get to work. Get ready for an adventure full of chaos and plot twists!
          </li>
        </ul>
      </div>
      <section class="jumbo">
        <div class="cont-jumbo">
                <h1 class="main-title">FIND YOUR VILLAIN</h1>
        </div>
    </section>
    </div>
  </main>
</template>

<style scoped lang="scss">
@use '../assets/style/generals/variables' as *;
@use '../assets/style/generals/view-style/views-style';
@import '../assets/style/main.scss';

.jumbo {
    height: 600px;
    width: 100%;
    background-image: url('../assets/images/main/jumbo.png');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: 10%;
    position: relative;

    .cont-jumbo {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 80%;
        height: 100%;
        margin: 0 auto;
        font-size: 50px;
        text-align: center;

        .main-title {
            color: white;
            font-weight: bold;
            text-shadow: 1px 1px 10px $primary;
            padding-bottom: 1.5rem;
        }
    }
  }


main{
  padding-top: 9em;
}

.text-container{
  width: 90%;
  margin: 0 auto;
}
.content, .section-card {
  width: 100%; 
  margin: 0 auto;  
}

.title{
  background: linear-gradient(45deg, $primary, $secondary, $accent, $accent);
  background-clip: text;
  color: transparent;
  font-size: 2rem;
  text-align: center;
  margin: 50px auto;
}

.presentation {
  margin: 2rem auto 0;
  font-weight: 500;
  font-size: 1.1rem;
  line-height: 1.5rem;
  color: $primary;
  text-align: center;
}

ul {
  margin: 3rem 0;
  font-size: 1.1rem;
  strong {
    color: $primary;
  }
  li {
    margin: 2rem 0
  };
}
.villains-flex {
  margin: 0;
  width: 90%;

}
.section-card {
  background: linear-gradient(0deg, $light, $primary, $light);;
  padding: 6rem 0;
  display: flex;
  justify-content: center;
}
.villain-card {
  flex: 0 1 calc(100% / 5 - 2em);
  box-sizing: border-box;
  margin-bottom: 1em;
  cursor: pointer;
  border: solid #fbce00 5px;
  transition: all 0.3s ease;

// Responsive for smaller screens
  @media (max-width: 1560px) {
    flex: 0 1 calc(100% / 4 - 2em); 
  }

  @media (max-width: 1260px) {
  flex: 0 1 calc(100% / 3  - 2em); 
  }

  @media (max-width: 980px) {
  flex: 0 1 calc(100% / 2  - 2em); 
  }


  @media (max-width: 700px) {
    flex: 0 1 calc(100% - 2em); 
  }



.pagination {
  text-align: center;
  margin-top: 20px;
  .paginator_btn {
    padding: 15px 0 50px;
    button {
      padding: 5px 10px;
      margin: 0 1px;
      border: solid $primary 0.1rem;
      transition: background-color 0.3s ease;
      &:hover{
        background-color: $secondary;
        color: $light;
      }

    }
  }
}
.active {
  color: $light;
  background-color: $secondary;
}
}
</style>