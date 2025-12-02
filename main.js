// ==================== Preloader ===========================

const preloader = document.querySelector(".preloader");

window.addEventListener("load", () => {
  setTimeout(() => {
    preloader.style.opacity = "0";
    preloader.style.transition = "opacity 0.5s ease";
    setTimeout(() => {
      preloader.style.display = "none";
    }, 500);
  }, 1000);
});

// ==================== Fixed Header ===========================

const header = document.querySelector(".header");
const hero = document.querySelector(".hero");

const headerObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        header.classList.add("fixed-bar");
      } else {
        header.classList.remove("fixed-bar");
      }
    });
  },
  {
    rootMargin: "-100px 0px 0px 0px",
  }
);

if (hero) {
  headerObserver.observe(hero);
}

// ==================== Scroll Animations ===========================

const observerOptions = {
  threshold: 0.2,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.animation = `fadeInUp 1s ease forwards ${entry.target.dataset.delay || "0s"}`;
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

const offers = document.querySelectorAll(".offer");
offers.forEach((offer, index) => {
  offer.dataset.delay = `${index * 0.2}s`;
  observer.observe(offer);
});

const services = document.querySelectorAll(".service-item");
services.forEach((service, index) => {
  service.dataset.delay = `${index * 0.1}s`;
  observer.observe(service);
});

// ==================== Testimonial Slider ===========================

const testimonials = document.querySelectorAll(".testimonial-content");
const prevArrow = document.querySelector(".testimonial-navigation .prev");
const nextArrow = document.querySelector(".testimonial-navigation .next");
let currentIndex = 0;
let autoSlideInterval;

function showTestimonial(index) {
  testimonials.forEach((t, i) => {
    t.style.display = i === index ? "block" : "none";
    if (i === index) {
      t.style.animation = "slideInRight 0.5s ease forwards";
    }
  });
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % testimonials.length;
  showTestimonial(currentIndex);
}

function prevSlide() {
  currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
  showTestimonial(currentIndex);
}

function startAutoSlide() {
  autoSlideInterval = setInterval(nextSlide, 5000);
}

function stopAutoSlide() {
  clearInterval(autoSlideInterval);
}

if (nextArrow && prevArrow) {
  nextArrow.addEventListener("click", () => {
    stopAutoSlide();
    nextSlide();
    startAutoSlide();
  });

  prevArrow.addEventListener("click", () => {
    stopAutoSlide();
    prevSlide();
    startAutoSlide();
  });
}

// Initialize
showTestimonial(currentIndex);
startAutoSlide();
