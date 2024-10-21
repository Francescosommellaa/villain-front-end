<script>
export default {
    name: 'Jumbotron'
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
            <h4>WHAT?</h4>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.<br>
                Sint quae molestias optio id ea dolorum sit et
                saepe explicabo, officia distinctio voluptates exercitationem atque consequatur, magni numquam assumenda
                enim. Ab.
            </p>
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
}
</style>