<script>
export default {
    name: 'Jumbotron'
}
</script>

<template>
    <section class="jumbo">
        <div class="cont-jumbo">
            <h1 class="main-title">FIND YOUR VILLAIN</h1>
            <a href="#" class="btn btn-primary">Hire a Villain</a>
        </div>
        <div class="cont-what">
            <h4>WHAT ?</h4>
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
    height: 450px;
    width: 100%;
    background-image: url('../assets/images/main/jumbo.webp');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: 10%;
    position: relative;
    margin-bottom: 150px;

    .cont-jumbo {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 30px;
        width: 80%;
        height: 100%;
        margin: 0 auto;
        font-size: 50px;
        text-align: center;

        .main-title,
        a {
            color: white;
            font-weight: bold;
        }

        a {
            font-size: 18px;
            text-decoration: none;
            padding: 10px 25px;
            border-radius: 5px;
            background-color: $primary;
        }
    }

    .cont-what {
        width: 80%;
        background-color: white;
        padding: 30px 60px;
        border-radius: 15px;
        color: black;
        position: absolute;
        bottom: -25%;
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