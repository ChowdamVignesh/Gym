const crossfitData = {
  beginner: [
    {
      name: "Air Squats",
      benefit: "Builds lower body strength",
    },
    {
      name: "Push-Ups",
      benefit: "Develops upper body strength",
    },
    {
      name: "Jump Rope",
      benefit: "Improves cardiovascular fitness",
    },
    {
      name: "Walking Lunges",
      benefit: "Enhances balance and leg strength",
    },
    {
      name: "Plank Hold",
      benefit: "Strengthens core muscles",
    },
    {
      name: "Box Step-Ups",
      benefit: "Improves coordination",
    },
  ],

  intermediate: [
    {
      name: "Kettlebell Swings",
      benefit: "Develops explosive power",
    },
    {
      name: "Burpees",
      benefit: "Full-body conditioning",
    },
    {
      name: "Box Jumps",
      benefit: "Improves agility and power",
    },
    {
      name: "Pull-Ups",
      benefit: "Strengthens back and arms",
    },
    {
      name: "Wall Balls",
      benefit: "Enhances endurance",
    },
    {
      name: "Rowing Machine",
      benefit: "Improves cardiovascular endurance",
    },
  ],

  advanced: [
    {
      name: "Muscle-Ups",
      benefit: "Advanced upper body strength",
    },
    {
      name: "Handstand Push-Ups",
      benefit: "Builds shoulder strength",
    },
    {
      name: "Thrusters",
      benefit: "Full-body power exercise",
    },
    {
      name: "Snatch",
      benefit: "Olympic lifting technique",
    },
    {
      name: "Clean and Jerk",
      benefit: "Explosive strength development",
    },
    {
      name: "Double-Unders",
      benefit: "Advanced cardio and coordination",
    },
  ],
};

const buttons = document.querySelectorAll(".level-btn");
const container = document.getElementById("exerciseContainer");

function showCrossfit(level) {
  container.innerHTML = "";

  crossfitData[level].forEach((exercise) => {
    const card = document.createElement("div");

    card.classList.add("exercise-card");

    card.innerHTML = `
            <h3>${exercise.name}</h3>
            <p><strong>Benefit:</strong> ${exercise.benefit}</p>
        `;

    container.appendChild(card);
  });
}

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    buttons.forEach((btn) => btn.classList.remove("active"));

    button.classList.add("active");

    showCrossfit(button.dataset.level);
  });
});

showCrossfit("beginner");
