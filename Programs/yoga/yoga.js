const yogaData = {

    beginner: [
        {
            name: "Mountain Pose",
            benefit: "Improves posture and balance"
        },
        {
            name: "Child's Pose",
            benefit: "Relaxes body and mind"
        },
        {
            name: "Cat-Cow Stretch",
            benefit: "Improves spine flexibility"
        },
        {
            name: "Tree Pose",
            benefit: "Enhances balance"
        },
        {
            name: "Cobra Pose",
            benefit: "Strengthens back muscles"
        },
        {
            name: "Bridge Pose",
            benefit: "Opens chest and hips"
        }
    ],

    intermediate: [
        {
            name: "Warrior I",
            benefit: "Builds strength and stability"
        },
        {
            name: "Warrior II",
            benefit: "Improves endurance"
        },
        {
            name: "Triangle Pose",
            benefit: "Improves flexibility"
        },
        {
            name: "Boat Pose",
            benefit: "Strengthens core"
        },
        {
            name: "Crow Pose",
            benefit: "Improves arm strength"
        },
        {
            name: "Camel Pose",
            benefit: "Opens chest and shoulders"
        }
    ],

    advanced: [
        {
            name: "Headstand",
            benefit: "Improves focus and balance"
        },
        {
            name: "Handstand",
            benefit: "Builds full-body strength"
        },
        {
            name: "Scorpion Pose",
            benefit: "Advanced flexibility"
        },
        {
            name: "Wheel Pose",
            benefit: "Deep backbend"
        },
        {
            name: "Eight-Angle Pose",
            benefit: "Core and arm strength"
        },
        {
            name: "Firefly Pose",
            benefit: "Balance and flexibility"
        }
    ]
};

const buttons = document.querySelectorAll(".level-btn");
const container = document.getElementById("exerciseContainer");

function showYoga(level){

    container.innerHTML = "";

    yogaData[level].forEach(pose => {

        const card = document.createElement("div");

        card.classList.add("exercise-card");

        card.innerHTML = `
            <h3>${pose.name}</h3>
            <p><strong>Benefit:</strong> ${pose.benefit}</p>
        `;

        container.appendChild(card);
    });
}

buttons.forEach(button => {

    button.addEventListener("click", () => {

        buttons.forEach(btn =>
            btn.classList.remove("active")
        );

        button.classList.add("active");

        showYoga(button.dataset.level);
    });

});

showYoga("beginner");