<script>
export default {
  name: 'VillainCard',
  props: {
    villain: {
      type: Object,
      required: true,
    },
  },
  methods:{
    ratingAvg(){
      return this.villain.ratings.reduce((sum, rating)=>sum + rating.value, 0) / this.villain.ratings.length
    }
  }
};
</script>

<template>
<router-link v-if="villain" class="villain-card" :to="{ name: 'VillainDetail', params: { slug: villain.slug } }">
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
        }"
        ></i>
      </span>
      <span class="review-count">Reviews: {{ villain.ratings.length }}</span>
    </div>
    <div class="villain-reviews" v-else>
      <span v-for="star in 5" :key="star" class="star">
        <i class='fa-regular fa-star'></i>
      </span>
    </div>
  </div>
  <div class="under">
    <router-link   :to="{ name: 'VillainDetail', params: { slug: villain.slug } }"><button class="btn btn-primary">Contact Now</button></router-link>
  </div>
</router-link>

</template>

<style scoped lang="scss">
@use '../assets/style/generals/variables' as *;
@import '../assets/style/main.scss';


.villain-card {
  background-color: $light;
  padding: 20px;
  border: 2px solid $primary;
  border-radius: 10px;
  display: flex;
  max-height: 580px;
  flex-direction: column;
  align-items: center;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
  transition: transform 0.8s ease-in-out;

  // Lascia invariata questa parte come richiesto
  img { 
    object-position: top; 
  }
  &.highlight {
    &:hover {
      .over {
        background-color: rgb(250, 204, 0, 0.4);
        transition: background-color 0.4s ease-in-out
      }
      .villain-name,
      .villain-service,
      .review-count,
      .villain-reviews .fa-star {
        color: $primary;
        transition: color 0.4s ease-in-out;
      }
    }
  }

  &:hover {
    .villain-service,
    .review-count {
      color: white;

    }

    .villain-reviews .fa-star {
      color: white;
    }
  }

  .under {
    margin-top: auto;
    display: flex;
    justify-content: center;
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2);

    .over {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgb(53, 0, 95, 0.6);
      transition: filter 0.8s ease-in-out;
      z-index: 1;
    }

    .villain-name {
      opacity: 1;
      width: 100%;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: $light;
      font-size: 1.5rem;
      transition: opacity 0.8s ease-in-out, color 0.4s ease-in-out;
      z-index: 2;
      text-align: center;
    }

    .villain-service {
      color: white;
      transition: color 0.4s ease-in-out;
    }
  }
}

.villain-name {
  padding: 10px 0;
}

h3{
  text-align: center
}

.villain-img {
  width: 100%;
  height: auto;
  aspect-ratio: 4 / 5;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 15px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgb(53, 0, 95, 0.2);
}

.villain-info {
  text-align: center;
  margin-bottom: 15px;
  position: relative;
  z-index: 2;
  font-weight: 900;
  
  .villain-service {
    font-size: 1rem;
    color: $dark;
    padding-bottom: 0.2rem;
    transition: color 0.4s ease-in-out;
  }

  .villain-reviews {
    font-size: 1.2rem;
    padding-top: 0.5rem;

    .fa-star {
      color: $primary;
      font-size: 1rem;
      padding: 0 0.1rem;
      transition: color 0.4s ease-in-out;
    }
    .review-count {
      margin-top: 0.5rem;
      font-size: 1rem;
      transition: color 0.4s ease-in-out;
      display: block;
    }

  }
}
</style>
