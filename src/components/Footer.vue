<template>
    <footer class="footer">
      <div class="footer-container">
        <div class="footer-row">
          <div class="footer-column">
            <h5 class="footer-title">VillainConnect</h5>
            <p class="footer-text">
              Find your ideal villain for any evil mission. Connect with the best villains around!
            </p>
          </div>
          <div class="footer-column">
            <h5 class="footer-title">Useful Links</h5>
            <ul class="footer-list">
              <li><a href="#" class="footer-link">About Us</a></li>
              <li><a href="#" class="footer-link">Services</a></li>
              <li><a href="#" class="footer-link">Contact</a></li>
              <li><a href="#" class="footer-link">FAQ</a></li>
            </ul>
          </div>
          <div class="footer-column">
            <h5 class="footer-title">Follow Us</h5>
            <div class="footer-social">
              <a href="#" class="social-icon">
                <i class="fa-brands fa-facebook fa-lg"></i>
              </a>
              <a href="#" class="social-icon">
                <i class="fa-brands fa-twitter fa-lg"></i>
              </a>
              <a href="#" class="social-icon">
                <i class="fa-brands fa-instagram fa-lg"></i>
              </a>
            </div>
          </div>
        </div>
        <hr class="footer-divider">
        <div class="footer-row center">
          <p class="footer-text">&copy; 2024 VillainConnect. All rights reserved.</p>
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
footer {
  background-color: black;
  color: white;
  padding: 2rem 0;
  width: 100%;
}

.footer-container {
  max-width: 1140px;
  margin: 0 auto;
  padding: 0 1rem;
  text-align: center; 
}

.footer-row {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.footer-column {
  flex: 1;
  margin-bottom: 1rem;
  min-width: 200px;
}

.footer-title {
  text-transform: uppercase;
  margin-bottom: 1rem;
}

.footer-list {
  padding: 0;
}

.footer-link {
  color: #fff;
  text-decoration: none;
  position: relative;
  transition: color 0.3s;
}

.footer-link::after {
  content: '';
  position: absolute;
  width: 0;
  height: 2px;
  bottom: -2px;
  left: 0;
  background-color: violet;
  transition: width 0.3s ease;
}

.footer-link:hover::after {
  width: 100%;
}

.footer-link:hover {
  color: violet;
}

.social-icon {
  color: #fff;
  margin-right: 1rem;
  transition: transform 0.3s ease, color 0.3s ease;
}

.social-icon:hover {
  transform: scale(1.3);
  color: violet;
}

.footer-divider {
  border: none;
  height: 1px;
  background-color: rgba(255, 255, 255, 0.2);
  margin: 1.5rem 0;
}

.center {
  text-align: center;
}

@media (max-width: 768px) {
  .footer-row {
    flex-direction: column;
  }

  .social-icon {
    margin: 0.5rem;
  }
}
</style>