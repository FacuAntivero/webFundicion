/*==================== MENU SHOW Y HIDE ====================*/
const navMenu = document.getElementById("nav-menu"),
  navToggle = document.getElementById("nav-toggle"),
  navClose = document.getElementById("nav-close");

/*===== MENU SHOW =====*/
if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.add("show-menu");
  });
}

/*===== MENU HIDDEN =====*/
if (navClose) {
  navClose.addEventListener("click", () => {
    navMenu.classList.remove("show-menu");
  });
}

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll(".nav__link");

function linkAction() {
  const navMenu = document.getElementById("nav-menu");
  navMenu.classList.remove("show-menu");
}
navLink.forEach((n) => n.addEventListener("click", linkAction));

/*==================== CHANGE BACKGROUND HEADER ====================*/
function scrollHeader() {
  const nav = document.getElementById("header");
  if (window.scrollY >= 80) nav.classList.add("scroll-header");
  else nav.classList.remove("scroll-header");
}
window.addEventListener("scroll", scrollHeader);

/*==================== SHOW SCROLL UP ====================*/
function scrollUp() {
  const scrollUp = document.getElementById("scroll-up");
  if (scrollUp && window.scrollY >= 560) {
    scrollUp.classList.add("show-scroll");
  } else if (scrollUp) {
    scrollUp.classList.remove("show-scroll");
  }
}
window.addEventListener("scroll", scrollUp);

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll("section[id]");

function scrollActive() {
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 50;
    const sectionId = current.getAttribute("id");
    const navLink = document.querySelector(
      ".nav__menu a[href*=" + sectionId + "]"
    );

    if (navLink) {
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLink.classList.add("active-link");
      } else {
        navLink.classList.remove("active-link");
      }
    }
  });
}
window.addEventListener("scroll", scrollActive);

/*==================== WHATSAPP FUNCTIONALITY ====================*/
const whatsappBtn = document.getElementById("whatsapp-btn");
const heroWhatsappBtn = document.getElementById("hero-whatsapp");
const whatsappTooltip = document.getElementById("whatsapp-tooltip");

// WhatsApp number and message
const whatsappNumber = "+5492494587615";
const whatsappMessage = encodeURIComponent(
  "¡Hola! Me interesa conocer más sobre sus servicios de fundición. ¿Podrían brindarme más información?"
);

// WhatsApp URL
const whatsappURL = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

// Add click events
if (whatsappBtn) {
  whatsappBtn.addEventListener("click", () => {
    window.open(whatsappURL, "_blank");
  });
}

if (heroWhatsappBtn) {
  heroWhatsappBtn.addEventListener("click", () => {
    window.open(whatsappURL, "_blank");
  });
}

// Show tooltip on hover
if (whatsappBtn && whatsappTooltip) {
  let tooltipTimeout;

  whatsappBtn.addEventListener("mouseenter", () => {
    clearTimeout(tooltipTimeout);
    whatsappTooltip.classList.add("show");
  });

  whatsappBtn.addEventListener("mouseleave", () => {
    tooltipTimeout = setTimeout(() => {
      whatsappTooltip.classList.remove("show");
    }, 300);
  });
}

/*==================== NEW CAROUSEL FUNCTIONALITY ====================*/
class ServiceCarousel {
  constructor(carouselElement) {
    this.carousel = carouselElement;
    this.track = this.carousel.querySelector(".carousel__track");
    this.slides = this.carousel.querySelectorAll(".carousel__slide");
    this.prevBtn = this.carousel.querySelector(".carousel__btn--prev");
    this.nextBtn = this.carousel.querySelector(".carousel__btn--next");
    this.indicators = this.carousel.querySelectorAll(".carousel__indicator");

    this.currentSlide = 0;
    this.totalSlides = this.slides.length;

    // Validate elements exist before initializing
    if (this.slides.length > 0 && this.prevBtn && this.nextBtn) {
      this.init();
    }
  }

