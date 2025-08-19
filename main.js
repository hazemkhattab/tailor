// ==================== animation ===========================

var preloader = document.getElementsByClassName("preloader")[0];
var head = document.querySelector(".hero_content h1");
window.onload = function () {
  setTimeout(function () {
    preloader.style.transition = "opacity 300ms";
    preloader.style.opacity = 0;
    setTimeout(function () {
      preloader.style.display = "none";
    }, 1000);
  }, 1000);
};

// ===================================

var header = document.getElementsByClassName("header")[0];

var offers = document.getElementsByClassName("offer");

var services = document.getElementsByClassName("service-item");

window.onscroll = function () {
  if (scrollY > 440) {
    header.classList.add("fixed-bar");
    offers[0].style.animation = "fadeInUp 1.5s forwards";
    offers[1].style.animation = "fadeInUp 1.5s .4s forwards";
    offers[2].style.animation = "fadeInUp 1.5s .8s forwards";
  } else {
    header.classList.remove("fixed-bar");
  }
  if (scrollY > 2000) {
    services[0].style.animation = "fadeInUp 1s forwards";
    services[1].style.animation = "fadeInUp 1s .2s forwards";
    services[2].style.animation = "fadeInUp 1s .4s forwards";
    services[3].style.animation = "fadeInUp 1s .6s forwards";
  }
};

// =====================================slider========================================

const testimonials = document.querySelectorAll(".testimonial-content");
const prevArrow = document.querySelector(".testimonial-navigation .prev");
const nextArrow = document.querySelector(".testimonial-navigation .next");
let currentIndex = 0;
let autoSlide;

function showTestimonial(index) {
  testimonials.forEach((t, i) => {
    if (i === index) {
      // Prepare next slide
      t.style.display = "block";
      t.style.animation = "slideInRight 0.7s ease forwards";
    } else {
      t.style.display = "none";
    }
  });
}

function goToSlide(newIndex) {
  const current = testimonials[currentIndex];
  const next = testimonials[newIndex];

  // Fade out current slide
  current.style.animation = "fadeOutLeft 0.3s linear forwards";

  // After fade-out finishes, show next slide
  setTimeout(() => {
    current.style.display = "none";
    next.style.display = "block";
    next.style.animation = "slideInRight .5s linear forwards";
    currentIndex = newIndex;
  }, 500);
}

function nextSlide() {
  const newIndex = (currentIndex + 1) % testimonials.length;
  goToSlide(newIndex);
}

function prevSlide() {
  const newIndex =
    (currentIndex - 1 + testimonials.length) % testimonials.length;
  goToSlide(newIndex);
}

// Auto-slide every 5s
autoSlide = setInterval(nextSlide, 5000);

// Controls
nextArrow.addEventListener("click", () => {
  clearInterval(autoSlide);
  nextSlide();
  autoSlide = setInterval(nextSlide, 5000);
});

prevArrow.addEventListener("click", () => {
  clearInterval(autoSlide);
  prevSlide();
  autoSlide = setInterval(nextSlide, 5000);
});

// Show first slide
showTestimonial(currentIndex);
