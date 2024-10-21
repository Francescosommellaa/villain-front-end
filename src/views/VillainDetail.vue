<script>
export default {
    name: 'VillainDetail',
}
</script>

<template>
    <div class="cont-detail">
    <div class="cont-prova">
        
    </div>
        <div class="prova">
            <div class="cont-img mb-30">
                <img src="../assets/images/placeholders/bellatrix.webp" alt="prova">
            </div>
            <h5 class="mb-20"><strong>CONTACT BELLATRIX:</strong></h5 class="mb">
            <h5 class="mb-10"><i class="fa-solid fa-envelope"></i> email@email</h5>
            <h5><i class="fa-solid fa-phone"></i> 123456789</h5>
        </div>
       
        <div class="cont-text">
            <h2>BELLATRIX</h2>
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
            <h5 class="mb-50"><strong>CV:</strong> bellatrixcv.pdf</h5>

            <hr class="mb-20">
            <h4 class="mb-20"><strong>Bellatrix's Reviews</strong></h4>
            <hr class="mb-20">
            <div class="cont-reviews">
                <div class="review">
                    <div><strong>Name</strong></div>
                    <div class="mb-10"><em>30/10/24 19.30</em></div>
                    <div class="mb-10">STELLE</div>
                    <p class="mb-10">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi omnis incidunt, et ex sit vel ducimus dolorum suscipit atque aliquid ipsa deserunt assumenda magnam distinctio illum velit, nulla ad temporibus!
                    </p>
                    <hr class="mb-10">
                </div>
                <div class="review">
                    <div><strong>Name</strong></div>
                    <div class="mb-10"><em>30/10/24 19.30</em></div>
                    <div class="mb-10">STELLE</div>
                    <p class="mb-10">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi omnis incidunt, et ex sit vel ducimus dolorum suscipit atque aliquid ipsa deserunt assumenda magnam distinctio illum velit, nulla ad temporibus!
                    </p>
                    <hr class="mb-10">
                </div>
                <div class="review">
                    <div><strong>Name</strong></div>
                    <div class="mb-10"><em>30/10/24 19.30</em></div>
                    <div class="mb-10">STELLE</div>
                    <p class="mb-10">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi omnis incidunt, et ex sit vel ducimus dolorum suscipit atque aliquid ipsa deserunt assumenda magnam distinctio illum velit, nulla ad temporibus!
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