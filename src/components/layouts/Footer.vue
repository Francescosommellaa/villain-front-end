<template>
    <footer class="footer">
        <section class="connections">
            <div class="mission">
                <h5 class="footer-title">Villfind</h5>
                <p class="footer-text">
                    Find your ideal villain for any evil mission. Connect with the best villains
                    around!
                </p>
            </div>

            <nav>
                <h5 class="footer-title">Useful Links</h5>
                <menu class="link-list">
                    <li>
                        <a href="#" class="link">
                            About Us
                        </a>
                    </li>

                    <li>
                        <a href="#" class="link">
                            Services
                        </a>
                    </li>

                    <li>
                        <a href="#" class="link">
                            Contact
                        </a>
                    </li>

                    <li>
                        <a href="#" class="link">
                            FAQ
                        </a>
                    </li>
                </menu>
            </nav>

            <div class="socials">
                <h5 class="footer-title">Follow Us</h5>
                <menu class="link-list">
                    <li>
                        <a href="#" class="link">
                            <i class="fa-brands fa-facebook fa-lg"></i>
                        </a>
                    </li>

                    <li>
                        <a href="#" class="link">
                            <i class="fa-brands fa-twitter fa-lg"></i>
                        </a>
                    </li>

                    <li>
                        <a href="#" class="link">
                            <i class="fa-brands fa-instagram fa-lg"></i>
                        </a>
                    </li>
                </menu>
            </div>
        </section>

        <hr class="divider">

        <section class="copyright">
            <p>&copy; 2024 Villfind. All rights reserved.</p>
        </section>
    </footer>
</template>

<script>
export default {
    name: "Footer",
};
</script>

<style lang="scss" scoped>
footer {
    width: 80%;

    section {
        &.connections {
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
            gap: 2rem;

            .footer-title {
                text-transform: uppercase;
                margin-bottom: 1.5rem;
                font-size: 1.1rem;
            }

            .link-list {
                display: flex;
                gap: .5rem;
            }

            .mission {
                flex: 0 0 calc(50% - 1rem);

                @media (max-width: 1260px) {
                    flex-basis: 100%;
                }
            }

            nav {
                flex: 0 0 calc(25% - 2rem);

                @media (max-width: 1260px) {
                    flex-basis: calc(50% - 1rem);
                }

                @media (max-width: 880px) {
                    flex-basis: 100%;
                }

                .link-list {
                    flex-direction: column;
                }

                .link {
                    color: $light;
                    text-decoration: none;
                    position: relative;
                    transition: color 0.3s;

                    &::after {
                        content: '';
                        position: absolute;
                        width: 0;
                        height: 2px;
                        bottom: -2px;
                        left: 0;
                        transition: width 0.3s ease;
                    }

                    &:hover {
                        color: $secondary;

                    }
                }
            }

            .socials {
                flex: 0 0 calc(25% - 1rem);

                @media (max-width: 1260px) {
                    flex-basis: calc(50% - 1rem);
                }

                @media (max-width: 880px) {
                    flex-basis: 100%;
                }

                .link {
                    color: $light;
                    margin-right: 1rem;
                    transition: transform 0.3s ease, color 0.3s ease;

                    &:hover {
                        transform: scale(1.3);
                        color: $secondary;
                    }
                }
            }
        }
    }

    .divider {
        border: none;
        height: 1px;
        background-color: rgba(255, 255, 255, 0.2);
        margin: 2rem 0;
    }

    .copyright {
        text-align: center;
    }
}
</style>