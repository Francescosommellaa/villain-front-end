<script>
import { store } from '@/store/store';
import axios from 'axios';

export default {
    name: 'VillainDetail',
    data(){
        return{
            villain: [],
            slug: '',
            isLoading: true,

        }
    },
    methods:{
        getApiDetails(slug){
            axios.get(store.urlApi+ 'villain/' + slug)
                .then(resp =>{
                    this.villain = resp.data.villain;
                    console.log(this.villain)
                    this.isLoading = false
                })
        }
    },
    mounted(){
        this.slug = this.$route.params.slug
        this.getApiDetails(this.slug)
    }
}
</script>

<template>
    <div class="cont-detail">
    <div class="cont-prova">
        
    </div>
    <div v-if="isLoading">
        
    </div>
        <div v-else class="prova">
            <span>{{console.log(villain)}}</span>
            <div class="cont-img mb-30">
                <img :src="'http://localhost:8000' + villain.image" alt="prova">
            </div>
            <h5 class="mb-20"><strong>{{ villain.name }}</strong></h5 class="mb">
            <h5 class="mb-10"><i class="fa-solid fa-envelope"></i> email@email</h5>
            <h5><i class="fa-solid fa-phone"></i> {{villain.phone}}</h5>
        </div>
       
        <div class="cont-text">
            <h2>{{ villain.name }}</h2>
            <h5 class="mb-40">
                <strong>Universe:</strong> {{ villain.universe ? villain.universe.name : 'Loading universe...' }}
            </h5>
            <h4 class="mb-30">
                <strong>Skills:</strong>
                <ul>
                    <li v-for="skill in villain.skills">{{skill.name}}</li>
                </ul>
            </h4>
            <h4 class="mb-30">
                <strong>Services:</strong>
                <ul>
                    <li v-for="service in villain.services">{{service.name}}</li>
                </ul>
            </h4>
            <h5 class="mb-50"><strong>CV:</strong> Villan cv</h5>

            <hr class="mb-20">
            <h4 class="mb-20"><strong>{{villain.name}}'s Reviews</strong></h4>
            <hr class="mb-20">
            <div class="cont-reviews">
                <div class="review" v-for="review in villain.ratings">
                    <div><strong>{{review.pivot.full_name}}</strong></div>
                    <div class="mb-10"><em>{{ review.created_at }}</em></div>
                    <div class="villain-reviews" v-if="review.value">
                        <span>Stars: </span>
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
    // debug
    // background-color: purple;

    li {
        list-style-type: none;
        padding-left: 30px;
        line-height: 160%;
    }

    .cont-img {
        // flex-grow: 0;
        width: 400px;
        padding: 30px;
        // margin-left: 50px;
        border-radius: 20px;
        // box-shadow: 2px 2px 10px grey;
        background-color: $gray-300;

        img {
            width: 100%;
        }
    }

    .cont-reviews {
        height: 200px;
        overflow-y: auto;
    }

    .fa-solid {
        color: $primary;
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
}
</style>