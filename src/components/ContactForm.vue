<script>
import { store } from '@/store/store';
import axios from 'axios';

export default {
  name: 'ContactForm',
  props: {
    villainServices: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      urlApi: store.urlApi,
      isSent: false,
      form: {
        full_name: '',
        email: '',
        phone: '',
        content: ''
      },
      formErrors: {
        fullName: false,
        email: false,
        phone: false,
        content: false
      }
    };
  },
  methods: {
    sentMessage(){
      axios.post(this.urlApi + 'sent-message', {
        full_name: this.form.full_name,
        email: this.form.email,
        phone: this.form.phone,
        content: this.form.content,
        villain_id: this.villainData.id
      })
      .then(resp => {
        const successSent = resp.data;
        this.isSent = true;
        console.log(successSent);
      })
      .catch(err => {
        console.log(err);
      });
    }
  },
};
</script>

<template>

<div class="contact-form">
  <h2>Contact the Villain</h2>
  <form @submit.prevent="validateForm">
    <div class="form-group">
      <label for="fullName">Full Name:</label>
      <input
        type="text"
        id="fullName"
        v-model="form.fullName"
        :class="{ 'is-invalid': formErrors.fullName }"
        placeholder="Enter your full name"
      />
      <div v-if="formErrors.fullName" class="error-message">
        Full Name is required.
      </div>
    </div>

    <div class="form-group">
        <label for="service">Service:</label>
        <select
          id="service"
          v-model="form.service"
          :class="{ 'is-invalid': formErrors.service }"
        >
          <option disabled value="">Select a service</option>
          <option v-for="service in villainServices" :key="service.id" :value="service.name">{{ service.name }}</option>
        </select>
        <div v-if="formErrors.service" class="error-message">
          Please select a service.
        </div>
      </div>
      <!-- Content -->
      <div class="form-group">
        <label for="content">Message:</label>
        <textarea
          id="content"
          v-model="form.content"
          :class="{ 'is-invalid': formErrors.content }"
          placeholder="Enter your message"
        ></textarea>
        <div v-if="formErrors.message" class="error-message">
          Message is required.
        </div>
      </div>
      
      <button class="btn btn-primary" type="submit">Send Message</button>
    </form>
  </div>
</template>


<style scoped lang="scss">
@use '../assets/style/generals/variables' as *;
@import '../assets/style/main.scss';

.contact-form {
  background-color: $light;
  border-radius: $btn-border-radius;
  max-width: 80%;
  margin: 1em auto;
  
  h2 {
    color: $primary;
  }
  
  .form-group {
    margin: 1.2rem 0;
    
    label {
      color: $label-text-emphasis;
      font-weight: $font-weight-bold;
    }
    
    input, select, textarea {
      background-color: $input-bg;
      border: 1px solid $input-border-color;
      border-radius: $btn-border-radius;
      padding: 0.8rem;
      width: 100%;
      font-size: $font-size-base;
      color: $primary-text-emphasis;
      
      &::placeholder {
        color: $input-placeholder-color;
      }
      
      &.is-invalid {
        border-color: $danger;
      }
    }
    
    .error-message {
      color: $danger;
      font-size: 0.875rem;
    }
  }
}

.message_sent{
  text-align: center;
  background: linear-gradient(45deg, $primary, $secondary, $accent, $accent);
  background-clip: text;
  color: transparent;
  min-height: 30vh;
}
</style>