<script>
import { store } from '@/store/store';
import axios from 'axios';
export default {
    name: 'Jumbotron',
    props: {
        skills: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            selectSkill: ''
        };
    },
    methods: {
        // Chiamta alle api
        filterBySkill() {
            const params = {};

            if (this.selectSkill) {
                params.skill_id = this.selectSkill;
            }
        },
    }
}
</script>

<template>
    <section class="jumbo">
        <div class="cont-jumbo">
            <h1 class="main-title">FIND YOUR VILLAIN</h1>
        </div>
        <div class="cont-what">
            <div class="under">
                <button class="btn btn-primary"><a class="rule" href="#how-to">HOW TO HIRE A
                        VILLAIN</a></button>
            </div>
            <!-- Search bar -->
            <p class="presentation">Use our search filter to find the perfect villain based on their
                skills, from world domination strategies to doomsday device creation!</p>
            <div class="select_bar">
                <select name="skills" id="skills" v-model="selectSkill" @change="filterBySkill()">
                    <option value="" disabled selected>Select by skills</option>
                    <option v-for="skill in skills" :key="skill.id" :value="skill.id">{{ skill.name
                        }}</option>
                </select>
                <router-link class="btn-primary search"
                             :to="{ name: 'AdvancedResearch', params: { skill: selectSkill } }">Search</router-link>
            </div>
        </div>
    </section>
</template>

<style scoped lang="scss">
@use '../assets/style/generals/variables' as *;
@import '../assets/style/main.scss';

.jumbo {
    height: 600px;
    width: 100%;
    background-image: url('../assets/images/main/jumbo.png');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: 10%;
    position: relative;

    .cont-jumbo {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 80%;
        height: 100%;
        margin: 0 auto;
        font-size: 50px;
        text-align: center;

        .main-title {
            color: white;
            font-weight: bold;
            text-shadow: 1px 1px 10px $clr-brand-primary;
            padding-bottom: 1.5rem;
        }


    }

    .cont-what {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 70%;
        background-color: white;
        padding: 30px 60px;
        border-radius: 15px;
        color: black;
        position: absolute;
        bottom: -25%;
        left: 15%;

        .presentation {
            margin: 2rem auto;
            font-weight: 500;
            font-size: 1.1rem;
            line-height: 1.5rem;
            color: $clr-brand-primary;
        }

        .rule {
            font-size: 1.5rem;
        }
    }

    .select_bar {
        display: flex;
        align-items: center;
        // margin: 110px auto 50px;
        width: 80%;

        select {
            padding: 8px;
            margin-right: 2px;
            border: 1px solid #ced4da;
            border: none;
            border-top-left-radius: 5px;
            border-bottom-left-radius: 5px;
            font-size: 1rem;
            flex: 1;
        }
    }

    .search {
        padding: 6px 16px;
        font-size: 1rem;
        border: solid 2px transparent;
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
        transition: 0.4s ease-in-out;
        cursor: pointer;

        &:hover {
            background-color: $clr-brand-secondary;
            border: 2px solid $clr-brand-primary;
        }
    }
}
</style>