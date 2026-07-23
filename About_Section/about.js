/*=========================================================
      Counter Animation + Scroll Reveal
=========================================================*/

/*=========================================================
                COUNTER ANIMATION
=========================================================*/

const counters = document.querySelectorAll(".counter");

const counterObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const counter = entry.target;

      const target = Number(counter.dataset.target);

      const speed = 200;

      let count = 0;

      const increment = Math.ceil(target / speed);

      function updateCounter() {
        count += increment;

        if (count >= target) {
          counter.innerText = target + "+";
        } else {
          counter.innerText = count;

          requestAnimationFrame(updateCounter);
        }
      }

      updateCounter();

      observer.unobserve(counter);
    });
  },

  {
    threshold: 0.5,
  },
);

counters.forEach((counter) => {
  counterObserver.observe(counter);
});

/*=========================================================
                SCROLL REVEAL
=========================================================*/

const revealElements = document.querySelectorAll(
  `
.hero-left,
.hero-right,
.about-image,
.about-content,
.mission-card,
.achievement-card,
.choose-card,
.trainer-card,
.timeline-item,
.testimonial-card,
.gallery-item,
.faq-item,
.cta-content,
.footer-box
`,
);

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },

  {
    threshold: 0.15,

    rootMargin: "0px 0px -50px 0px",
  },
);

revealElements.forEach((el) => {
  el.classList.add("hidden");

  revealObserver.observe(el);
});

/*=========================================================
        OPTIONAL DIFFERENT REVEAL DIRECTIONS
=========================================================*/

document.querySelectorAll(".timeline-item.left").forEach((item) => {
  item.classList.add("slide-left");
});

document.querySelectorAll(".timeline-item.right").forEach((item) => {
  item.classList.add("slide-right");
});

document.querySelectorAll(".trainer-card").forEach((card) => {
  card.classList.add("zoom-in");
});

document.querySelectorAll(".gallery-item").forEach((card) => {
  card.classList.add("fade-up");
});

/*=========================================================
        ADDITIONAL STAGGER ANIMATION
=========================================================*/

const staggerItems = document.querySelectorAll(
  ".achievement-card,.choose-card,.trainer-card",
);

staggerItems.forEach((item, index) => {
  item.style.transitionDelay = `${index * 120}ms`;
});

/*=========================================================
        PARALLAX HERO (Light Effect)
=========================================================*/

window.addEventListener("scroll", () => {
  const hero = document.querySelector(".hero");

  const scrolled = window.pageYOffset;

  if (hero) {
    hero.style.backgroundPositionY = `${scrolled * 0.4}px`;
  }
});

/*==================================================
        YVR GYM ABOUT PAGE
                PART 8A-2
==================================================*/

