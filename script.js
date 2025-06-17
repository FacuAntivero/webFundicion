// Navigation Menu
const navMenu = document.getElementById("nav-menu");
const navToggle = document.getElementById("nav-toggle");
const navClose = document.getElementById("nav-close");

// Menu show
if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.add("show-menu");
  });
}

// Menu hidden
if (navClose) {
  navClose.addEventListener("click", () => {
    navMenu.classList.remove("show-menu");
  });
}

// Remove menu mobile
const navLinks = document.querySelectorAll(".nav__link");

function linkAction() {
  const navMenu = document.getElementById("nav-menu");
  navMenu.classList.remove("show-menu");
}
navLinks.forEach((n) => n.addEventListener("click", linkAction));

// Change background header
function scrollHeader() {
  const nav = document.getElementById("header");
  if (this.scrollY >= 80) nav.classList.add("scroll-header");
  else nav.classList.remove("scroll-header");
}
window.addEventListener("scroll", scrollHeader);

// Active link
const sections = document.querySelectorAll("section[id]");

function scrollActive() {
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 50;
    const sectionId = current.getAttribute("id");

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document
        .querySelector(".nav__menu a[href*=" + sectionId + "]")
        .classList.add("active-link");
    } else {
      document
        .querySelector(".nav__menu a[href*=" + sectionId + "]")
        .classList.remove("active-link");
    }
  });
}
window.addEventListener("scroll", scrollActive);

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// WhatsApp functionality
const whatsappBtn = document.getElementById("whatsapp-btn");
const heroWhatsapp = document.getElementById("hero-whatsapp");
const whatsappTooltip = document.getElementById("whatsapp-tooltip");

function openWhatsApp() {
  const phoneNumber = "5492494600615";
  const message =
    "Hola me gustaría solicitar más información para hacer un pedido";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message
  )}`;
  window.open(whatsappUrl, "_blank");
}

if (whatsappBtn) {
  whatsappBtn.addEventListener("click", openWhatsApp);
}

if (heroWhatsapp) {
  heroWhatsapp.addEventListener("click", openWhatsApp);
}

// Show WhatsApp tooltip after 10 seconds
setTimeout(() => {
  if (whatsappTooltip) {
    whatsappTooltip.classList.add("show");

    // Hide tooltip after 5 seconds
    setTimeout(() => {
      whatsappTooltip.classList.remove("show");
    }, 5000);
  }
}, 10000);

// Contact form
const contactForm = document.getElementById("contact-form");
const notification = document.getElementById("notification");

if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Get form data
    const name = this.querySelector('input[name="name"]').value;
    const email = this.querySelector('input[name="email"]').value;
    const message = this.querySelector('textarea[name="message"]').value;

    // Simple validation
    if (name && email && message) {
      // Show success message
      showNotification(
        "¡Mensaje enviado correctamente! Te contactaremos pronto.",
        "success"
      );

      // Reset form
      this.reset();
    } else {
      showNotification("Por favor, completa todos los campos.", "error");
    }
  });
}

// Notification system
function showNotification(message, type) {
  const notificationIcon = notification.querySelector(".notification__icon");
  const notificationText = notification.querySelector(".notification__text");

  // Set content
  notificationText.textContent = message;

  // Set icon and style
  if (type === "success") {
    notificationIcon.className = "notification__icon fas fa-check-circle";
    notification.classList.remove("error");
  } else {
    notificationIcon.className = "notification__icon fas fa-exclamation-circle";
    notification.classList.add("error");
  }

  // Show notification
  notification.classList.add("show");

  // Hide notification after 4 seconds
  setTimeout(() => {
    notification.classList.remove("show");
  }, 4000);
}

// Intersection Observer for animations
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

// Observe elements for animation
document.addEventListener("DOMContentLoaded", () => {
  const animateElements = document.querySelectorAll(
    ".service__card, .value__item"
  );

  animateElements.forEach((el, index) => {
    // Add staggered animation delay
    el.style.transitionDelay = `${index * 0.1}s`;
    observer.observe(el);
  });
});

// Parallax effect for hero background
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const heroBackground = document.querySelector(".hero__bg");

  if (heroBackground && window.innerWidth > 768) {
    const rate = scrolled * -0.5;
    heroBackground.style.transform = `translateY(${rate}px)`;
  }
});

// Loading animation
window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});

// Smooth reveal animations on scroll
function revealOnScroll() {
  const reveals = document.querySelectorAll(
    ".service__card, .contact__card, .value__item"
  );

  reveals.forEach((element) => {
    const windowHeight = window.innerHeight;
    const elementTop = element.getBoundingClientRect().top;
    const elementVisible = 150;

    if (elementTop < windowHeight - elementVisible) {
      element.classList.add("animate");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);

// Initialize animations on page load
document.addEventListener("DOMContentLoaded", () => {
  revealOnScroll();
});

// Optimize scroll performance
let ticking = false;

function updateOnScroll() {
  scrollHeader();
  scrollActive();
  revealOnScroll();
  ticking = false;
}

window.addEventListener("scroll", () => {
  if (!ticking) {
    requestAnimationFrame(updateOnScroll);
    ticking = true;
  }
});
