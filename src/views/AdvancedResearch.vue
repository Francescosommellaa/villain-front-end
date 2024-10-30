<script>
import { store } from "@/store/store";
import VillainCard from "../components/VillainCard.vue";
import axios from "axios";
import Loader from "@/components/common/Loader.vue";

export default {
  name: 'AdvancedResearch',


  components: {
    VillainCard,
    Loader
  },


  data() {
    return {
      villains: [],
      paginatorLink: [],
      isServiceMenu: true,
      isUniverseMenu: true,
      isSkillMenu: true,

      filters: {
        skills: {
          routeAPI: 'skills',
          queryField: 'skill',
          criteria: [],
          temporalSelection: this.getTemporalSelection('skill'),
        },

        services: {
          routeAPI: 'services',
          queryField: 'service',
          criteria: [],
          temporalSelection: this.getTemporalSelection('service'),
        },

        universes: {
          routeAPI: 'universes',
          queryField: 'universe',
          criteria: [],
          temporalSelection: this.getTemporalSelection('universe'),
        },

        reviews: {
          routeAPI: 'max-reviews',
          queryField: 'reviews',
          criteria: 0,
          temporalSelection: this.getTemporalSelection('reviews'),
        },

        ratings: {
          routeAPI: 'max-rating',
          queryField: 'rating',
          criteria: 0,
          temporalSelection: this.getTemporalSelection('rating'),
        },
      },

      isLoadingFirst: true,
      isLoadingVillains: true,

      isFailedFilters: false,
      isFailedVillains: false,
    };
  },


  methods: {
    getTemporalSelection(queryField) {
      return this.$route.query[queryField] ? Number(this.$route.query[queryField]) : 0;
    },

    getAllFilters() {
      this.isLoadingFirst = true;

      Promise.all(Object.values(this.filters).map((filter) => this.getFilter(filter)))
        .then(() => {
          this.isLoadingFirst = false;

          this.getApiResearch();
        })
        .catch((error) => {
          this.isFailedFilters = true;
          this.isLoadingFirst = false;
        });
    },

    getFilter(filter) {
      return axios.get(store.urlApi + filter.routeAPI)
        .then(response => {
          filter.criteria = response.data[Object.keys(response.data).find(key => key !== 'success')];
        })
        .catch(error => {
          throw error;
        });
    },

    getApiResearch() {
      const params = {};

      if (this.$route.query.rating) {
        params.rating = this.$route.query.rating;
      }

      if (this.$route.query.reviews) {
        params.min_reviews = this.$route.query.reviews;
      }

      if (this.$route.query.skill) {
        params.skill_id = this.$route.query.skill;
      }

      if (this.$route.query.service) {
        params.service_id = this.$route.query.service;
      }

      if (this.$route.query.universe) {
        params.universe_id = this.$route.query.universe;
      }

      this.isLoadingVillains = true;

      console.log(`${store.urlApi}list-by-filters?${new URLSearchParams(params).toString()}`);

      axios.get(`${store.urlApi}list-by-filters?${new URLSearchParams(params).toString()}`)
        .then(response => {
          this.villains = response.data.villains;
          this.paginatorLink = response.data.villains.links;

          this.isLoadingVillains = false;
        }).catch(error => {
          this.isFailedVillains = false;

          this.isLoadingVillains = false;
        });
    },

    updateRouteQuery(paramField, paramValue) {
      this.$router.push({
        name: this.$route.name,
        query: {
          ...this.$route.query,
          [paramField]: paramValue
        }
      });
    },

    selectFilterFromSelect(filter, selectedId) {
      filter.temporalSelection = (filter.temporalSelection === selectedId) ? null : selectedId;

      this.updateRouteQuery(filter.queryField, filter.temporalSelection);
    },

    resetFilter() {
      Object.values(this.filters).forEach((filter) => {
        filter.temporalSelection = null;
      });

      this.$router.push({
        name: this.$route.name,
        query: {}
      });

      this.getApiResearch();
    },
    toggleMenu(menu) {
      console.log('clicked')
      this[menu] = !this[menu];
    },
  },
  watch: {
    '$route.query': {
      immediate: true,
      handler() {
        this.getApiResearch();
      }
    }
  },

  mounted() {
    this.getAllFilters();
  },
};
</script>


