const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      } else {
        entry.target.classList.remove("show");
      }
    });
  },
  {
    threshold: 0.2,
  },
);

const hiddenElements = document.querySelectorAll(".fade-up");
//memership card

hiddenElements.forEach((el) => {
  observer.observe(el);
});
const plans = document.querySelectorAll(".plan-card");

plans.forEach((plan) => {
  const select = plan.querySelector(".plan-duration");
  const price = plan.querySelector(".price");

  select.addEventListener("change", () => {
    price.innerText = `₹${select.value}`;
  });
});
const modal = document.getElementById("membershipModal");

const closeBtn = document.querySelector(".close");

const chooseButtons = document.querySelectorAll(".choose-btn");

chooseButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const card = btn.closest(".plan-card");

    const plan = card.querySelector("h3").innerText;

    const amount = card.querySelector(".price").innerText;

    document.getElementById("selectedPlan").value = plan;

    document.getElementById("selectedAmount").value = amount;

    modal.style.display = "flex";
  });
});

closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});
document
  .getElementById("membershipForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    alert("Redirecting to Payment Gateway...");
  });
