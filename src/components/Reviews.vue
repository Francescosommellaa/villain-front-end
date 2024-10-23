<script>
import { store } from '@/store/store';
import axios from 'axios';

export default {
    name: 'Reviews',
    props: {
    villainData: {
      type: Object,
      required: true
    }
  },
    data() {
    return {
      isReviewed: false,
      hoverStars: 0, // Per gestire l'hover delle stelle
      form: {
        full_name: '',
        rating_id: 0,
        content: ''
      },
      formErrors: {
        full_name: false,
        rating_id: 0,
        content: false
      }
    };
  },
  methods: {
    setStars(star) {
      this.form.rating_id = star;
    },
    sentReview(){
      console.log('start api')
      console.log('ingresso funzione')
      axios.post(store.urlApi + 'sent-rating',{
          full_name: this.form.full_name,
          rating_id: this.form.rating_id,
          content: this.form.content,
          villain_id: this.villainData.id
      })
        .then(resp=>{
          console.log(resp.data)
          this.isReviewed = true
        })
        .catch(err=>{
          console.log(err)
        })
    }
  },
};
</script>

<template>
    <div class="review_sent" v-if="isReviewed">
    <h1>Your review has been successfully sent</h1>
  </div>
  <div v-else class="reviews-container">
    <h2>Make a review</h2>

    <!-- Form per aggiungere una nuova recensione -->
    <form @submit.prevent="sentReview" method="POST" class="review-form">
      <div class="form-group">
        <label for="fullName">Full Name:</label>
        <input
          type="text"
          id="fullName"
          v-model="form.full_name"
          required
          placeholder="Your full name"
        />
      </div>

      <div class="form-group">
        <label for="content">Comment:</label>
        <textarea
          id="content"
          name="content"
          rows="6"
          v-model="form.content"
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
            @mouseleave="hoverStars = form.rating_id || 0"
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
  padding: 0 2em;
  max-width: 90%;
  margin: 4em auto;
  background-color: $light;
  border-radius: 10px;

  button{
    float: right;
    margin-bottom: 30px
  }
  h2 {
    color: $primary;
    font-size: 1.5rem;
    margin-bottom: 20px;
  }
}

.review-form {
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
    padding: 0.4em 0;
    font-size: 1.5rem;
    color: $clr-rating-stars;
    .star {
      cursor: pointer;
      transition: color 0.2s;
        &:hover {
            color: $primary;
        }
    }
  }
}
.review_sent{
  text-align: center;
  background: linear-gradient(45deg, $primary, $secondary, $accent, $accent);
  background-clip: text;
  color: transparent;
  min-height: 30vh;
}
</style>
  