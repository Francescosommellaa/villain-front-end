<script>
import { store } from '@/store/store';
import axios from 'axios';
import ContactForm from "../components/ContactForm.vue";
import ReviewForm from '@/components/ReviewForm.vue';
import Loader from '@/components/common/Loader.vue';

export default {
    name: 'VillainDetail',
    components: {
        ContactForm,
        ReviewForm,
        Loader,
    },
    data() {
        return {
            villain: [],
            slug: '',
            isLoading: true,
            showCv: false,
            cvExists: false,
            cvUrl: '',
            villainName: '',
            newReview: {},
        }
    },
    methods: {
        getApiDetails(slug) {
            axios.get(store.urlApi + 'villain/' + slug)
                .then(resp => {
                    this.villain = resp.data.villain;
                    this.checkCvExists();
                    this.isLoading = false;
                })
                .catch(err => {
                    console.log(err)
                });
        },

        handleReviewSent(review) {
            this.newReview = review;
        },

        formatDate(dateString) {
            const date = new Date(dateString);

            const formattedDate = date.toLocaleDateString('it-IT', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit'
            });

            return `${formattedDate}`;
        },

        checkCvExists() {
            if (!this.villain.cv || this.villain.cv === null) {
                this.cvExists = false;
            } else {
                this.cvExists = true;
                this.cvUrl = `http://localhost:8000${this.villain.cv}`;
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
    mounted() {
        this.villainName = this.$route.params.villainName;
        this.slug = this.$route.params.slug;
        this.getApiDetails(this.slug);
    }
}
</script>


<template>
    <div class="loader" v-if="isLoading">
        <Loader />
    </div>
    <div v-else>
        <div class="cont-detail">
            <h2 class="mb-20">{{ villain.name }}</h2>
            <div class="cont-left">
                <div class="cont-img mb-30">
                    <img :src="'http://localhost:8000' + villain.image" alt="prova">
                </div>

                <div class="cont-reviews">
                    <h4 class="mb-20"><strong>Contact:</strong></h4>
                    <h4 class="mb-10"><i class="fa-solid fa-envelope"></i> email@email</h4>
                    <h4 class="mb-10"><i class="fa-solid fa-phone"></i> {{ villain.phone }}</h4>
                    <h4 class="mb-10">
                        <i class="fa-solid fa-earth-americas"></i> {{ villain.universe ?
                            villain.universe.name : 'Loading universe...' }}
                    </h4>
                </div>
                <div class="call-to-action">
                    <a href="#contact-villain" class="btn btn-primary">Message</a>
                    <a href="#review-villain" class="btn btn-gold">Review</a>
                </div>
            </div>

            <div class="cont-text">
                <h2 class="mb-20">{{ villain.name }}</h2>
                <div class="wrapper-text">
                    <div class="mb-30">
                        <h3>Skills:</h3>
                        <ul class="mt-15">
                            <li v-for="skill in villain.skills"> <i
                                   class="fa-solid fa-hand-sparkles mb-10 m-icon"></i>{{ skill.name }}
                            </li>
                        </ul>
                    </div>
                    <div class="mb-30">
                        <h3>Services:</h3>
                        <ul class="mt-15">
                            <li v-for="service in villain.services"><i
                                   class="fa-solid fa-bell-concierge mb-10 m-icon"></i>{{ service.name
                                }}
                            </li>
                        </ul>
                    </div>
                </div>

                <!-- villain cv -->
                <div class="mb-30">
                    <h3 class="mb-20"><strong>CV:</strong></h3>

                    <h5 v-if="cvExists" class="mb-50">
                        <button @click="showCv = true" class="btn btn-secondary">View CV</button>
                    </h5>

                    <span v-else>CV not available for this villain.</span>

                    <!-- Modal CV -->
                    <div v-if="showCv" class="modal-overlay" @click.self="closeCv">
                        <transition name="fade">
                            <div class="modal-content">
                                <iframe :src="cvUrl" width="100%" height="100%"
                                        frameborder="0"></iframe>
                                <div class="modal-actions">
                                    <button @click="downloadCv" class="btn download-btn">Download
                                        CV</button>
                                    <button @click="closeCv" class="btn close-btn">Close</button>
                                </div>
                            </div>
                        </transition>
                    </div>
                </div>

                <span>{{ console.log(villain) }}</span>
                <hr class="mb-20">
                <h4 class="mb-20"><strong>{{ villain.name }}'s Reviews</strong></h4>
                <hr class="mb-20">
                <div class="cont-reviews">
                    <div v-if="Object.keys(newReview).length !== 0">
                        <div class="review">
                            <div><strong>{{ newReview.full_name }}</strong></div>
                            <div><em>{{ formatDate(newReview.created_at) }}</em></div>
                            <div class="villain-reviews mb-10">
                                <span v-for="star in 5" :key="star" class="star">
                                    {{ star <= newReview.rating_id ? '★' : '☆' }} </span>
                            </div>

                            <p class="mb-10">
                                {{ newReview.content }}
                            </p>
                            <hr class="mb-10">
                        </div>
                    </div>
                    <div class="review" v-for="review in villain.ratings">
                        <div><strong>{{ review.pivot.full_name }}</strong></div>
                        <div><em>{{ formatDate(review.pivot.created_at) }}</em></div>
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
        <ContactForm :villainData="villain" id="contact-villain" />
        <ReviewForm :villainData="villain" @review-sent="handleReviewSent" id="review-villain"/>
    </div>

</template>

<style scoped lang="scss">
.cont-detail {
    display: flex;
    align-items: flex-start;
    gap: 80px;
    width: 80%;
    margin: 120px auto 40px;
    &>h2{
        display: none;
    }
    .call-to-action{
        display: none
    }
    li {
        list-style-type: none;
        padding: 0;
        line-height: 160%;
    }

    h3 {
        background: $grd-brand-lt;
        background-clip: text;
        color: transparent;
    }

    .cont-img {
        width: 100%;
        max-width: 560px;
        margin: 0 auto;
        height: auto;
        padding: 20px;
        border-radius: 20px;
        border: 1px solid $clr-brand-primary;
        background: $grd-brand-dk;

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

    .cont-left {
        width: 60%;
    }

    .cont-text {
        flex-grow: 1;

        h2 {
        font-size: 50px;
        @include text-clipping;
        margin-bottom: 5px;
    }

        .cont-reviews {
            height: 200px;
            overflow-y: auto;

            span{
                @include text-clipping-gold;
            }
        }
    }

    .fa-solid {
        color: $clr-brand-primary;
        margin-right: 20px;
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

    .m-icon {
        margin-left: 20px;
    }

    .mt-15 {
        margin-top: $margin-top-15;
    }

    .mb-10 {
        margin-bottom: $margin-bottom-10;
    }

    .mb-20 {
        margin-bottom: $margin-bottom-20;
    }

    .mb-30 {
        margin-bottom: $margin-bottom-30;
    }

    .mb-40 {
        margin-bottom: $margin-bottom-40;
    }

    .mb-50 {
        margin-bottom: $margin-bottom-50;
    }

    strong {
        color: $clr-brand-primary;
    }

    em {
        font-size: 12;
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
        background-color: $clr-neutral-ltst;
        padding: 1.5rem 1.5rem 5rem 1.5rem;
        width: 80%;
        height: 80%;
        box-shadow: 0 4px 12px rgba($clr-neutral-dkst, 0.3);
        border-radius: 0.5rem;
        position: relative;
        animation: fadeIn 0.5s ease-in-out;
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
        padding: 1rem 0;
    }

    .download-btn {
        background-color: $clr-utility-success;
        color: $clr-neutral-ltst;

        &:hover {
            background-color: lighten($clr-utility-success, 10%);
        }
    }

    .close-btn {
        background-color: $clr-utility-danger;
        color: $clr-neutral-ltst;

        &:hover {
            background-color: lighten($clr-utility-danger, 10%);
        }
    }
}

@media screen and (max-width:786px) {
    .cont-detail {
        display: block;
        width: 95%;
        &>h2{
            @include text-clipping;
            width: 100%;
            text-align: center;
            font-size: 3rem;
            @media screen and (max-width:560px){
                    font-size: 2rem;
                }
        }
        .call-to-action{
            margin: 2em auto;
            display: flex;
            justify-content: space-evenly;
            align-items: center;
            padding-bottom: 10px;
            border-bottom: 1px solid purple;
        }
        .cont-left {
            width: 90%;
            margin: 0 auto;
            text-align: center;
            padding: 0;

            .cont-img {
                padding: 10px;

            }
        }


        .cont-text {
            margin: 25px auto 0px auto;
            width: 90%;
            h2 {
                display: none;
            }

            .wrapper-text{
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
                @media screen and (max-width:560px){
                    flex-wrap: wrap;
                }
            }
        }
    }
}
</style>