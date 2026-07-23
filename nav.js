/*==================================================
                SELECT ELEMENTS
==================================================*/

const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");
const navbar = document.getElementById("nav_section");
const links = document.querySelectorAll(".nav-link");

/*==================================================
            MOBILE MENU TOGGLE
==================================================*/

function toggleMenu() {
  navLinks.classList.toggle("active");
  hamburger.classList.toggle("active");

  const expanded = hamburger.classList.contains("active");

  hamburger.setAttribute("aria-expanded", expanded);

  document.body.style.overflow = expanded ? "hidden" : "";
}

/*==================================================
        HAMBURGER ANIMATION
==================================================*/

// hamburger.addEventListener("click", function () {
//   this.classList.toggle("active");
// });

/*==================================================
        CLOSE MENU WHEN LINK CLICKED
==================================================*/

links.forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
    hamburger.classList.remove("active");

    hamburger.setAttribute("aria-expanded", "false");

    document.body.style.overflow = "";
  });
});

/*==================================================
        CLICK OUTSIDE TO CLOSE
==================================================*/

document.addEventListener("click", (e) => {
  const insideNavbar = navbar.contains(e.target);

  if (!insideNavbar) {
    navLinks.classList.remove("active");
    hamburger.classList.remove("active");

    hamburger.setAttribute("aria-expanded", "false");

    document.body.style.overflow = "";
  }
});

/*==================================================
                ESC KEY CLOSE
==================================================*/

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    navLinks.classList.remove("active");
    hamburger.classList.remove("active");

    hamburger.setAttribute("aria-expanded", "false");

    document.body.style.overflow = "";
  }
});

/*==================================================
            ACTIVE NAVIGATION LINK
==================================================*/

const currentPage = window.location.pathname;

links.forEach((link) => {
  const href = link.getAttribute("href");

  if (currentPage.includes(href.replace("../", "").split("#")[0])) {
    links.forEach((item) => item.classList.remove("active"));

    link.classList.add("active");
  }
});

/*==================================================
            NAVBAR SCROLL EFFECT
==================================================*/

window.addEventListener("scroll", () => {
  if (window.scrollY > 40) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

/*==================================================
        CLOSE MENU ON WINDOW RESIZE
==================================================*/

window.addEventListener("resize", () => {
  if (window.innerWidth > 768) {
    navLinks.classList.remove("active");
    hamburger.classList.remove("active");

    hamburger.setAttribute("aria-expanded", "false");

    document.body.style.overflow = "";
  }
});

/*==================================================
            SMOOTH PAGE LOADING
==================================================*/

window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});
