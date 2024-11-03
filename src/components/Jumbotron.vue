<script>
import { store } from '@/store/store';
import axios from 'axios';
export default {
    name: 'Jumbotron',


    data() {
        return {
            store,
            skills: [],
            search: '',
            areSkillsLoaded: false,
            isSkillsMenuOpen: false
        }
    },


    methods: {
        handleClickOutside(event) {
            const selector = document.querySelector('.skill-selector');

            if (selector && !selector.contains(event.target.parentNode)) {
                this.isSkillsMenuOpen = false;
            }
        },

        getSkills() {
            return axios.get(store.urlApi + 'skills')
                .then(response => {
                    this.skills = response.data.skills;
                    this.areSkillsLoaded = true;
                })
                .catch(error => {
                    throw error;
                });
        },

        selectSkill(skill) {
            this.search = this.search === skill.name ? '' : skill.name;
            this.isSkillsMenuOpen = false;
        },

        validateLinkQuery() {
            if (this.search.length > 2) {
                const skill = this.skills.find(skill => skill.name.toUpperCase() === this.search.toUpperCase());

                if (skill) {
                    this.$router.push({ name: 'AdvancedResearch', query: { skill: skill.id } });
                }
            }
        }
    },


    mounted() {
        this.getSkills();
        document.addEventListener('click', this.handleClickOutside);
    },


    beforeUnmount() {
        document.removeEventListener('click', this.handleClickOutside);
    }
}
</script>

<template>
    <section class="jumbo">
        <div class="cont-jumbo">
            <h1 class="main-title">FIND YOUR VILLAIN</h1>
        </div>

        <div class="info-container" v-for="data in store.howToHirePresentation">
            <div class="instructions">
                <a class="btn btn-primary" href="#how-to">
                    {{ data.title }}
                </a>
            </div>

            <div class="presentation">
                <p>
                    {{ data.text }}
                </p>
            </div>

            <div class="search">
                <div class="skill-selector">
                    <input type="text" placeholder="Search" v-model="search"
                           @focus="isSkillsMenuOpen = true">

                    <div class="drop-down" v-if="isSkillsMenuOpen && areSkillsLoaded">
                        <menu>
                            <li v-for="skill in skills" :key="skill.id"
                                v-show="skill.name.toUpperCase().includes(search.toUpperCase())"
                                @click="selectSkill(skill)">
                                {{ skill.name }}
                            </li>
                        </menu>
                    </div>
                </div>

                <a class="confirm-button" @click="validateLinkQuery()">
                    <i class="fa-solid fa-magnifying-glass"></i>
                </a>
            </div>
        </div>
    </section>
</template>

<style scoped lang="scss">
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
            color: $clr-neutral-ltst;
            font-weight: bold;
            text-shadow: 0 0 1rem $clr-brand-primary;
            padding-bottom: 6rem;

            @media screen and (max-width:600px) {
                font-size: 4rem;
            }
        }
    }

    .info-container {
        @include display-flex('center', 'center');
        flex-direction: column;
        gap: 2rem;
        padding: 1.5rem;
        margin: 0 auto;
        background-color: $clr-neutral-ltst;
        border-radius: 1rem;
        position: absolute;
        left: 50%;
        transform: translate(-50%, -55%);
        box-shadow: 0 0 1rem $clr-neutral-dkst;

        @media screen and (max-width:600px) {
            width: 90%;
        }

        .instructions {
            text-align: center;

            .btn {
                font-size: 1.5rem;

                @media screen and (max-width:440px) {
                    font-size: 1.4rem;
                }

                @media screen and (max-width:360px) {
                    font-size: 1.2rem;
                }
            }
        }

        .presentation {
            font-weight: 500;
            font-size: 1.1rem;
            line-height: 1.5rem;
            color: $clr-brand-primary;
            max-width: 80%;
            text-align: center;

            @media screen and (max-width:600px) {
                max-width: 100%;
            }

            @media screen and (max-width:440px) {
                font-size: 1.1rem;
            }
        }

        .search {
            @include display-flex('center');
            width: 100%;
            border-radius: .3rem;
            background-color: $clr-brand-primary;

            .skill-selector {
                flex: 1 1;
                position: relative;

                input {
                    appearance: none;
                    border: 0;
                    outline: 0;
                    width: 100%;
                    position: relative;
                    z-index: 11;
                    text-align: left;
                    font-size: $font-size-l;
                    border-radius: .3rem 0 0 .3rem;
                    margin: 2px 0 2px 2px;
                    padding: .25rem 0 .25rem .25rem;
                }

                .drop-down {
                    position: absolute;
                    z-index: 10;
                    top: 0;
                    left: 0;
                    width: calc(100% + 2px);
                    padding-top: calc($font-size-l + .5rem + 8px);
                    background-color: $clr-brand-primary;
                    border-radius: .3rem 0 0 0;

                    menu {
                        max-height: calc(9rem + 14px);
                        overflow-y: auto;
                        padding: 0 1px;
                        scrollbar-color: $clr-neutral-ltst $clr-brand-primary;
                        scrollbar-width: thin;

                        li {
                            overflow: hidden;
                            text-wrap: nowrap;
                            font-weight: 700;
                            padding: .175rem;
                            margin-bottom: 1px;
                            background-color: white;
                            color: $clr-brand-primary;
                            cursor: pointer;

                            &:hover {
                                background-color: $clr-brand-primary;
                                color: white;
                            }
                        }
                    }
                }
            }

            .confirm-button {
                flex: 0 0 3rem;
                display: block;
                @include display-flex('center', 'center');
                flex-direction: column;
                padding: 0 1rem;
                cursor: pointer;
                color: $clr-neutral-ltst;
                border-radius: 0 .3rem .3rem 0;
                background: $grd-brand-dk $clr-brand-secondary;
                transition: background-color .6s ease;

                &:hover {
                    background: transparent;
                }
            }
        }
    }
}
</style>