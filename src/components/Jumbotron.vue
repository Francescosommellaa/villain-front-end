<script>
import { store } from '@/store/store';
import axios from 'axios';
export default {
    name: 'Jumbotron',

    data() {
        return {
            store
        };
    }
}
</script>

<template>
    <section class="jumbo">
        <div class="cont-jumbo">
            <h1 class="main-title">FIND YOUR VILLAIN</h1>
        </div>
        <div class="cont-what" v-for="data in store.howToHirePresentation">
            <div class="under">
                <button class="btn btn-primary"><a class="rule" href="#how-to">
                        {{ data.title }}
                    </a></button>
            </div>

            <p class="presentation">
                {{ data.text }}
            </p>
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
            color: white;
            font-weight: bold;
            text-shadow: 1px 1px 10px $clr-brand-primary;
            padding-bottom: 6rem;
        }


    }

    .cont-what {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin: 0 auto;
        background-color: $clr-neutral-ltst;
        border-radius: 15px;
        position: absolute;
        left: 50%;
        transform: translate(-50%, -50%);
        box-shadow: 0 0 1rem $clr-neutral-dkst;

        .presentation {
            margin: 2rem auto;
            font-weight: 500;
            font-size: 1.1rem;
            line-height: 1.5rem;
            color: $clr-brand-primary;
            padding: 0 4em;
        }

        .under {
            padding: 2rem;
        }

        .rule {
            font-size: 1.5rem;
        }
    }

    p {
        text-align: center;
    }
}

@media screen and (max-width:550px) {
    .jumbo {
        .main-title {
            font-size: 4rem;
        }

        .cont-what {
            display: block;
            width: 90%;

            .under {
                margin: 0 auto;
                padding: 2em 0;

                .rule {
                    @media screen and (max-width:440px) {
                        font-size: 1.4rem;
                    }

                    @media screen and (max-width:360px) {
                        font-size: 1.2rem;
                    }
                }
            }

            .presentation {
                display: inline-block;
                max-height: 200px;

                @media screen and (max-width:440px) {
                    font-size: 1.1rem;
                    margin: 1em auto;
                    padding: 0 2em;
                }

            }
        }
    }
}
</style>