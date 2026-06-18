const exercises = {
  beginner: [
    {
      name: "Bodyweight Squats",
      muscle: "Legs & Glutes",
    },
    {
      name: "Push-Ups",
      muscle: "Chest & Triceps",
    },
    {
      name: "Dumbbell Shoulder Press",
      muscle: "Shoulders",
    },
    {
      name: "Glute Bridges",
      muscle: "Glutes & Core",
    },
    {
      name: "Plank Hold",
      muscle: "Core",
    },
    {
      name: "Resistance Band Rows",
      muscle: "Back",
    },
  ],

  intermediate: [
    {
      name: "Bench Press",
      muscle: "Chest",
    },
    {
      name: "Barbell Squats",
      muscle: "Legs",
    },
    {
      name: "Deadlifts",
      muscle: "Back & Legs",
    },
    {
      name: "Pull-Ups",
      muscle: "Back & Biceps",
    },
    {
      name: "Walking Lunges",
      muscle: "Legs & Glutes",
    },
    {
      name: "Dumbbell Rows",
      muscle: "Back",
    },
  ],

  advanced: [
    {
      name: "Heavy Deadlifts",
      muscle: "Full Body",
    },
    {
      name: "Weighted Pull-Ups",
      muscle: "Back & Biceps",
    },
    {
      name: "Barbell Front Squats",
      muscle: "Legs",
    },
    {
      name: "Military Press",
      muscle: "Shoulders",
    },
    {
      name: "Power Cleans",
      muscle: "Explosive Strength",
    },
    {
      name: "Farmer's Walk",
      muscle: "Grip & Full Body",
    },
  ],
};

const buttons = document.querySelectorAll(".level-btn");
const container = document.getElementById("exerciseContainer");

function showExercises(level) {
  container.innerHTML = "";

  exercises[level].forEach((exercise) => {
    const card = document.createElement("div");

    card.classList.add("exercise-card");

    card.innerHTML = `
            <h3>${exercise.name}</h3>
            <p><strong>Target:</strong> ${exercise.muscle}</p>
        `;

    container.appendChild(card);
  });
}

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    buttons.forEach((btn) => btn.classList.remove("active"));

    button.classList.add("active");

    showExercises(button.dataset.level);
  });
});

showExercises("beginner");