<template>
  <div class="loader" v-if="isLoadingFirst">
    <Loader />
  </div>
  <main v-else>
    <aside class="left">
      <h2>Filters</h2>
      <ul class="filters">
        <!-- AVERAGE RATING FILTER -->
        <li class="filter-section">
          <h3>Rating:</h3>

          <div class="interactive-stars">
            <i v-for="star in filters.ratings.criteria" :key="star" class="star cursor "
               :class="star <= filters.ratings.temporalSelection ? 'fa-solid fa-star' : 'fa-regular fa-star'"
               @mouseover="filters.ratings.temporalSelection = star"
               @mouseleave="filters.ratings.temporalSelection = this.$route.query.rating || 0"
               @click="updateRouteQuery(filters.ratings.queryField, star)"></i>
          </div>
        </li>

        <!-- MINIMUN NUMBER OF REVIEWS FILTER -->
        <li class="filter-section">
          <h3>Minimum Reviews:</h3>

          <div class="progress-container">
            <span>0</span>
            <input type="range" :min="0" :max="filters.reviews.criteria"
                   v-model="filters.reviews.temporalSelection"
                   @change="updateRouteQuery(filters.reviews.queryField, filters.reviews.temporalSelection)" />
            <span>{{ filters.reviews.criteria }}</span>
          </div>
        </li>

        <!-- SERVICE FILTER -->
        <li class="filter-section">
          <div class="select_filter">
            <h3>Services:</h3>
            <i class="fa-solid fa-eye" @click="toggleMenu('isServiceMenu')"></i>
          </div>
          <menu v-show="isServiceMenu">
            <li v-for="service in filters.services.criteria" :key="service.id"
                :class="{ 'btn-primary': service.id == filters.services.temporalSelection }"
                @click="selectFilterFromSelect(filters.services, service.id)">
              {{ service.name }}
            </li>
          </menu>
        </li>

        <!-- UNIVERSE FILTER -->
        <li class="filter-section">
          <div class="select_filter">
            <h3>Universes:</h3>
            <i class="fa-solid fa-eye" @click="toggleMenu('isUniverseMenu')"></i>
          </div>

          <menu v-show="isUniverseMenu">
            <li v-for="universe in filters.universes.criteria" :key="universe.id"
                :class="{ 'btn-primary': universe.id == filters.universes.temporalSelection }"
                @click="selectFilterFromSelect(filters.universes, universe.id)">
              {{ universe.name }}</li>
          </menu>
        </li>

        <!-- SKILL FILTER -->
        <li class="filter-section">
          <div class="select_filter">
            <h3>Skills:</h3>
            <i class="fa-solid fa-eye" @click="toggleMenu('isSkillMenu')"></i>
          </div>

          <menu v-show="isSkillMenu">
          <li v-for="skill in filters.skills.criteria" :key="skill.id"
          :class="{ 'btn-primary': skill.id == filters.skills.temporalSelection }"
          @click="selectFilterFromSelect(filters.skills, skill.id)">
              {{ skill.name }}
            </li>
          </menu>
        </li>

      </ul>
      <!-- CLEAR FILTERS -->
        <button class="btn btn-primary" @click="resetFilter">
          Clear Filters
        </button>
    </aside>

    <div class="right">
      <div class="loader" v-if="isLoadingVillains">
        <Loader />
      </div>
      <div v-else-if="villains.length">
        <div class="total_villain">
          <h2>Villains</h2>
          <h5>Founded {{ villains.length }} villains</h5>
        </div>
        <div class="villains-flex">
          <VillainCard v-for="(villain, index) in villains" :key="index" :villain="villain"
                       :class="{ 'sponsored-villain highlight': villain.active_sponsorship }" />
        </div>
      </div>
      <div v-else class="no_villains">
        <h2>NO VILLAIN FOUND</h2>
      </div>
    </div>
  </main>
