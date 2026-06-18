const exercises = {
  beginner: [
    "Brisk Walking",
    "Stationary Cycling",
    "Marching in Place",
    "Low-Impact Jumping Jacks",
    "Elliptical Trainer",
    "Step-Ups",
  ],

  intermediate: [
    "Jogging",
    "Treadmill Running",
    "Jump Rope",
    "Mountain Climbers",
    "Cycling Intervals",
    "Rowing Machine",
  ],

  advanced: [
    "Sprint Intervals",
    "HIIT Training",
    "Burpees",
    "Battle Ropes",
    "Box Jumps",
    "Stair Sprints",
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
            <h3>${exercise}</h3>
            <p>Cardio Exercise</p>
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
