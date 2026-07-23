/*=========================================================
    CONTACT.JS
    PART 3A-1
    Navbar Loading + Initialization
=========================================================*/

"use strict";

/*=========================================================
    APP OBJECT
=========================================================*/

const ContactApp = {
  init() {
    this.loadNavbar();

    this.cacheDOM();

    this.bindEvents();

    this.initializeComponents();
  },

  /*=====================================================
        CACHE DOM ELEMENTS
    =====================================================*/

  cacheDOM() {
    this.hero = document.querySelector(".hero-section");

    this.form = document.querySelector(".contact-form");

    this.submitButton = document.querySelector(".submit-btn");

    this.cards = document.querySelectorAll(
      ".contact-form-card, .contact-info-card",
    );
  },

  /*=====================================================
        EVENT LISTENERS
    =====================================================*/

  bindEvents() {
    window.addEventListener("load", () => {
      document.body.classList.add("page-loaded");
    });
  },

  /*=====================================================
        INITIAL COMPONENTS
    =====================================================*/

  initializeComponents() {
    console.log("✓ Contact Page Initialized");
  },

  /*=====================================================
        LOAD NAVBAR
    =====================================================*/

  async loadNavbar() {
    const navbar = document.getElementById("nav_section");

    if (!navbar) return;

    try {
      const response = await fetch("../nav.html");

      if (!response.ok) {
        throw new Error("Navbar not found.");
      }

      const html = await response.text();

      navbar.innerHTML = html;

      this.initializeNavbar();
    } catch (error) {
      console.error(error);

      navbar.innerHTML = "";
    }
  },

  /*=====================================================
        NAVBAR INITIALIZATION
    =====================================================*/

  initializeNavbar() {
    const navLinks = document.getElementById("navLinks");

    const hamburger = document.querySelector(".hamburger");

    if (hamburger && navLinks) {
      hamburger.addEventListener("click", () => {
        navLinks.classList.toggle("active");

        hamburger.classList.toggle("active");
      });
    }

    /* Close menu on link click */

    document.querySelectorAll("#navLinks a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks?.classList.remove("active");

        hamburger?.classList.remove("active");
      });
    });
  },
};

/*=========================================================
    DOM READY
=========================================================*/

document.addEventListener("DOMContentLoaded", () => {
  ContactApp.init();
});
/*=========================================================
    PART 3A-2
    Scroll Reveal + Intersection Observer
=========================================================*/

class ScrollRevealManager {
  constructor() {
    this.revealElements = [];

    this.observer = null;

    this.init();
  }

  /*=====================================================
        INITIALIZE
    =====================================================*/

  init() {
    this.collectElements();

    this.createObserver();

    this.observeElements();
  }

  /*=====================================================
        COLLECT ELEMENTS
    =====================================================*/

  collectElements() {
    this.revealElements = [
      ...document.querySelectorAll(".hero-content"),

      ...document.querySelectorAll(".contact-form-card"),

      ...document.querySelectorAll(".contact-info-card"),

      ...document.querySelectorAll(".info-card"),

      ...document.querySelectorAll(".map-card"),

      ...document.querySelectorAll(".social-footer"),

      ...document.querySelectorAll(".social-icon"),

      ...document.querySelectorAll(".section-heading"),

      ...document.querySelectorAll(".input-group"),

      ...document.querySelectorAll(".submit-btn"),
    ];

    this.revealElements.forEach((element, index) => {
      element.classList.add("reveal");

      element.style.transitionDelay = `${Math.min(index * 70, 500)}ms`;
    });
  }

  /*=====================================================
        CREATE OBSERVER
    =====================================================*/

  createObserver() {
    const options = {
      root: null,

      rootMargin: "0px 0px -80px 0px",

      threshold: 0.15,
    };

    this.observer = new IntersectionObserver(
      this.handleIntersection.bind(this),

      options,
    );
  }

  /*=====================================================
        OBSERVE ELEMENTS
    =====================================================*/

  observeElements() {
    this.revealElements.forEach((element) => {
      this.observer.observe(element);
    });
  }

  /*=====================================================
        CALLBACK
    =====================================================*/

  handleIntersection(entries) {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      entry.target.classList.add("active");

      this.observer.unobserve(entry.target);
    });
  }
}

/*=========================================================
    START SCROLL REVEAL
=========================================================*/

document.addEventListener("DOMContentLoaded", () => {
  new ScrollRevealManager();
});
/*=========================================================
    PART 3A-3A
    Smooth Page Entrance + Loading Animation
=========================================================*/