</template>


<style scoped lang="scss">
main {
  @include display-flex('between', 'start');
  margin-top: 6em;
  .progress-container{
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    input{
      flex-grow: 1;
    }
  }

  aside {
    flex: 0 0 16rem;
    // position: sticky;
    top: 0;
    padding: 2rem 0 0 1rem;
    
    .interactive-stars{
      line-height: 2rem;
      padding-left: 0.5rem;
    }
    h2 {
      display: inline-block;
      background: black;
      background-clip: text;
      color: transparent;
    }
    ul{

      &>li{
        margin: 20px auto;
        padding-bottom: 10px;
        border-bottom: 1px solid black;
        .select_filter{
        display: flex;
        justify-content: space-between;
        align-items: center;
        .fa-solid.fa-eye{
          display: inline;
          @include text-clipping;

        }
      }
        h3{
          font-size: 1.4rem;
          @include text-clipping;

        }
      }
      menu{
        margin: 5px auto;
        max-height: 150px;
        overflow: auto;
        li{
          line-height: 1.8rem;
        }
      }
    }
  }

  .villains-flex{
    @media (min-width: 1500px) {
        gap: 2em;
      }

      @media (max-width: 1280px) {
        gap: 1em;
        margin: 0 1em;
      }

      @media (max-width: 900px) {
        gap: 1em;
        margin: 0 1em;
      }

      @media (max-width: 700px) {
        gap: 1em;
      }
  }

  .right {
    flex: 1 0;
    padding-top: 2em;
    
    .total_villain{
      margin: 0 2em 1em 2em;
      display: flex;
      justify-content: space-between;
      align-items: center;
      h2,
      h5{
        @include text-clipping;
      }
    }

    .villain-card {
      flex: 0 1 calc(25% - 2em);
      box-sizing: border-box;
      margin-bottom: 20px;
      cursor: pointer;
      transition: all 0.3s ease;

      // Responsive for smaller screens
      @media (min-width: 1500px) {
        flex: 0 1 calc(100% / 5 - 2em);
      }

      @media (max-width: 1280px) {
        flex: 0 1 calc(100% / 4 - 2em);
      }

      @media (max-width: 1128px) {
        flex: 0 1 calc(100% / 3 - 1em);
      }

      @media (max-width: 898px) {
        flex: 0 1 calc(100% / 2 - 1em);
      }

      @media (max-width: 898px) {
        flex: 0 1 calc(100% / 2 - 1em);
      }

      @media (max-width: 450px) {
        flex: 0 1 calc(100% - 2em);
      }
    }

    .pagination {
      text-align: center;
      margin-top: 20px;
    }

    .sponsored-villain {
      border: solid #fbce00 4px;
    }
  }
}

@media (max-width: 798px) {
  main {
    flex-direction: column;
    
    aside {
      width: 95%;
      margin: auto;
      padding: 10px;
      position: static;
      ul{
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
        justify-content: center;
        &>li{
          margin: 1rem auto;
          &:nth-child(1),
          &:nth-child(2){
            flex: 0 0 calc(100% / 2 - 0.5rem);
          }
          &:nth-child(3),
          &:nth-child(4),
          &:nth-child(5){
            flex: 0 0 calc(100% / 3 - 2rem / 3);
          }

        }
        menu{
          max-height: 150px;
          overflow: auto
        }
      }
      button.btn.btn-primary{
        width: 100%;
      }
    }

    .wrapper-filter-section {
      display: flex;
    }
  }
}

@media (max-width: 520px) {
  main {
    aside {
      ul{
        align-items: center;
        justify-content: center;
        display: flex;
        flex-wrap: wrap;
        gap: 5px;
        justify-content: center;
        &>li{
          margin: 15px auto;
          &:nth-child(n){
            flex: 0 0 100%;
          }

        }
        menu{
          max-height: 150px;
          overflow: auto
        }
      }
    }

    .wrapper-filter-section {
      display: flex;
    }
  }
}
</style>