document.addEventListener("DOMContentLoaded", () => {
  /*==========================================
            SMOOTH SCROLL
    ==========================================*/

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const target = document.querySelector(this.getAttribute("href"));

      if (!target) return;

      e.preventDefault();

      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  });

  /*==========================================
            ACTIVE NAVBAR
    ==========================================*/

  const sections = document.querySelectorAll("section[id]");

  const navLinks = document.querySelectorAll("#nav_section nav a");

  function activeNavigation() {
    let scrollY = window.scrollY;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 120;

      const sectionHeight = section.offsetHeight;

      const id = section.getAttribute("id");

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove("active");

          if (
            link.getAttribute("href") === "#" + id ||
            link.getAttribute("href").includes(id)
          ) {
            link.classList.add("active");
          }
        });
      }
    });
  }

  window.addEventListener("scroll", activeNavigation);

  /*==========================================
            STICKY NAVBAR
    ==========================================*/

  function stickyNavbar() {
    const navbar = document.querySelector("#nav_section nav");

    if (!navbar) return;

    if (window.scrollY > 70) {
      navbar.classList.add("sticky");
    } else {
      navbar.classList.remove("sticky");
    }
  }

  window.addEventListener("scroll", stickyNavbar);

  /*==========================================
            NAVBAR SHADOW
    ==========================================*/

  function navbarShadow() {
    const navbar = document.querySelector("#nav_section nav");

    if (!navbar) return;

    if (window.scrollY > 20) {
      navbar.style.boxShadow = "0 12px 35px rgba(0,0,0,.35)";

      navbar.style.backdropFilter = "blur(18px)";

      navbar.style.background = "rgba(10,10,10,.85)";
    } else {
      navbar.style.boxShadow = "none";

      navbar.style.background = "transparent";
    }
  }

  window.addEventListener("scroll", navbarShadow);

  /*==========================================
        MOBILE MENU AUTO CLOSE
    ==========================================*/

  document.querySelectorAll("#navLinks a").forEach((link) => {
    link.addEventListener("click", () => {
      const nav = document.getElementById("navLinks");

      if (nav) {
        nav.classList.remove("active");
      }
    });
  });

  /*==========================================
            SCROLL PROGRESS BAR
    ==========================================*/

  const progress = document.createElement("div");

  progress.className = "progress-bar";

  document.body.appendChild(progress);

  window.addEventListener("scroll", () => {
    const totalHeight =
      document.documentElement.scrollHeight - window.innerHeight;

    const progressHeight = (window.pageYOffset / totalHeight) * 100;

    progress.style.width = progressHeight + "%";
  });

  /*==========================================
            INITIALIZATION
    ==========================================*/

  activeNavigation();

  stickyNavbar();

  navbarShadow();
});
/*==================================================
        TESTIMONIAL SLIDER CORE
        Previous • Next • Auto Play
==================================================*/

const testimonials = document.querySelectorAll(".testimonial-card");

const nextBtn = document.getElementById("nextTestimonial");

const prevBtn = document.getElementById("prevTestimonial");

let currentSlide = 0;

let autoSlide;

/*=============================================
        SHOW TESTIMONIAL
=============================================*/

function showTestimonial(index) {
  testimonials.forEach((card) => {
    card.classList.remove("active");
  });

  testimonials[index].classList.add("active");
}

/*=============================================
        NEXT
=============================================*/

function nextTestimonial() {
  currentSlide++;

  if (currentSlide >= testimonials.length) {
    currentSlide = 0;
  }

  showTestimonial(currentSlide);
}

/*=============================================
        PREVIOUS
=============================================*/

function previousTestimonial() {
  currentSlide--;

  if (currentSlide < 0) {
    currentSlide = testimonials.length - 1;
  }

  showTestimonial(currentSlide);
}

/*=============================================
        BUTTON EVENTS
=============================================*/

if (nextBtn) {
  nextBtn.addEventListener(
    "click",

    () => {
      nextTestimonial();

      restartAutoPlay();
    },
  );
}

if (prevBtn) {
  prevBtn.addEventListener(
    "click",

    () => {
      previousTestimonial();

      restartAutoPlay();
    },
  );
}

/*=============================================
        AUTO PLAY
=============================================*/

function startAutoPlay() {
  autoSlide = setInterval(() => {
    nextTestimonial();
  }, 5000);
}

/*=============================================
        STOP
=============================================*/

function stopAutoPlay() {
  clearInterval(autoSlide);
}

/*=============================================
        RESTART
=============================================*/

function restartAutoPlay() {
  stopAutoPlay();

  startAutoPlay();
}

/*=============================================
        INITIALIZE
=============================================*/

showTestimonial(currentSlide);

startAutoPlay();
/*==================================================
        TESTIMONIAL DOTS NAVIGATION
==================================================*/

const slider = document.querySelector(".testimonial-slider");

// Create dots container
const dotsContainer = document.createElement("div");

dotsContainer.className = "testimonial-dots";

// Append below slider
slider.after(dotsContainer);

// Store dots
let dots = [];

/*==================================================
        CREATE DOTS
==================================================*/

function createDots() {
  testimonials.forEach((_, index) => {
    const dot = document.createElement("span");

    dot.classList.add("dot");

    if (index === currentSlide) {
      dot.classList.add("active-dot");
    }

    dot.addEventListener("click", () => {
      currentSlide = index;

      showTestimonial(currentSlide);

      updateDots();

      restartAutoPlay();
    });

    dotsContainer.appendChild(dot);

    dots.push(dot);
  });
}