  init() {
    // Add event listeners
    this.prevBtn.addEventListener("click", () => this.prevSlide());
    this.nextBtn.addEventListener("click", () => this.nextSlide());

    // Add indicator listeners
    this.indicators.forEach((indicator, index) => {
      indicator.addEventListener("click", () => this.goToSlide(index));
    });

    // Auto-play carousel
    this.startAutoPlay();

    // Pause on hover
    this.carousel.addEventListener("mouseenter", () => this.stopAutoPlay());
    this.carousel.addEventListener("mouseleave", () => this.startAutoPlay());
  }

  updateCarousel() {
    // Hide all slides
    this.slides.forEach((slide) => slide.classList.remove("active"));
    this.indicators.forEach((indicator) =>
      indicator.classList.remove("active")
    );

    // Show current slide
    if (this.slides[this.currentSlide]) {
      this.slides[this.currentSlide].classList.add("active");
    }
    if (this.indicators[this.currentSlide]) {
      this.indicators[this.currentSlide].classList.add("active");
    }
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
    this.updateCarousel();
  }

  prevSlide() {
    this.currentSlide =
      (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
    this.updateCarousel();
  }

  goToSlide(slideIndex) {
    if (slideIndex >= 0 && slideIndex < this.totalSlides) {
      this.currentSlide = slideIndex;
      this.updateCarousel();
    }
  }

  startAutoPlay() {
    this.stopAutoPlay(); // Clear any existing interval
    this.autoPlayInterval = setInterval(() => {
      this.nextSlide();
    }, 4000); // Change slide every 4 seconds
  }

  stopAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
      this.autoPlayInterval = null;
    }
  }
}

// Initialize all carousels when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  const carousels = document.querySelectorAll(".service__carousel");
  carousels.forEach((carousel) => {
    try {
      new ServiceCarousel(carousel);
    } catch (error) {
      console.warn("Error initializing carousel:", error);
    }
  });
});

/*==================== SCROLL ANIMATIONS ====================*/
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate");
    }
  });
}, observerOptions);

// Observe service cards and value items when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  const serviceCards = document.querySelectorAll(".service__card");
  const valueItems = document.querySelectorAll(".value__item");

  serviceCards.forEach((card) => {
    if (card) observer.observe(card);
  });

  valueItems.forEach((item) => {
    if (item) observer.observe(item);
  });
});

/*==================== CONTACT FORM ====================*/
document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contact-form");
  const notification = document.getElementById("notification");

  if (contactForm && notification) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      // Get form data
      const formData = new FormData(contactForm);
      const name = formData.get("name");
      const email = formData.get("email");
      const message = formData.get("message");

      // Simple validation
      if (!name || !email || !message) {
        showNotification("Por favor, completa todos los campos", "error");
        return;
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        showNotification("Por favor, ingresa un email válido", "error");
        return;
      }

      // Simulate form submission
      showNotification(
        "¡Mensaje enviado correctamente! Te contactaremos pronto.",
        "success"
      );
      contactForm.reset();
    });
  }

  function showNotification(message, type = "success") {
    if (!notification) return;

    const notificationIcon = notification.querySelector(".notification__icon");
    const notificationText = notification.querySelector(".notification__text");

    if (!notificationIcon || !notificationText) return;

    // Set icon based on type
    if (type === "success") {
      notificationIcon.className = "notification__icon fas fa-check-circle";
      notification.classList.remove("error");
    } else {
      notificationIcon.className =
        "notification__icon fas fa-exclamation-circle";
      notification.classList.add("error");
    }

    notificationText.textContent = message;
    notification.classList.add("show");

    // Hide notification after 5 seconds
    setTimeout(() => {
      notification.classList.remove("show");
    }, 5000);
  }
});

/*==================== SMOOTH SCROLLING ====================*/
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const target = document.querySelector(targetId);

      if (target) {
        const headerHeight = document.getElementById("header").offsetHeight;
        const targetPosition = target.offsetTop - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });
});

/*==================== PERFORMANCE OPTIMIZATIONS ====================*/
// Debounce function for scroll events
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Apply debounce to scroll functions
window.addEventListener("scroll", debounce(scrollHeader, 10));
window.addEventListener("scroll", debounce(scrollUp, 10));
window.addEventListener("scroll", debounce(scrollActive, 10));
