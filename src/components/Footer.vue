<template>
  <footer class="bg-dark text-white py-4 mt-auto">
    <div class="container">
        <div class="row text-center text-md-start">
            <div class="col-md-4 mb-4">
                <h5 class="text-uppercase mb-3">VillainConnect</h5>
                <p class="footer-text">
                    Trova il tuo villain ideale per qualsiasi missione malvagia. Connettiti con i migliori villain in circolazione!
                </p>
            </div>
            <div class="col-md-4 mb-4">
                <h5 class="text-uppercase mb-3">Link utili</h5>
                <ul class="list-unstyled footer-text">
                    <li><a href="#" class="text-white link-custom">Chi siamo</a></li>
                    <li><a href="#" class="text-white link-custom">Servizi</a></li>
                    <li><a href="#" class="text-white link-custom">Contatti</a></li>
                    <li><a href="#" class="text-white link-custom">FAQ</a></li>
                </ul>
            </div>
            <div class="col-md-4 mb-4 text-center text-md-start">
                <h5 class="text-uppercase mb-3">Seguici</h5>
                <div class="d-flex justify-content-center justify-content-md-start">
                    <a href="#" class="text-white me-3 social-icon">
                        <i class="fa-brands fa-facebook fa-lg"></i>
                    </a>
                    <a href="#" class="text-white me-3 social-icon">
                        <i class="fa-brands fa-twitter fa-lg"></i>
                    </a>
                    <a href="#" class="text-white me-3 social-icon">
                        <i class="fa-brands fa-instagram fa-lg"></i>
                    </a>
                </div>
            </div>
        </div>
        <hr class="border-light">
        <div class="row">
            <div class="col-12 text-center">
                <p class="footer-text mb-0">&copy; 2024 VillainConnect. Tutti i diritti riservati.</p>
            </div>
        </div>
    </div>
</footer>

</template>

<script>
export default {
  name: "Footer",
};
</script>

<style>
    footer a {
        text-decoration: none;
        position: relative;
        transition: all 0.3s ease;
    }

    footer a::after {
        content: '';
        position: absolute;
        width: 0;
        height: 2px;
        bottom: -2px;
        left: 0;
        background-color: #0d6efd;
        transition: width 0.3s ease;
    }

    footer a:hover::after {
        width: 100%;
    }

    footer a:hover {
        color: #0d6efd;
    }

    .social-icon {
        transition: transform 0.3s ease, color 0.3s ease;
    }

    .social-icon:hover {
        transform: scale(1.3);
        color: #0d6efd;
    }

    footer hr {
        opacity: 0.2;
    }

    footer .container {
        max-width: 1140px;
    }

    footer {
        position: relative;
        bottom: 0;
        width: 100%;
    }

    .footer-text {
        color: #cccccc !important;
    }

    @media (max-width: 768px) {
        footer .row {
            text-align: center;
        }
        footer .d-flex {
            justify-content: center;
        }
    }
</style>