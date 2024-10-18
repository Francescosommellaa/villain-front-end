<script>
export default {
    name: 'VillainDetail'
}
</script>

<template>
    <div class="cont-detail">
        <div class="cont-img">
            <img src="../assets/images/placeholders/frieza.webp" alt="prova">
        </div>
        <div class="cont-text">
            <h2>Frieza</h2>
            <h5 class="mb-40">
                <strong>Universe:</strong> Dragon Ball
            </h5>
            <h4 class="mb-30">
                <strong>Skills:</strong>
                <ul>
                    <li>Blablablabla</li>
                    <li>Blablablabla</li>
                    <li>Blablablabla</li>
                </ul>
            </h4>
            <h4 class="mb-30">
                <strong>Services:</strong>
                <ul>
                    <li>Blablablabla</li>
                    <li>Blablablabla</li>
                    <li>Blablablabla</li>
                </ul>
            </h4>
            <h4 class="mb-50"><strong>CV:</strong> friezacv.pdf</h4>
            <h5 class="mb-20"><strong>CONTACT FRIEZA:</strong></h5 class="mb">
            <h5 class="mb-10">email@email</h5>
            <h5>phone</h5>
        </div>
    </div>
</template>

<style scoped lang="scss">
@use '../assets/style/generals/variables' as *;
@import '../assets/style/main.scss';

.cont-detail {
    display: flex;
    // justify-content: space-between;
    // align-items: center;
    gap: 80px;
    width: 80%;
    margin: 120px auto 40px;
    // debug
    // background-color: purple;
    // height: 300px;

    li {
        list-style-type: none;
        padding-left: 30px;
        line-height: 160%;
    }

    .cont-img {
        flex-grow: 0;
        width: 500px;
        padding: 30px;
        margin-left: 50px;
        border-radius: 20px;
        box-shadow: 2px 2px 10px grey;
        background-color: $gray-300;
        // debug
        // border: 2px solid $primary;

        img {
            width: 100%;
        }
    }

    .cont-text {
        flex-grow: 1;
        // padding: 10px 0;

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
    }
}
</style>