class PageEntrance {
  constructor() {
    this.body = document.body;
    this.hero = document.querySelector(".hero-content");

    this.init();
  }

  /*=====================================================
        INITIALIZE
    =====================================================*/

  init() {
    document.documentElement.classList.add("page-loading");

    window.addEventListener(
      "load",
      () => {
        requestAnimationFrame(() => {
          this.showPage();
        });
      },
      { once: true },
    );
  }

  /*=====================================================
        SHOW PAGE
    =====================================================*/

  showPage() {
    this.body.classList.add("loaded");

    document.documentElement.classList.remove("page-loading");

    this.animateHero();
  }

  /*=====================================================
        HERO STAGGER ANIMATION
    =====================================================*/

  animateHero() {
    if (!this.hero) return;

    const items = [...this.hero.children];

    items.forEach((item, index) => {
      item.style.animationDelay = `${0.15 + index * 0.18}s`;

      item.classList.add("hero-fade");
    });
  }
}

/*=========================================================
    INITIALIZE
=========================================================*/

document.addEventListener("DOMContentLoaded", () => {
  new PageEntrance();
});
const loader = document.getElementById("pageLoader");

if (loader) {
  loader.classList.add("hidden");
}
/*=========================================================
    PART 3A-3B-1
    requestAnimationFrame Scroll Manager
=========================================================*/

class ScrollManager {
  constructor() {
    this.lastScrollY = window.pageYOffset;

    this.currentScrollY = window.pageYOffset;

    this.ticking = false;

    this.scrollDirection = "down";

    this.callbacks = [];

    this.init();
  }

  /*=====================================================
        INITIALIZE
    =====================================================*/

  init() {
    window.addEventListener(
      "scroll",

      () => this.onScroll(),

      {
        passive: true,
      },
    );

    this.update();
  }

  /*=====================================================
        SCROLL EVENT
    =====================================================*/

  onScroll() {
    this.currentScrollY = window.pageYOffset;

    if (!this.ticking) {
      requestAnimationFrame(() => {
        this.update();

        this.ticking = false;
      });

      this.ticking = true;
    }
  }

  /*=====================================================
        UPDATE
    =====================================================*/

  update() {
    this.detectDirection();

    this.runCallbacks();

    this.lastScrollY = this.currentScrollY;
  }

  /*=====================================================
        SCROLL DIRECTION
    =====================================================*/

  detectDirection() {
    this.scrollDirection =
      this.currentScrollY > this.lastScrollY ? "down" : "up";
  }

  /*=====================================================
        CALLBACK SYSTEM
    =====================================================*/

  addCallback(callback) {
    if (typeof callback === "function") {
      this.callbacks.push(callback);
    }
  }

  runCallbacks() {
    this.callbacks.forEach((callback) => {
      callback({
        scrollY: this.currentScrollY,

        direction: this.scrollDirection,
      });
    });
  }
}

/*=========================================================
    GLOBAL INSTANCE
=========================================================*/

const scrollManager = new ScrollManager();

/*=========================================================
    EXAMPLE CALLBACK
=========================================================*/

scrollManager.addCallback(({ scrollY, direction }) => {
  document.documentElement.style.setProperty(
    "--scroll-position",

    scrollY,
  );

  if (direction === "down") {
    document.body.classList.add("scrolling-down");

    document.body.classList.remove("scrolling-up");
  } else {
    document.body.classList.add("scrolling-up");

    document.body.classList.remove("scrolling-down");
  }
});
/*=========================================================
    PART 3A-3B-2A-1
    Sticky Navbar Core
=========================================================*/

class StickyNavbar {
  constructor(scrollManager) {
    this.scrollManager = scrollManager;

    this.navbar = null;

    this.isSticky = false;

    this.scrollThreshold = 80;

    this.lastState = "";

    this.init();
  }

  /*=====================================================
        INITIALIZE
    =====================================================*/

  init() {
    this.waitForNavbar();
  }

  /*=====================================================
        WAIT FOR DYNAMIC NAVBAR
    =====================================================*/

  waitForNavbar() {
    const timer = setInterval(() => {
      this.navbar =
        document.querySelector("nav") ||
        document.getElementById("navbar") ||
        document.querySelector(".navbar");

      if (!this.navbar) return;

      clearInterval(timer);

      this.setup();
    }, 100);
  }

  /*=====================================================
        SETUP
    =====================================================*/

