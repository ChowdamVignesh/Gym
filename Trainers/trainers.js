/*==========================================================
        FITNESS ELITE - PREMIUM TRAINERS JS
==========================================================*/

/*==========================================================
                TRAINER DATA
==========================================================*/

const trainerData = {
  trainer1: {
    name: "Yaswanth",
    image: "../images/Trainers/yaswanth(1).png",
    specialization: "Strength & Conditioning",
    experience: "30+ Years",
    certification: "NASM Certified Personal Trainer<br>CrossFit Level 2 Coach",
    email: "alex@fitnesselite.com",
    socials: {
      instagram: "#",
      twitter: "#",
      linkedin: "#",
    },
  },

  trainer2: {
    name: "Vignesh",
    image: "../images/Trainers/Vignesh(1).png",
    specialization: "HIIT Trainer",
    experience: "10 Years",
    certification:
      "ACE Certified Personal Trainer<br>500-Hour Registered Yoga Teacher<br>Pilates Certified",
    email: "vigneshchowdaiah08@gmail.com",
    socials: {
      instagram: "#",
      facebook: "#",
      linkedin: "#",
    },
  },

  trainer3: {
    name: "Rohith",
    image: "../images/Trainers/rohith(2).png",
    specialization: "Zumba Trainer",
    experience: "9 Years",
    certification: "500-Hour Registered Yoga Teacher<br>Pilates Certified",
    email: "rohith@fitnesselite.com",
    socials: {
      instagram: "#",
      twitter: "#",
    },
  },
};

/*==========================================================
                DOM
==========================================================*/

const modal = document.getElementById("trainerModal");
const modalDetails = document.getElementById("modalDetails");

/*==========================================================
            OPEN MODAL
==========================================================*/

function openModal(id) {
  const trainer = trainerData[id];

  if (!trainer) return;

  let socialHTML = "";

  for (const [platform, link] of Object.entries(trainer.socials)) {
    socialHTML += `
        <a href="${link}" target="_blank">
            <i class="fa-brands fa-${platform}"></i>
        </a>
        `;
  }

  modalDetails.innerHTML = `

        <img src="${trainer.image}"
             class="modal-img"
             alt="${trainer.name}">

        <h2>${trainer.name}</h2>

        <p class="specialization">
            ${trainer.specialization}
        </p>

        <p class="experience">
            <strong>Experience :</strong>
            ${trainer.experience}
        </p>

        <div class="modal-certifications">

            <strong>Certifications</strong>

            <br><br>

            ${trainer.certification}

        </div>

        <a href="mailto:${trainer.email}"
           class="contact-btn">

            <i class="fa-solid fa-envelope"></i>

            Contact Trainer

        </a>

        <div class="social-links">

            ${socialHTML}

        </div>

    `;

  modal.style.display = "flex";

  document.body.style.overflow = "hidden";
}

/*==========================================================
            CLOSE MODAL
==========================================================*/

function closeModal() {
  const box = document.querySelector(".modal-content");

  box.style.transform = "scale(.9)";
  box.style.opacity = "0";

  setTimeout(() => {
    modal.style.display = "none";

    box.style.transform = "";
    box.style.opacity = "";

    document.body.style.overflow = "auto";
  }, 250);
}

/*==========================================================
        CLICK OUTSIDE
==========================================================*/

window.addEventListener("click", (e) => {
  if (e.target === modal) {
    closeModal();
  }
});

/*==========================================================
            ESC KEY
==========================================================*/

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    if (modal.style.display === "flex") {
      closeModal();
    }
  }
});

/*==========================================================
        SCROLL REVEAL
==========================================================*/

const revealElements = document.querySelectorAll(".trainer-card");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show-card");
      }
    });
  },

  {
    threshold: 0.2,
  },
);

revealElements.forEach((card) => {
  observer.observe(card);
});

/*==========================================================
        RIPPLE EFFECT
==========================================================*/

document.querySelectorAll(".trainer-card").forEach((card) => {
  card.addEventListener("click", function (e) {
    const ripple = document.createElement("span");

    const rect = this.getBoundingClientRect();

    const size = Math.max(rect.width, rect.height);

    ripple.style.width = size + "px";
    ripple.style.height = size + "px";

    ripple.style.left = e.clientX - rect.left - size / 2 + "px";
    ripple.style.top = e.clientY - rect.top - size / 2 + "px";

    ripple.className = "ripple";

    this.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 700);
  });
});

/*==========================================================
        FLOATING HOVER
==========================================================*/

document.querySelectorAll(".trainer-card").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateX = (y / rect.height - 0.5) * 8;

    const rotateY = (x / rect.width - 0.5) * -8;

    card.style.transform = `perspective(1000px)
rotateX(${rotateX}deg)
rotateY(${rotateY}deg)
translateY(-8px)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
  });
});

/*==========================================================
        IMAGE REVEAL
==========================================================*/

const images = document.querySelectorAll(".trainer-img");

const imageObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("img-show");
      }
    });
  },

  {
    threshold: 0.15,
  },
);

images.forEach((img) => {
  imageObserver.observe(img);
});

/*==========================================================
        STAGGER ANIMATION
==========================================================*/

document.querySelectorAll(".trainer-card").forEach((card, index) => {
  card.style.animationDelay = `${index * 0.15}s`;
});

/*==========================================================
        CARD SHADOW FOLLOW
==========================================================*/

document.querySelectorAll(".trainer-card").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;

    const y = e.clientY - rect.top;

    card.style.setProperty("--x", `${x}px`);
    card.style.setProperty("--y", `${y}px`);
  });
});
