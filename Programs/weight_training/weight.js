const exerciseData = {
  beginner: [
    {
      name: "Bodyweight Squats",
      sets: "3 Sets",
      reps: "12-15 Reps",
    },
    {
      name: "Push-Ups",
      sets: "3 Sets",
      reps: "10-12 Reps",
    },
    {
      name: "Lat Pulldown",
      sets: "3 Sets",
      reps: "12 Reps",
    },
    {
      name: "Leg Press",
      sets: "3 Sets",
      reps: "12 Reps",
    },
  ],

  intermediate: [
    {
      name: "Bench Press",
      sets: "4 Sets",
      reps: "8-10 Reps",
    },
    {
      name: "Barbell Squats",
      sets: "4 Sets",
      reps: "8-10 Reps",
    },
    {
      name: "Deadlifts",
      sets: "3 Sets",
      reps: "6-8 Reps",
    },
    {
      name: "Pull-Ups",
      sets: "3 Sets",
      reps: "8-10 Reps",
    },
  ],

  advanced: [
    {
      name: "Heavy Bench Press",
      sets: "5 Sets",
      reps: "5 Reps",
    },
    {
      name: "Weighted Pull-Ups",
      sets: "4 Sets",
      reps: "8 Reps",
    },
    {
      name: "Military Press",
      sets: "4 Sets",
      reps: "8 Reps",
    },
    {
      name: "Heavy Deadlifts",
      sets: "5 Sets",
      reps: "5 Reps",
    },
  ],
};

const buttons = document.querySelectorAll(".tab-btn");
const container = document.getElementById("exerciseContainer");

function displayExercises(level) {
  container.innerHTML = "";

  exerciseData[level].forEach((exercise) => {
    const card = document.createElement("div");

    card.classList.add("exercise-card");

    card.innerHTML = `
      <h3>${exercise.name}</h3>
      <p><strong>${exercise.sets}</strong></p>
      <p>${exercise.reps}</p>
      <button>View Exercise</button>
    `;

    container.appendChild(card);
  });
}

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    buttons.forEach((btn) => btn.classList.remove("active"));

    button.classList.add("active");

    const level = button.dataset.tab;

    displayExercises(level);
  });
});

displayExercises("beginner");
