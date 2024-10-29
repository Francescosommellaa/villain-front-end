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
    }
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
          <h3>Services:</h3>

          <menu>
            <li v-for="service in filters.services.criteria" :key="service.id"
                :class="{ 'btn-primary': service.id == filters.services.temporalSelection }"
                @click="selectFilterFromSelect(filters.services, service.id)">
              {{ service.name }}
            </li>
          </menu>
        </li>

        <!-- UNIVERSE FILTER -->
        <li class="filter-section">
          <h3>Universes:</h3>

          <menu>
            <li v-for="universe in filters.universes.criteria" :key="universe.id"
                :class="{ 'btn-primary': universe.id == filters.universes.temporalSelection }"
                @click="selectFilterFromSelect(filters.universes, universe.id)">
              {{ universe.name }}</li>
          </menu>
        </li>

        <!-- SKILL FILTER -->
        <li class="filter-section">
          <h3>Skills</h3>

          <ul>
            <li v-for="skill in filters.skills.criteria" :key="skill.id"
                :class="{ 'btn-primary': skill.id == filters.skills.temporalSelection }"
                @click="selectFilterFromSelect(filters.skills, skill.id)">
              {{ skill.name }}
            </li>
          </ul>
        </li>

        <!-- CLEAR FILTERS -->
        <li>
          <button class="btn btn-primary" @click="resetFilter">
            Clear Filters
          </button>
        </li>
      </ul>
    </aside>

    <div class="right">
      <div class="loader" v-if="isLoadingVillains">
        <Loader />
      </div>
      <div v-else-if="villains.length" class="villains-flex">
        <VillainCard v-for="(villain, index) in villains" :key="index" :villain="villain"
                     :class="{ 'sponsored-villain highlight': villain.active_sponsorship }" />
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

  .left {
    flex: 0 0 15rem;
    position: sticky;
    top: 0;
    padding: 2rem 0 0 2rem;

    h2 {
      display: inline-block;
      background: $grd-brand-dk;
      background-clip: text;
      color: transparent;
    }
  }

  .right {
    flex: 1 0;

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

    .sponsored-villain {
      border: solid #fbce00 4px;
    }
  }
}

@media (max-width: 700px) {
  main {
    flex-direction: column;

    #advanced-filter {
      width: 95%;
      margin: auto;
    }

    .wrapper-filter-section {
      display: flex;
    }
  }
}
</style>
