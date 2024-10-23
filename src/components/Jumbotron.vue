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
                <div class="under">
                    <button class="btn btn-primary"><a href="#">Hire a Villain</a></button>
                </div>
        </div>
        <div class="cont-what">
        <!-- Search bar -->
            <div class="select_bar">
                <select name="skills" id="skills" v-model="selectSkill" @change="filterBySkill()">
                    <option value="" disabled selected>Select by skills</option>
                    <option v-for="skill in skills" :key="skill.id" :value="skill.id">{{ skill.name }}</option>
                </select>
            
                <router-link class="btn-primary" :to="{ name: 'AdvancedResearch', params: { skill: selectSkill } }">Search</router-link>
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
            text-shadow: 1px 1px 10px $primary;
            padding-bottom: 1.5rem;
        }
        a {
            font-size: 1.5rem;
        }

    }

    .cont-what {
        width: 80%;
        background-color: white;
        padding: 30px 60px;
        border-radius: 15px;
        color: black;
        position: absolute;
        bottom: -20%;
        left: 10%;

        h4 {
            font-size: 30px;
            font-weight: bold;
            color: $primary;
            font-weight: 600;
            margin-bottom: 20px;
        }

        p {
            font-size: 16px;
            line-height: 150%;
        }
    } 
    .select_bar {
    display: flex;
    align-items: center;
    margin: 120px auto;
    width: 80%;
    select {
        padding: 8px;
        border: 1px solid #ced4da;
        border: none;
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
        font-size: 1rem;
        flex: 1;
    }
    button {
        padding: 9px 18px;
        border: 2px trasparent;
        border-radius: 3px;
        background-color: $light;
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
        transition: box-shadow 0.4s ease-in-out;
        cursor: pointer;
        transition:  0.4s ease;

        &:hover {
            background-color: $secondary;
            border: 2px solid $primary;
        }
    }
    
}
}
</style>