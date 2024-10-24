<script>
import { store } from '@/store/store';
import axios from 'axios';
import ContactForm from "../components/ContactForm.vue";
import Reviews from '@/components/Reviews.vue';
import Loader from '@/components/Loader.vue';

export default {
    name: 'VillainDetail',
    components: {
        ContactForm,
        Reviews,
        Loader,
    },
    data(){
        return{
            villain: [],
            slug: '',
            isLoading: true,
            showCv: false,
            cvExists: false,
            cvUrl: '',
            villainName: ''
        }
    },
    methods: {
        getApiDetails(slug){
            axios.get(store.urlApi + 'villain/' + slug)
                .then(resp =>{
                    this.villain = resp.data.villain;
                    console.log(this.villain);
                    this.checkCvExists();
                    this.isLoading = false;
                });
        },
        
        formatDate(dateString) {
            const date = new Date(dateString);

            const formattedDate = date.toLocaleDateString('it-IT', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
            });

            const formattedTime = date.toLocaleTimeString('it-IT', {
                hour: '2-digit',
                minute: '2-digit'
            });

            return `${formattedDate} ${formattedTime}`;
        },
        checkCvExists() {
            if (!this.villain.cv || this.villain.cv === null) {
                this.cvExists = false;
                console.log('CV non disponibile');
            } else {
                this.cvExists = true;
                this.cvUrl = `http://localhost:8000/${this.villain.cv}`;
                console.log('URL generato:', this.cvUrl);
            }
        },
        closeCv() {
            this.showCv = false;
        },
        downloadCv() {
            if (this.cvExists) {
                const link = document.createElement('a');
                link.href = this.cvUrl;
                link.download = `${this.villainName}_CV.pdf`;
                link.click();
            }
        }
        
    },
    mounted(){
        this.villainName = this.$route.params.villainName;
        this.slug = this.$route.params.slug;
        this.getApiDetails(this.slug);
    }
}
</script>


<template>
    <div class="loader" v-if="isLoading">
        <Loader/>
    </div>
    <div v-else>

        <div class="cont-detail">
            <div class="cont-left">
                <div class="cont-img mb-30">
                    <img :src="'http://localhost:8000' + villain.image" alt="prova">
                </div>
                
                <div class="cont-reviews">
                    <h4 class="mb-20"><strong>Contact {{ villain.name }}:</strong></h4>
                    <h4 class="mb-10"><i class="fa-solid fa-envelope"></i> email@email</h4>
                    <h4 class="mb-10"><i class="fa-solid fa-phone"></i> {{villain.phone}}</h4>
                    <h4 class="mb-10">
                        <i class="fa-solid fa-earth-americas"></i> {{ villain.universe ? villain.universe.name : 'Loading universe...' }}
                    </h4>
                </div>
            </div>
           
            <div class="cont-text">
                <h2 class="mb-20">{{ villain.name }}</h2>
                <h4 class="mb-30">
                    <strong>Skills:</strong>
                    <ul class="mt-15">
                        <li v-for="skill in villain.skills"> <i class="fa-solid fa-hand-sparkles mb-10 m-icon"></i>{{skill.name}}</li>
                    </ul>
                </h4>
                <h4 class="mb-30">
                    <strong>Services:</strong>
                    <ul class="mt-15">
                        <li v-for="service in villain.services"><i class="fa-solid fa-bell-concierge mb-10 m-icon"></i>{{service.name}}</li>
                    </ul>
                </h4>

                <!-- villain cv -->
                <div class="mb-30">
                    <h4 class="mb-20"><strong>CV:</strong></h4>
                    <h5 v-if="cvExists" class="mb-50">
                        <button @click="showCv = true" class="btn btn-secondary">View CV</button>
                    </h5>
                
                    <span v-else>CV not available for this villain.</span>
                
                    <!-- Modal CV -->
                    <div v-if="showCv" class="modal-overlay mb-10" @click.self="closeCv">
                        <transition name="fade">
                            <div class="modal-content mb-10">
                                <iframe :src="cvUrl" width="100%" height="100%" frameborder="0"></iframe>
                                <div class="modal-actions">
                                    <button @click="downloadCv" class="btn download-btn">Download CV</button>
                                    <button @click="closeCv" class="btn close-btn">Close</button>
                                </div>
                            </div>
                        </transition>
                    </div>
                </div>


                <hr class="mb-20">
                <h4 class="mb-20"><strong>{{villain.name}}'s Reviews</strong></h4>
                <hr class="mb-20">
                <div class="cont-reviews">
                    <div class="review" v-for="review in villain.ratings">
                        <div><strong>{{review.pivot.full_name}}</strong></div>
                        <div><em>{{ formatDate(review.created_at) }}</em></div>
                        <div class="villain-reviews mb-10" v-if="review.value">
                            <span v-for="star in 5" :key="star" class="star">
                            {{ star <= review.value ? '★' : '☆' }} </span>
                        </div>
    
                        <p class="mb-10">
                            {{ review.pivot.content }}
                        </p>
                        <hr class="mb-10">
                    </div>
                </div>
            </div>
        </div>
        <ContactForm :villainData="villain"/>
        <Reviews :villainData="villain"/>
    </div>
            
</template>

<style scoped lang="scss">
@use '../assets/style/generals/variables' as *;
@import '../assets/style/main.scss';


.cont-detail {
    display: flex;
    align-items: flex-start;
    gap: 80px;
    width: 80%;
    margin: 120px auto 40px;

    li {
        list-style-type: none;
        padding: 0;
        line-height: 160%;
    }

    .cont-img {
        width: 400px;
        height: auto;
        padding: 20px;
        border-radius: 20px;
        border: 1px solid $primary;
        background: linear-gradient(45deg, $primary, $secondary,$accent);

        img {
            background-color: white;
            border-radius: 10px;
            width: 100%;
            height: auto;
            aspect-ratio: 4 / 5; 
            object-fit: cover;
            object-position: top;
        }
    }

    .cont-text {
        flex-grow: 1;

        .cont-reviews {
            height: 200px;
            overflow-y: auto;
        }
    }

    .fa-solid {
        color: $primary;
        margin-right: 20px;
    }

    .m-icon {
        margin-left: 20px;
    }

    h2 {
        font-size: 50px;
        color: $primary;
        margin-bottom: 5px;
    }

    h4,
    h5 {
        font-weight: 200;
    }

    h4 {
        font-size: 20px;
    }

    h5 {
        font-size: 16px;
    }

    .mt-15 {
        margin-top: 15px;
    }

    .mb-10 {
        margin-bottom: 10px;
    }

    .mb-20 {
        margin-bottom: 20px;
    } 

    .mb-30 {
        margin-bottom: 30px;
    }

    .mb-40 {
        margin-bottom: 40px;
    }

    .mb-50 {
        margin-bottom: 50px;
    }

    strong {
        color: $primary;
    }

    em {
        font-size: 12px;
    }

    // Villaincv
    .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
    }

    .modal-content {
        background-color: $light;
        padding: 1.5rem;
        width: 80%;
        height: 80%;
        box-shadow: 0 4px 8px rgba($black, 0.3);
        border-radius: 0.8rem;
        position: relative;
        animation: fadeIn 0.6s ease-in-out;
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: scale(0.3);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }

    .modal-actions {
        display: flex;
        justify-content: space-between;
        margin-top: 1.5rem;
    }

    .download-btn {
        background-color: $success;
        color: $light;

        &:hover {
            background-color: lighten($success, 10%);
        }
    }

    .close-btn {
        background-color: $danger;
        color: $light;

        &:hover {
            background-color: lighten($danger, 10%);
        }
    }
}
</style>