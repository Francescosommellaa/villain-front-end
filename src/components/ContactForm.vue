<script>
import { store } from '@/store/store';
import axios from 'axios';
import Loader from './common/Loader.vue';

export default {
  name: 'ContactForm',
  components: {
    Loader
  },
  props: {
    villainData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      urlApi: store.urlApi,
      isSent: false,
      isMessaged: false,
      errorSent: false,
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
    sentMessage() {
      this.isMessaged = true
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
          this.isSent = true
          this.errorSent = true
        });
    }
  },
};
</script>

<template>
  <div class="message_sent" v-if="isMessaged && isSent && !errorSent">
    <h1>Thank you! Your message has been successfully sent</h1>
  </div>
  <div class="loader" v-else-if="isMessaged && !isSent">
    <Loader />
  </div>
  <div v-else-if="errorSent">
    <h1>Error Message not sent!</h1>
  </div>
  <div class="contact-form" v-else>
    <h2>Contact: {{ villainData.name }}</h2>

    <form @submit.prevent="sentMessage" method="POST">
      <!-- Name -->
      <div class="form-group">
        <label for="full_name">Full Name: *</label>
        <input type="text" name="full_name" id="full_name" pattern=".{3,}" required
               title="The name must be at least 3 characters long" v-model="form.full_name"
               :class="{ 'is-invalid': formErrors.fullName }" placeholder="Enter your full name" />
        <div v-if="formErrors.fullName" class="error-message">
          Full Name is required.
        </div>
      </div>
      <!-- Email -->
      <div class="form-group">
        <label for="email">Email: *</label>
        <input type="email" name="email" id="email"
               pattern="^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
               title="Please enter a valid lowercase email address." required v-model="form.email"
               :class="{ 'is-invalid': formErrors.fullName }" placeholder="Enter your email" />
        <div v-if="formErrors.email" class="error-message">
          Mail is required.
        </div>
      </div>
      <!-- Phone -->
      <div class="form-group">
        <label for="phone">Phone: *</label>
        <input type="text" name="phone" id="phone" pattern="^\+?[0-9\s]{10,15}$" maxlength="15"
               title="The phone must be numbers and max 15" required v-model="form.phone"
               :class="{ 'is-invalid': formErrors.phone }" placeholder="Enter your phone number" />
        <div v-if="formErrors.fullName" class="error-message">
          Mail is required.
        </div>
      </div>
      <!-- Content -->
      <div class="form-group">
        <label for="content">Message: *</label>
        <textarea id="content" rows="8" pattern=".{8,}"
                  title="The message must be at least 8 characters long" required
                  v-model="form.content" :class="{ 'is-invalid': formErrors.content }"
                  placeholder="Enter your message"></textarea>
        <div v-if="formErrors.message" class="error-message">
          Message is required.
        </div>
      </div>

      <button class="btn btn-primary" type="submit">Send Message</button>
    </form>
  </div>
</template>


<style scoped lang="scss">
.contact-form {
  background-color: $clr-neutral-ltst;
  padding: 2em;
  border-radius: $btn-border-radius;
  max-width: 90%;
  margin: 0 auto;

  button {
    float: right;
  }

  h2 {
    color: $clr-brand-primary;
  }

  .form-group {
    margin: 1.2rem 0;

    label {
      color: $clr-neutral-dk;
      font-weight: 700;
    }

    input,
    select,
    textarea {
      background-color: $clr-neutral-ltst;
      border: 1px solid $clr-neutral-lt;
      border-radius: $btn-border-radius;
      padding: 0.8rem;
      width: 100%;
      font-size: $font-size-m;
      color: $clr-neutral-dkst;

      &::placeholder {
        color: $clr-neutral-dk;
      }

      &.is-invalid {
        border-color: $clr-utility-danger;
      }
    }

    .error-message {
      color: $clr-utility-danger;
      font-size: 0.875rem;
    }
  }
}

.message_sent {
  @include text-clipping;
  min-height: 50vh;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  text-align: center;
}

@media screen and (max-width:786px){
  .contact-form {
    padding: 0 0.5em;
  }
}
</style>