<script>
export default {
  name: 'ContactForm',
  props: {
    villain: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      form: {
        fullName: '',
        service: '',
        message: '',
      },
      formErrors: {
        fullName: false,
        service: false,
        message: false,
      },
    };
  },
  methods: {
    validateForm() {
      this.formErrors.fullName = !this.form.fullName;
      this.formErrors.service = !this.form.service;
      this.formErrors.message = !this.form.message;

      if (!this.formErrors.fullName && !this.formErrors.service && !this.formErrors.message) {
        alert('Form submitted successfully');
      }
    },
  },
};

</script>

<template>

<div class="contact-form">
  <h2>Contact {{ villain.name }}</h2>
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

    <div class="form-group">
      <label for="message">Message:</label>
      <textarea
        id="message"
        v-model="form.message"
        :class="{ 'is-invalid': formErrors.message }"
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
</style>