/*==================================================
        UPDATE ACTIVE DOT
==================================================*/

function updateDots() {
  dots.forEach((dot) => {
    dot.classList.remove("active-dot");
  });

  dots[currentSlide].classList.add("active-dot");
}

/*==================================================
        OVERRIDE SHOW FUNCTION
==================================================*/

const originalShow = showTestimonial;

showTestimonial = function (index) {
  originalShow(index);

  updateDots();
};

/*==================================================
        INITIALIZE DOTS
==================================================*/

createDots();

updateDots();
/*==================================================
        PAUSE ON HOVER
==================================================*/

const testimonialSection = document.querySelector(".testimonial-slider");

if (testimonialSection) {
  testimonialSection.addEventListener("mouseenter", () => {
    stopAutoPlay();
  });

  testimonialSection.addEventListener("mouseleave", () => {
    startAutoPlay();
  });
}

/*==================================================
        TOUCH SWIPE
==================================================*/

let touchStartX = 0;

let touchEndX = 0;

const swipeArea = document.querySelector(".testimonial-slider");

if (swipeArea) {
  swipeArea.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });

  swipeArea.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;

    handleSwipe();
  });
}

function handleSwipe() {
  const distance = touchStartX - touchEndX;

  const minimumSwipeDistance = 50;

  if (distance > minimumSwipeDistance) {
    nextTestimonial();

    restartAutoPlay();
  } else if (distance < -minimumSwipeDistance) {
    previousTestimonial();

    restartAutoPlay();
  }
}

/*==================================================
        KEYBOARD SUPPORT
==================================================*/

document.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowRight":
      nextTestimonial();

      restartAutoPlay();

      break;

    case "ArrowLeft":
      previousTestimonial();

      restartAutoPlay();

      break;

    default:
      break;
  }
});

/*==================================================
        PAGE VISIBILITY
==================================================*/

document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    stopAutoPlay();
  } else {
    restartAutoPlay();
  }
});

/*==================================================
        WINDOW FOCUS
==================================================*/

window.addEventListener("blur", () => {
  stopAutoPlay();
});

window.addEventListener("focus", () => {
  restartAutoPlay();
});

/*==================================================
        FINAL INITIALIZATION
==================================================*/

document.addEventListener("DOMContentLoaded", () => {
  if (typeof createDots === "function") {
    if (document.querySelectorAll(".dot").length === 0) {
      createDots();
    }
  }

  showTestimonial(currentSlide);

  restartAutoPlay();
});
/*==================================================
        FAQ ACCORDION
==================================================*/

const faqItems = document.querySelectorAll(".faq-item");

/*==========================================
        CLOSE ALL FAQ
==========================================*/

function closeAllFAQ() {
  faqItems.forEach((item) => {
    item.classList.remove("active");

    const answer = item.querySelector(".faq-answer");

    const icon = item.querySelector(".faq-question span");

    answer.style.maxHeight = null;

    icon.textContent = "+";
  });
}

/*==========================================
        OPEN FAQ
==========================================*/

function openFAQ(item) {
  item.classList.add("active");

  const answer = item.querySelector(".faq-answer");

  const icon = item.querySelector(".faq-question span");

  answer.style.maxHeight = answer.scrollHeight + "px";

  icon.textContent = "−";
}

/*==========================================
        CLICK EVENT
==========================================*/

faqItems.forEach((item) => {
  const question = item.querySelector(".faq-question");

  question.addEventListener("click", () => {
    const isOpen = item.classList.contains("active");

    closeAllFAQ();

    if (!isOpen) {
      openFAQ(item);

      item.scrollIntoView({
        behavior: "smooth",

        block: "nearest",
      });
    }
  });
});

/*==========================================
        KEYBOARD SUPPORT
==========================================*/

faqItems.forEach((item) => {
  const question = item.querySelector(".faq-question");

  question.setAttribute("tabindex", "0");

  question.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();

      question.click();
    }
  });
});

/*==========================================
        OPEN FIRST FAQ
==========================================*/

if (faqItems.length > 0) {
  openFAQ(faqItems[0]);
}
