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
    background-color: $clr-neutral-dkst;
    color: $clr-neutral-ltst;
    width: 100%;
    padding: 3rem 0;

    section {
        width: 80%;
        margin: 0 auto;

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

                @media (max-width: 990px) {
                    flex-basis: 100%;
                }
            }

            nav {
                flex: 0 0 calc(25% - 2rem);

                @media (max-width: 990px) {
                    flex-basis: calc(50% - 1rem);
                }

                @media (max-width: 420px) {
                    flex-basis: 100%;
                }

                .link-list {
                    flex-direction: column;

                    .link {
                        transition: color 0.3s;

                        &:hover {
                            color: $clr-brand-secondary;

                        }
                    }
                }
            }

            .socials {
                text-align: right;
                flex: 0 0 calc(25% - 1rem);

                @media (max-width: 990px) {
                    flex-basis: calc(50% - 1rem);
                }

                @media (max-width: 420px) {
                    flex-basis: 100%;
                    text-align: left;
                }

                .link-list {
                    color: $clr-neutral-ltst;
                    justify-content: flex-end;

                    @media (max-width: 420px) {
                        justify-content: flex-start;
                    }

                    .link {
                        transition: color 0.3s;

                        &:hover {
                            color: $clr-brand-secondary;
                        }
                    }
                }
            }
        }
    }

    .divider {
        width: 80%;
        border: none;
        height: 1px;
        background-color: $clr-neutral-dk;
        margin: 2rem auto;
    }

    .copyright {
        text-align: center;
    }
}
</style>