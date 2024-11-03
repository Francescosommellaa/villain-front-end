<script>
import VillainCard from "../components/VillainCard.vue";
import { store } from '@/store/store';
import axios from 'axios';
import Jumbotron from '../components/Jumbotron.vue';
import Loader from "@/components/common/Loader.vue";

export default {
  name: 'Home',

  components: {
    VillainCard,
    Jumbotron,
    Loader
  },

  data() {
    return {
      store,
      villains: [],
      paginatorLink: [],
      isLoading: true
    };
  },

  methods: {
    getSponsoredVillains() {
      const urlApi = store.urlApi + 'active-sponsorship';
      axios.get(urlApi)
        .then(response => {
          this.isLoading = false;
          this.villains = response.data.villains;
        })
        .catch(error => {
          console.log(error);
          this.isLoading = false;
        });
    },
  },

  mounted() {
    this.getSponsoredVillains();
  },
};

</script>

<template>
  <Jumbotron />
  <main>
    <div class="content">
      <div class="text-container" v-for="data in store.howToHireDiscover">
        <h2 class="title">{{ data.title }}</h2>
        <p class="presentation">{{ data.text }}</p>
      </div>
      <div class="loader" v-if="isLoading">
        <Loader />
      </div>
      <div v-else class="section-card">
        <div class="villains-flex">
          <VillainCard v-for="(villain, index) in villains" :key="index" :villain="villain"
                       class="highlight" />

          <!-- pagination -->
          <!-- <div  class="pagination">
            <div v-if="villains.length" class="paginator_btn">
                <button v-for="link in paginatorLink" v-html="link.label" @click="getApi(link.url)" :disabled="link.active || !link.url" :class="{ 'active': link.active }"></button>
            </div>
          </div> -->
        </div>
      </div>
      <!-- Info How to hire a villain -->
      <div class="text-container hire" id="how-to">
        <div v-for="title in store.howToHireTitle">
          <h2 v-if="!isLoading" class="title">{{ title.title }}</h2>
          <h3 class="presentation"><strong>{{ title.intro }}</strong></h3>
        </div>
        <ul>
          <li v-for="instruction in store.howToHireInfo">
            <i :class="instruction.icon"></i>
            <strong>{{ instruction.title }}</strong>
            <p>{{ instruction.info }}</p>
          </li>
        </ul>
      </div>
    </div>
  </main>
</template>

<style scoped lang="scss">
main {
  padding-top: 9em;

  @media (max-width: 1200px) {
    padding-top: 12em;
  }

  @media (max-width: 840px) {
    padding-top: 15em;
  }

  @media (max-width: 550px) {
    padding-top: 11em;
  }
}

.text-container {
  width: 90%;
  margin: 0 auto;
}

.content,
.section-card {
  width: 100%;
  margin: 0 auto;
}

.title {
  background: $grd-brand-lt;
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
  color: $clr-brand-primary;
  text-align: center;
}

ul {
  margin: 3rem 0;
  font-size: 1.1rem;

  strong {
    color: $clr-brand-primary;
  }

  li {
    margin: 2rem 0
  }

  ;
}

.villains-flex {
  margin: 0;
  width: 90%;

}

.section-card {
  background: linear-gradient(transparent, rgba($clr-brand-primary, .2), rgba($clr-brand-secondary, .5), rgba($clr-brand-primary, .2), transparent);
  padding: 6rem 0;
  display: flex;
  justify-content: center;
}

.villain-card {
  flex: 0 1 calc(100% / 5 - 2em);
  box-sizing: border-box;
  margin-bottom: 1em;
  cursor: pointer;
  border: solid $clr-brand-gold-light 5px;
  transition: all 0.3s ease;

  // Responsive for smaller screens
  @media (max-width: 1560px) {
    flex: 0 1 calc(100% / 4 - 2em);
  }

  @media (max-width: 1260px) {
    flex: 0 1 calc(100% / 3 - 2em);
  }

  @media (max-width: 980px) {
    flex: 0 1 calc(100% / 2 - 2em);
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
        border: solid $clr-brand-primary 0.1rem;
        transition: background-color 0.3s ease;

        &:hover {
          background-color: $clr-brand-secondary;
          color: $clr-neutral-ltst;
        }

      }
    }
  }

  .active {
    color: $clr-neutral-ltst;
    background-color: $clr-brand-secondary;
  }
}

.hire {
  padding-bottom: 3rem;

  i {
    color: $clr-brand-primary;
    font-size: 20px;
    padding-right: 15px;
  }

  strong {
    font-size: 1.1rem;
  }

  p {
    padding: 20px 0 0 35px;
  }

}

@media screen and (max-width:550px) {
  .hire {
    p {
      font-size: 0.9rem;
    }
  }
}
</style>