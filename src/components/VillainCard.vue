<script>
export default {
  name: 'VillainCard',
  props: {
    villain: {
      type: Object,
      required: true,
    },
  },
  methods: {
    ratingAvg() {
      return this.villain.ratings.reduce((sum, rating) => sum + rating.value, 0) / this.villain.ratings.length
    }
  }
};
</script>

<template>
  <router-link v-if="villain" class="villain-card"
               :to="{ name: 'VillainDetail', params: { slug: villain.slug } }">
    <img :src="'http://localhost:8000' + villain.image" alt="Villain Image" class="villain-img" />
    <div class="over"></div>
    <h3 class="villain-name">{{ villain.name }}</h3>
    <div class="villain-info">

      <p v-for="service in villain.services" class="villain-service">{{ service.name }}</p>
      <div class="villain-reviews" v-if="villain.ratings && villain.ratings.length">
        <span v-for="star in 5" :key="star" class="star">
          <i :class="{
            'fa-solid fa-star': star <= Math.floor(ratingAvg()),
            'fa-solid fa-star-half-stroke': star === Math.ceil(ratingAvg()) && ratingAvg() % 1 !== 0,
            'fa-regular fa-star': star > ratingAvg()
          }"></i>
        </span>
        <span class="review-count">Reviews: {{ villain.ratings.length }}</span>
      </div>
      <div class="villain-reviews" v-else>
        <span v-for="star in 5" :key="star" class="star">
          <i class='fa-regular fa-star'></i>
        </span>
      </div>
    </div>
    <div>
      <router-link :to="{ name: 'VillainDetail', params: { slug: villain.slug } }"><button
                class="btn btn-primary">Contact Now</button></router-link>
    </div>
  </router-link>

</template>

<style scoped lang="scss">
@use '../assets/style/generals/variables' as *;
@import '../assets/style/main.scss';

.villain-card {
  background-color: $clr-neutral-ltst;
  padding: 20px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  position: relative;
  overflow: hidden;
  max-height: 580px;
  border: 5px solid $clr-brand-primary;
  transition: box-shadow 0.8s ease-in-out;
  text-align: center;
  

  .villain-img {
    width: 100%;
    height: auto;
    aspect-ratio: 4 / 5;
    object-fit: cover;
    object-position: top;
    object-position: top;
    border-radius: 8px;
    margin-bottom: 15px;
    overflow: hidden;
  }

  &.highlight {

  .villain-name {
    @include text-clipping-gold;
  }

  .villain-reviews .fa-star {
    color: $clr-brand-gold-light;
  }

    &:hover {
      box-shadow: inset 0 0 30px $clr-brand-gold-light;
    }
  }

  &:hover {
    box-shadow: inset 0 0 25px $clr-brand-primary; 
  }
}

  .villain-name {
      font-size: $font-size-l;
      color: $clr-brand-primary;
      padding-bottom: 0.1rem;
      @include text-clipping
  }

  .villain-info {
    text-align: center;
    margin-bottom: 15px;
    position: relative;
    font-weight: 700;

    .villain-service {
      font-size: $font-size-m;
      color: $clr-neutral-dk;
      padding: 0.2rem 0;
    }

    .villain-reviews {
      font-size: $font-size-l;
      padding-top: 0.5rem;

      .fa-star {
        color: $clr-brand-primary;
        font-size: $font-size-m;
        padding: 0 0.1rem;
        padding-bottom: 0.2em;
      }

      .review-count {
        color: $clr-neutral-dk;
        margin-top: 0.5rem;
        font-size: $font-size-m;
        display: block;
      }
    }
  }

</style>
