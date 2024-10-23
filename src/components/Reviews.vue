<script>
export default {
    name: 'Reviews',
    data() {
    return {
      newReview: {
        fullName: '',
        comment: '',
        stars: 0,
      },
      hoverStars: 0, // Per gestire l'hover delle stelle
      reviews: [
        { fullName: 'John Doe', comment: 'Great service!', stars: 5 },
        { fullName: 'Jane Smith', comment: 'Had a fantastic time!', stars: 4 },
        { fullName: 'Alice Brown', comment: 'Good experience.', stars: 3 },
      ],
    };
  },
  computed: {
    // Mostra massimo 4 recensioni
    sortedReviews() {
      return this.reviews.slice(0, 4);
    },
  },
  methods: {
    addReview() {
      this.reviews.unshift({
        fullName: this.newReview.fullName,
        comment: this.newReview.comment,
        stars: this.newReview.stars,
      });
      // Reset del form
      this.newReview.fullName = '';
      this.newReview.comment = '';
      this.newReview.stars = 0;
      this.hoverStars = 0;
    },
    setStars(star) {
      this.newReview.stars = star;
    },
  },
};
</script>

<template>
  <div class="reviews-container">
    <h2>Reviews</h2>

    <!-- Sezione delle recensioni -->
    <div v-for="(review, index) in sortedReviews" :key="index" class="review-card">
      <div class="review-header">
        <h4>{{ review.fullName }}</h4>
      </div>
      <div class="stars">
        <span v-for="star in 5" :key="star" class="star">
          {{ star <= review.stars ? '★' : '☆' }}
        </span>
      </div>
      <p>{{ review.comment }}</p>
    </div>

    <!-- Form per aggiungere una nuova recensione -->
    <form @submit.prevent="addReview" class="review-form">
      <div class="form-group">
        <label for="fullName">Full Name:</label>
        <input
          type="text"
          id="fullName"
          v-model="newReview.fullName"
          required
          placeholder="Your full name"
        />
      </div>

      <div class="form-group">
        <label for="comment">Comment:</label>
        <textarea
          id="comment"
          v-model="newReview.comment"
          required
          placeholder="Your review"
        ></textarea>
      </div>

      <div class="form-group">
        <label>Stars:</label>
        <div class="interactive-stars">
          <i 
            v-for="star in 5" 
            :key="star" 
            class="star" 
            :class="star <= hoverStars ? 'fas fa-star' : 'far fa-star'" 
            @mouseover="hoverStars = star" 
            @mouseleave="hoverStars = newReview.stars || 0"
            @click="setStars(star)"
          ></i>
        </div>
      </div>

      <button type="submit" class="btn btn-primary">Submit Review</button>
    </form>
  </div>
</template>
  
  <style scoped lang="scss">
  @use '../assets/style/generals/variables' as *;
  @import '../assets/style/main.scss';
  
  .reviews-container {
  max-width: 80%;
  margin: 4em auto;
  background-color: $light;
  border-radius: 10px;

  h2 {
    color: $primary;
    font-size: 1.5rem;
    margin-bottom: 20px;
  }
}

.review-card {
  margin-bottom: 20px;
  padding: 15px;
  border-bottom: 1px solid $border-color;
  background-color: $gray-100;
  &:last-of-type {
    border-bottom: none;
  }

  .review-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    h4 {
      font-weight: 700;
      color: $primary;
      margin: 0;
    }
  }

  .stars {
    color: $clr-rating-stars;
    font-size: 1.2rem;
    margin: 5px 0;
  }

  p {
    color: $primary-text-emphasis;
    font-size: 1rem;
    margin-top: 10px;
  }
}

.review-form {
  padding: 20px;
  border: 1px solid $border-color;
  border-radius: 8px;
  background-color: $gray-100;

  .form-group {
    margin-bottom: 20px;
    label {
      font-weight: $font-weight-bold;
      color: $label-text-emphasis;
    }
    input,
    textarea {
      width: 100%;
      padding: 12px;
      margin-top: 5px;
      border-radius: $btn-border-radius;
      border: 1px solid $input-border-color;
      background-color: $input-bg;
      color: $primary-text-emphasis;
    }
  }

  .interactive-stars {
    font-size: 2rem;
    color: $clr-rating-stars;
    .star {
      cursor: pointer;
      transition: color 0.2s;
    }
    .star:hover {
      color: $primary;
    }
  }

  button {
    background-color: $primary;
    color: $light;
    padding: $btn-padding-y $btn-padding-x;
    border-radius: $btn-border-radius;
    font-weight: $btn-font-weight;
    cursor: pointer;
    transition: background-color 0.3s ease;
    &:hover {
      background-color: $secondary;
    }
  }
}
</style>
  