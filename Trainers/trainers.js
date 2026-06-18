// Trainer Data Repository
const trainerData = {
  trainer1: {
    name: "Yaswanth",
    image: "/images/Trainers/yaswanth.png",
    specialization: "Strength & Conditioning",
    experience: "30 +2 Years",
    certification: "NASM Certified Personal Trainer, Crossfit Level 2",
    email: "alex@fitnesselite.com",
    socials: { instagram: "#", twitter: "#", linkedin: "#" },
  },
  trainer2: {
    name: "Vignesh",
    image: "/images/Trainers/Vignesh(1).png",
    specialization: "High-Intensity Interval Trainer",
    experience: "10 Years",
    certification:
      "ACE Certified Personal Trainer, F45 Instructor Certified <br>500-Hour Registered Yoga Teacher (RYT), Pilates Mat Certified",
    email: "vigneshchowdaiah08@gmail.com",
    socials: { instagram: "#", facebook: "#", linkedin: "#" },
  },
  trainer3: {
    name: "Rohith",
    image: "/images/Trainers/rohith(2).png",
    specialization: "Zumba Trainer",
    experience: "9 Years",
    certification:
      "500-Hour Registered Yoga Teacher (RYT), Pilates Mat Certified",
    email: "marcus@fitnesselite.com",
    socials: { instagram: "#", twitter: "#" },
  },
};

const modal = document.getElementById("trainerModal");
const modalDetails = document.getElementById("modalDetails");

// Open Pop-up and Inject Data
function openModal(trainerId) {
  const trainer = trainerData[trainerId];

  // Generate social media icons dynamically based on availability
  let socialHtml = "";
  for (const [platform, link] of Object.entries(trainer.socials)) {
    socialHtml += `<a href="${link}"><i class="fa-brands fa-${platform}"></i></a>`;
  }

  // Insert full details into the modal layout
  modalDetails.innerHTML = `
        <img src="${trainer.image}" alt="${trainer.name}" class="modal-img">
        <h2>${trainer.name}</h2>
        <p class="specialization">${trainer.specialization}</p>
        <p class="experience"><strong>Experience:</strong> ${trainer.experience}</p>
        
        <div class="modal-certifications">
            <strong>Certifications:</strong><br> ${trainer.certification}
        </div>
        
        <a href="mailto:${trainer.email}" class="contact-btn">Contact Trainer</a>
        
        <div class="social-links">
            ${socialHtml}
        </div>
    `;

  modal.style.display = "flex";
}

// Close Pop-up
function closeModal() {
  modal.style.display = "none";
}

// Close pop-up if the user clicks anywhere outside the card box
window.onclick = function (event) {
  if (event.target == modal) {
    closeModal();
  }
};
