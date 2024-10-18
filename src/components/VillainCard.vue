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
    <img :src="villain.img" alt="Villain Image" class="villain-img" />
    <div class="villain-info">
      <h3 class="villain-name">{{ villain.name }}</h3>
      <p class="villain-service">{{ villain.service }}</p>
      <div class="villain-reviews">
        <span v-for="star in 5" :key="star" class="star">
          {{ star <= villain.rating ? '★' : '☆' }}
        </span>
      </div>
    </div>
    <button class="btn btn-primary">Contact Now</button>
  </div>

</template>

<style scoped lang="scss">
@use '../assets/style/generals/variables' as *;
@import '../assets/style/main.scss';

.villain-card {
  background-color: $light;
  padding: 20px;
  border: 1px solid $divider-color;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }

  .villain-img {
    width: 100%;
  height: auto;
  aspect-ratio: 4 / 5; 
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 15px;
  overflow: hidden
  }

  .villain-info {
    text-align: center;
    margin-bottom: 15px;

    .villain-name {
      font-size: 1.2rem;
      font-weight: $font-weight-bold;
      color: $primary-text-emphasis;
      margin-bottom: 5px;
    }

    .villain-service {
      font-size: 1rem;
      color: $secondary-text-emphasis;
    }

    .villain-reviews {
      color: $clr-rating-stars;
      font-size: 1.2rem;
    }
  }

  .btn{
      width: 100%;
      margin: 0.2em;
    }
}

</style>
