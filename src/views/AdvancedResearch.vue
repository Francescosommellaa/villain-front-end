<script>
import { store } from "@/store/store";
import VillainCard from "../components/VillainCard.vue";
import axios from "axios";
import Loader from "@/components/common/Loader.vue";
import FilterSelector from "@/components/advanced-research/FilterSelector.vue";

export default {
  name: 'AdvancedResearch',


  components: {
    VillainCard,
    Loader,
    FilterSelector
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

    updateServiceFilter(filter) {
      this.filters.services = filter;

      this.updateRouteQuery(filter.queryField, filter.temporalSelection);
    },

    updateUniverseFilter(filter) {
      this.filters.universes = filter;

      this.updateRouteQuery(filter.queryField, filter.temporalSelection);
    },

    updateSkillFilter(filter) {
      this.filters.skills = filter;

      this.updateRouteQuery(filter.queryField, filter.temporalSelection);
    },

    resetFilter() {
      Object.values(this.filters).forEach((filter) => {
        filter.temporalSelection = 0;
      });

      this.$router.push({
        name: this.$route.name,
        query: {}
      });

      this.$refs.serviceFilter.reset();
      this.$refs.universeFilter.reset();
      this.$refs.skillFilter.reset();

      this.getApiResearch();
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
            <input type="range" step="1" :min="0" :max="filters.reviews.criteria"
                   v-model="filters.reviews.temporalSelection"
                   @change="updateRouteQuery(filters.reviews.queryField, filters.reviews.temporalSelection)" />
            <span>{{ filters.reviews.criteria }}</span>
          </div>
        </li>

        <!-- SERVICE FILTER -->
        <li class="filter-section">
          <h3>Services:</h3>

          <FilterSelector ref="serviceFilter" :filter="filters.services"
                          @update-filter="updateServiceFilter" />
        </li>

        <!-- UNIVERSE FILTER -->
        <li class="filter-section">
          <h3>Universes:</h3>

          <FilterSelector ref="universeFilter" :filter="filters.universes"
                          @update-filter="updateUniverseFilter" />
        </li>

        <!-- SKILL FILTER -->
        <li class="filter-section">
          <h3>Skills:</h3>

          <FilterSelector ref="skillFilter" :filter="filters.skills"
                          @update-filter="updateSkillFilter" />
        </li>

        <!-- CLEAR FILTERS -->
        <li class="filter-section">
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
      <!-- if="villains.length" -->
      <div v-else>
        <div class="total-villain">
          <h2>Villains</h2>
          <strong class="villains-count" v-if="villains.length">
            {{ villains.length }} results
          </strong>
        </div>

        <div class="villains-flex" v-if="villains.length">
          <VillainCard v-for="(villain, index) in villains" :key="index" :villain="villain"
                       :class="{ 'sponsored-villain highlight': villain.active_sponsorship }" />
        </div>

        <div v-else class="no-villains">
          <strong>NO VILLAIN FOUND</strong>
        </div>
      </div>
    </div>
  </main>
</template>

<style lang="scss" scoped>
main {
  @include display-flex('between', 'start');
  margin-top: 4rem;

  h2 {
    @include text-clipping;
    font-size: $font-size-xl;
  }

  aside {
    flex: 0 0 15rem;
    position: sticky;
    top: 0;
    padding: 1.75rem 0 0 1.75rem;

    h2 {
      margin-bottom: 1rem;
    }

    .filters {
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
      margin-bottom: 1.75rem;

      .filter-section {
        &:nth-child(3) :deep(.filter-selector) {
          input {
            z-index: 15;
          }

          .drop-down {
            z-index: 14;
          }
        }

        &:nth-child(4) :deep(.filter-selector) {
          input {
            z-index: 13;
          }

          .drop-down {
            z-index: 12;
          }
        }

        &:nth-child(5) :deep(.filter-selector) {
          input {
            z-index: 11;
          }

          .drop-down {
            z-index: 10;
          }
        }

        h3 {
          font-size: $font-size-l;
          color: $clr-brand-primary;
          margin-bottom: .75rem;
        }

        .interactive-stars {
          color: $clr-brand-primary;
          @include display-flex('evenly');

          i {
            cursor: pointer;
            font-size: 1.5rem;
          }
        }

        .progress-container {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: .5rem;
          color: $clr-neutral-dk;
          line-height: 1;

          input {
            flex-grow: 1;
            -webkit-appearance: none;
            appearance: none;
            height: 2em;
            background-color: transparent;

            &::-webkit-slider-runnable-track {
              height: .5em;
              background-color: $clr-neutral-lt;
              border-radius: .5em;
            }

            &::-moz-range-track {
              height: .5em;
              background-color: $clr-neutral-lt;
              border-radius: .5em;
            }

            &::-webkit-slider-thumb {
              -webkit-appearance: none;
              position: relative;
              top: -50%;
              width: 1em;
              height: 1em;
              background-color: $clr-brand-primary;
              border-radius: 50%;
              cursor: pointer;
            }

            &::-moz-range-thumb {
              width: 1em;
              height: 1em;
              background-color: $clr-brand-primary;
              border-radius: 100%;
              cursor: pointer;
            }

            &:hover {
              &::-webkit-slider-thumb {
                top: -75%;
                width: 1.25em;
                height: 1.25em;
              }

              &::-moz-range-thumb {
                width: 1.25em;
                height: 1.25em;
              }
            }
          }
        }

        button.btn.btn-primary {
          width: 100%;
          margin-top: .5rem;
        }
      }
    }
  }

  .right {
    flex: 1 0;
    padding-top: 1.75rem;

    .total-villain {
      margin: 0 1.75rem 1rem 1.75rem;
      @include display-flex('between', 'center');

      .villains-count {
        @include text-clipping;
        text-align: right;
      }
    }

    .villains-flex {
      min-height: 80vh;

      @media (min-width: 1500px) {
        position: static;
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

      .villain-card {
        flex: 0 1 calc(25% - 2em);
        box-sizing: border-box;
        margin-bottom: 20px;
        cursor: pointer;
        transition: all 0.3s ease;

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
    }

    // TO DELETE OR NOT TO DELETE THAT'S THE DILEMMA
    .pagination {
      text-align: center;
      margin-top: 20px;
    }

    // TO DELETE OR NOT TO DELETE THAT'S THE DILEMMA
    .sponsored-villain {
      border: solid $clr-brand-gold-light 4px;
    }

    .no-villains {
      @include display-flex(center, center);
      text-align: center;
      height: auto;
      min-height: 70vh;
      font-size: $font-size-xxl;

      strong {
        @include text-clipping;
      }
    }
  }
}


@media (max-width: 790px) {
  main {
    flex-direction: column;

    aside {
      width: 95%;
      margin: auto;
      padding: 10px;
      position: static;

      .filters {
        flex-flow: row wrap;
        gap: 1rem;
        justify-content: center;

        .filter-section {
          margin: 1rem auto;

          &:nth-child(1),
          &:nth-child(2) {
            flex: 0 0 calc(100% / 2 - 0.5rem);
          }

          &:nth-child(3),
          &:nth-child(4),
          &:nth-child(5) {
            flex: 0 0 calc(100% / 3 - 2rem / 3);
          }

          &:nth-child(6) {
            flex: 0 0 100%;
          }
        }
      }
    }
  }
}


@media (max-width: 590px) {
  main {
    aside {
      .filters {
        gap: 1rem;
        justify-content: center;

        .filter-section {
          margin: 1rem auto;

          &:nth-child(n) {
            flex: 0 0 100%;
          }
        }
      }
    }
  }
}
</style>
