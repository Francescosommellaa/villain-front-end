<script>
export default {
  name: 'VillainCard',
  props: {
    villain: {
      type: Object,
      required: true,
    },
  },
};

</script>

<template>
   <div v-if="villain" class="villain-card">
    <img :src="'http://localhost:8000' + villain.image" alt="Villain Image" class="villain-img" />
    <div class="over"></div>
    <h3 class="villain-name">{{ villain.name }}</h3>
    <div class="villain-info">
      <p v-for="service in villain.services" class="villain-service">{{ service.name }}</p>
      <div class="villain-reviews" v-if="villain.ratings && villain.ratings.length">
        <span v-for="star in 5" :key="star" class="star">
          {{ star <= villain.ratings[0].value ? '★' : '☆' }} </span>
      </div>
    </div>
    <div class="under">
      <router-link  class="btn btn-primary" :to="{ name: 'VillainDetail', params: { slug: villain.slug } }">Contact Now</router-link>
    </div>
    
  </div>

</template>

<style scoped lang="scss">
@use '../assets/style/generals/variables' as *;
@import '../assets/style/main.scss';

.villain-card {
  background-color: $light;
  padding: 20px;
  border: 1px solid $primary;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
  transition: transform 0.3s ease;

  img{
    object-position: top; 
  }

  &:hover {
    transform: translateY(-5px);
    
    .over{
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgb(53, 0, 95, 0.6);
      transition: filter 0.3s ease;
      z-index: 1;

    }

    .villain-name {
      opacity: 1;
    }
  }

  .villain-img {
    width: 100%;
    height: auto;
    aspect-ratio: 4 / 5; 
    object-fit: cover;
    border-radius: 8px;
    margin-bottom: 15px;
    overflow: hidden;
  }


  .villain-name {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: $light;
    font-size: 1.2rem;
    opacity: 0;
    transition: opacity 2s ease;
    z-index: 2;
  }

  .villain-info {
    text-align: center;
    margin-bottom: 15px;
    position: relative;
    z-index: 2;
    
    .villain-service {
      font-size: 1rem;
      color: $secondary-text-emphasis;
    }

    .villain-reviews {
      color: $clr-rating-stars;
      font-size: 1.2rem;
    }
  }

  .btn {
    width: 100%;
  }
  .under {
    width: 100%;
    z-index: 100;
    font-size: $btn-font-size;
    border-radius: $btn-border-radius;
    border: none;
    transition: 0.8s ease-in-out;
    &:hover{
      background-color: white;
    }
  }
}

</style>
