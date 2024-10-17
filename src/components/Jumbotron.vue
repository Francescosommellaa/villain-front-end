<script>
export default {
    name: 'Jumbotron'
}
</script>

<template>
    <section class="jumbo">
        <div class="cont-jumbo">
            <h1 class="main-title">FIND YOUR VILLAIN</h1>
            <a href="#">Hire a Villain</a>
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
.jumbo {
    height: 400px;
    width: 100%;
    background-image: url('../assets/img/jumbo.webp');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: 10%;
    position: relative;

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
        }

        a {
            font-size: 20px;
            text-decoration: none;
            padding: 10px 25px;
            border-radius: 5px;
            background-color: purple;
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
            color: purple;
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