  setup() {
    this.navbar.classList.add("navbar-ready");

    this.scrollManager.addCallback((state) => {
      this.update(state);
    });
  }

  /*=====================================================
        UPDATE
    =====================================================*/

  update({ scrollY }) {
    if (!this.navbar) return;

    const shouldStick = scrollY > this.scrollThreshold;

    if (shouldStick === this.isSticky) return;

    this.isSticky = shouldStick;

    if (this.isSticky) {
      this.enableSticky();
    } else {
      this.disableSticky();
    }
  }

  /*=====================================================
        ENABLE STICKY
    =====================================================*/

  enableSticky() {
    if (this.lastState === "sticky") return;

    this.lastState = "sticky";

    this.navbar.classList.add("navbar-sticky");

    this.navbar.classList.remove("navbar-top");
  }

  /*=====================================================
        DISABLE STICKY
    =====================================================*/

  disableSticky() {
    if (this.lastState === "top") return;

    this.lastState = "top";

    this.navbar.classList.remove("navbar-sticky");

    this.navbar.classList.add("navbar-top");
  }
}

/*=========================================================
    INITIALIZE STICKY NAVBAR
=========================================================*/

document.addEventListener("DOMContentLoaded", () => {
  if (typeof scrollManager !== "undefined") {
    new StickyNavbar(scrollManager);
  }
});
/*=========================================================
    PART 3B-1
    Floating Labels + Input Focus Animations
=========================================================*/

class FormEffects {
  constructor() {
    this.inputs = document.querySelectorAll(
      ".input-box input, .input-box textarea",
    );

    if (!this.inputs.length) return;

    this.initialize();
  }

  /*========================================*/

  initialize() {
    this.inputs.forEach((input) => {
      this.prepareInput(input);

      input.addEventListener("focus", () => this.onFocus(input));

      input.addEventListener("blur", () => this.onBlur(input));

      input.addEventListener("input", () => this.onInput(input));
    });
  }

  /*========================================*/

  prepareInput(input) {
    const group = input.closest(".input-group");

    if (!group) return;

    if (input.value.trim() !== "") {
      group.classList.add("filled");
    }
  }

  /*========================================*/

  onFocus(input) {
    const group = input.closest(".input-group");

    group?.classList.add("focused");
  }

  /*========================================*/

  onBlur(input) {
    const group = input.closest(".input-group");

    group?.classList.remove("focused");

    if (input.value.trim() === "") {
      group?.classList.remove("filled");
    }
  }

  /*========================================*/

  onInput(input) {
    const group = input.closest(".input-group");

    if (input.value.trim() !== "") {
      group?.classList.add("filled");
    } else {
      group?.classList.remove("filled");
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new FormEffects();
});
/*=========================================================
    PART 3B-2
    Premium Form Validation Engine
=========================================================*/

class ContactFormValidator {
  constructor() {
    this.form = document.querySelector(".contact-form");

    if (!this.form) return;

    this.fields = {
      name: this.form.querySelector("#name"),
      email: this.form.querySelector("#email"),
      phone: this.form.querySelector("#phone"),
      message: this.form.querySelector("#message"),
    };

    this.patterns = {
      name: /^[A-Za-z ]{3,40}$/,

      email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,

      phone: /^[0-9]{10}$/,

      message: /^.{10,500}$/,
    };

    this.initialize();
  }

  /*=======================================*/

  initialize() {
    Object.values(this.fields).forEach((field) => {
      if (!field) return;

      this.createErrorElement(field);

      field.addEventListener("input", () => {
        this.validateField(field);
      });

      field.addEventListener("blur", () => {
        this.validateField(field);
      });
    });

    this.form.addEventListener("submit", (e) => {
      e.preventDefault();

      this.submitValidation();
    });
  }

  /*=======================================*/

  createErrorElement(field) {
    const group = field.closest(".input-group");

    if (!group) return;

    if (group.querySelector(".error-message")) return;

    const error = document.createElement("small");

    error.className = "error-message";

    group.appendChild(error);
  }

  /*=======================================*/

  validateField(field) {
    switch (field.id) {
      case "name":
        return this.validateName(field);

      case "email":
        return this.validateEmail(field);

      case "phone":
        return this.validatePhone(field);

      case "message":
        return this.validateMessage(field);
    }
  }

  /*=======================================*/

  validateName(field) {
    const value = field.value.trim();

    if (value === "") {
      return this.showError(field, "Name is required");
    }

    if (!this.patterns.name.test(value)) {
      return this.showError(field, "Enter a valid name");
    }

    return this.showSuccess(field);
  }

  /*=======================================*/

  validateEmail(field) {
    const value = field.value.trim();

    if (value === "") {
      return this.showError(field, "Email is required");
    }

    if (!this.patterns.email.test(value)) {
      return this.showError(field, "Invalid email address");
    }

    return this.showSuccess(field);
  }

  /*=======================================*/

  validatePhone(field) {
    const value = field.value.trim();

    if (value === "") {
      return this.showSuccess(field);
    }

    if (!this.patterns.phone.test(value)) {
      return this.showError(field, "Phone must contain 10 digits");
    }

    return this.showSuccess(field);
  }

  /*=======================================*/

  validateMessage(field) {
    const value = field.value.trim();

    if (value === "") {
      return this.showError(field, "Message is required");
    }

    if (value.length < 10) {
      return this.showError(field, "Message is too short");
    }

    return this.showSuccess(field);
  }

  /*=======================================*/

  showError(field, message) {
    const group = field.closest(".input-group");

    const error = group.querySelector(".error-message");

    group.classList.remove("success");

    group.classList.add("error");

    field.setAttribute("aria-invalid", "true");

    error.textContent = message;

    return false;
  }

  /*=======================================*/

  showSuccess(field) {
    const group = field.closest(".input-group");

    const error = group.querySelector(".error-message");

    group.classList.remove("error");

    group.classList.add("success");

    field.setAttribute("aria-invalid", "false");

    error.textContent = "";

    return true;
  }

  /*=======================================*/

  submitValidation() {
    let valid = true;

    Object.values(this.fields).forEach((field) => {
      if (!field) return;

      if (!this.validateField(field)) {
        valid = false;
      }
    });

    if (valid) {
      console.log("Form Validated Successfully");

      // Success Notification
      // Added in next section
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new ContactFormValidator();
});
/*=========================================================
    PART 3B-3
    Success Notification + Ripple + Final Polish
=========================================================*/

class ContactFormEnhancer {
  constructor() {
    this.form = document.querySelector(".contact-form");
    this.button = document.querySelector(".submit-btn");

    if (!this.form || !this.button) return;

    this.createToast();

    this.initializeRipple();

    this.overrideSubmit();
  }

  /*====================================*/

  createToast() {
    if (document.querySelector(".success-toast")) return;

    const toast = document.createElement("div");

    toast.className = "success-toast";

    toast.innerHTML = `
            <i class="fas fa-circle-check"></i>
            <span>Message sent successfully!</span>
        `;

    document.body.appendChild(toast);

    this.toast = toast;
  }

  /*====================================*/

  showToast() {
    this.toast.classList.add("show");

    setTimeout(() => {
      this.toast.classList.remove("show");
    }, 3000);
  }

  /*====================================*/

  initializeRipple() {
    this.button.addEventListener("click", (e) => {
      const ripple = document.createElement("span");

      ripple.className = "ripple";

      const rect = this.button.getBoundingClientRect();

      ripple.style.left = e.clientX - rect.left + "px";

      ripple.style.top = e.clientY - rect.top + "px";

      this.button.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 700);
    });
  }

  /*====================================*/

  overrideSubmit() {
    this.form.addEventListener("submit", (e) => {
      if (document.querySelector(".input-group.error")) {
        return;
      }

      e.preventDefault();

      this.loading();
    });
  }

  /*====================================*/

  loading() {
    this.button.disabled = true;

    this.button.dataset.text = this.button.innerHTML;

    this.button.innerHTML = `
            <i class="fas fa-spinner fa-spin"></i>
            Sending...
        `;

    setTimeout(() => {
      this.success();
    }, 1700);
  }

  /*====================================*/

  success() {
    this.button.innerHTML = `
            <i class="fas fa-check"></i>
            Message Sent
        `;

    this.button.classList.add("success-btn");

    this.showToast();

    this.form.reset();

    document.querySelectorAll(".input-group").forEach((group) => {
      group.classList.remove("filled", "focused", "success", "error");
    });

    document.querySelectorAll(".error-message").forEach((msg) => {
      msg.textContent = "";
    });

    setTimeout(() => {
      this.button.disabled = false;

      this.button.classList.remove("success-btn");

      this.button.innerHTML = this.button.dataset.text;
    }, 2500);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new ContactFormEnhancer();
});
