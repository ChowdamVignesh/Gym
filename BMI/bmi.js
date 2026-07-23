// Keep track of Chart instances to cleanly update/destroy them on recalculation
let bmiChartInstance = null;
let weightChartInstance = null;
let calorieChartInstance = null;

function calculateBMI() {
  // 1. DOM Input retrieval
  const name = document.getElementById("name").value || "Guest";
  const age = parseInt(document.getElementById("age").value);
  const gender = document.getElementById("gender").value;
  const heightCm = parseFloat(document.getElementById("height").value);
  const weightKg = parseFloat(document.getElementById("weight").value);

  // Basic Validation
  if (!age || !heightCm || !weightKg || heightCm <= 0 || weightKg <= 0) {
    alert("Please provide valid inputs for Age, Height, and Weight.");
    return;
  }

  // 2. Standard Calculations
  const heightM = heightCm / 100;
  const bmi = +(weightKg / (heightM * heightM)).toFixed(1);

  // Ideal Weight Range (Using standard health metrics rules)
  const minHealthyWeight = +(18.5 * heightM * heightM).toFixed(1);
  const maxHealthyWeight = +(24.9 * heightM * heightM).toFixed(1);
  const idealWeight = +((minHealthyWeight + maxHealthyWeight) / 2).toFixed(1);

  // Body Fat Percentage (Deurenberg Formula)
  const genderFactor = gender === "Male" ? 1 : 0;
  const estimatedBodyFat = +(
    1.2 * bmi +
    0.23 * age -
    10.8 * genderFactor -
    5.4
  ).toFixed(1);
  const finalBodyFat = estimatedBodyFat > 0 ? estimatedBodyFat : 0;

  // Mass Distributions
  const fatMass = +(weightKg * (finalBodyFat / 100)).toFixed(1);
  const leanBodyMass = +(weightKg - fatMass).toFixed(1);

  // Basal Metabolic Rate (Mifflin-St Jeor Equation)
  let bmr = 0;
  if (gender === "Male") {
    bmr = 10 * weightKg + 6.25 * heightCm - 5 * age + 5;
  } else {
    bmr = 10 * weightKg + 6.25 * heightCm - 5 * age - 161;
  }
  bmr = Math.round(bmr);

  // Active Day TDEE calories (Assuming structural moderate activity level baseline)
  const dailyCalories = Math.round(bmr * 1.4);
  const waterIntakeLitres = +(weightKg * 0.033).toFixed(1);
  const proteinRequirementGrams = Math.round(weightKg * 1.2);

  // Body Surface Area (Mosteller formula)
  const bsa = +Math.sqrt((heightCm * weightKg) / 3600).toFixed(2);

  // Dynamic Age Metrics estimations based on offsets
  const metabolicAge =
    bmi > 25 ? age + Math.floor((bmi - 25) / 2) : Math.max(18, age - 2);
  const biologicalBodyAge =
    bmi > 25 ? age + Math.floor(bmi - 24) : Math.max(18, age - 3);

  // 3. Define Categorization rules
  let category = "Normal";
  let healthRisk = "Low Risk";
  let riskColor = "#065f46";
  let riskBg = "#ecfdf5";
  let gaugeColor = "#10b981";
  let activeRowId = "normalRow";
  let adviceText =
    "Great configuration! Your body profile is matching optimal wellness standards. Maintain physical activity.";

  if (bmi < 18.5) {
    category = "Underweight";
    healthRisk = "Minimal to Moderate Risk (Nutritional Deficiency)";
    riskColor = "#b45309";
    riskBg = "#fffbeb";
    gaugeColor = "#3b82f6";
    activeRowId = "underweightRow";
    adviceText =
      "Consider design optimizations for macro intake. Focus on structural muscle gains via high nutrient profiles.";
  } else if (bmi >= 25 && bmi <= 29.9) {
    category = "Overweight";
    healthRisk = "Increased Health Risk";
    riskColor = "#b45309";
    riskBg = "#fffbeb";
    gaugeColor = "#f59e0b";
    activeRowId = "overweightRow";
    adviceText =
      "Slight variance above thresholds. Regular cardio tracking and functional dietary tracking suggested.";
  } else if (bmi >= 30 && bmi <= 34.9) {
    category = "Obesity I";
    healthRisk = "High Risk Profile";
    riskColor = "#dc2626";
    riskBg = "#fef2f2";
    gaugeColor = "#ef4444";
    activeRowId = "obese1Row";
    adviceText =
      "Target active weight calibration metrics. Reduce heavy calorie patterns and secure standard physical coaching.";
  } else if (bmi >= 35 && bmi <= 39.9) {
    category = "Obesity II";
    healthRisk = "Very High Risk Profile";
    riskColor = "#991b1b";
    riskBg = "#fef2f2";
    gaugeColor = "#b91c1c";
    activeRowId = "obese2Row";
    adviceText =
      "Medical or clinical management oversight requested. Structured training pipelines required.";
  } else if (bmi >= 40) {
    category = "Obesity III";
    healthRisk = "Extremely Severe Clinical Risk";
    riskColor = "#7f1d1d";
    riskBg = "#fef2f2";
    gaugeColor = "#7f1d1d";
    activeRowId = "obese3Row";
    adviceText =
      "Immediate professional guidance recommended. Drastic structural nutritional redesign advised.";
  }

  // Dynamic fitness scoring estimation mechanics
  let fitnessScore = 90 - Math.abs(bmi - 21.7) * 2;
  fitnessScore = Math.min(100, Math.max(20, Math.round(fitnessScore)));

  // 4. Update DOM Report Layout Elements
  document.getElementById("rName").innerText = name;
  document.getElementById("rAge").innerText = age;
  document.getElementById("rGender").innerText = gender;
  document.getElementById("rHeight").innerText = `${heightCm} cm`;
  document.getElementById("rWeight").innerText = `${weightKg} kg`;

  document.getElementById("rBMI").innerText = bmi;
  document.getElementById("rCategory").innerText = category;
  document.getElementById("rCategory").style.color = gaugeColor;

  document.getElementById("rBodyFat").innerText = `${finalBodyFat}%`;
  document.getElementById("bodyFatBar").style.width =
    `${Math.min(finalBodyFat, 100)}%`;
  document.getElementById("bodyFatBar").style.backgroundColor = gaugeColor;

  document.getElementById("rFitness").innerText = fitnessScore;

  const riskBadge = document.getElementById("riskBadge");
  document.getElementById("rRisk").innerText = healthRisk;
  riskBadge.style.color = riskColor;
  riskBadge.style.backgroundColor = riskBg;
  riskBadge.style.borderColor = riskColor;

  document.getElementById("rLeanMass").innerText = `${leanBodyMass} kg`;
  document.getElementById("rFatMass").innerText = `${fatMass} kg`;
  document.getElementById("rIdealWeight").innerText = `${idealWeight} kg`;
  document.getElementById("rWeightRange").innerText =
    `${minHealthyWeight} - ${maxHealthyWeight} kg`;

  document.getElementById("rBMR").innerText = `${bmr} kcal`;
  document.getElementById("rCalories").innerText = `${dailyCalories} kcal`;
  document.getElementById("rWater").innerText = `${waterIntakeLitres} L`;
  document.getElementById("rProtein").innerText =
    `${proteinRequirementGrams} g`;
  document.getElementById("rBSA").innerText = `${bsa} m²`;
  document.getElementById("rMetabolicAge").innerText = `${metabolicAge} yrs`;
  document.getElementById("rBodyAge").innerText = `${biologicalBodyAge} yrs`;
  document.getElementById("rAdvice").innerText = adviceText;

  // 5. Update Highlighted Active Row in WHO Table
  document
    .querySelectorAll(".bmi-table tbody tr")
    .forEach((row) => row.classList.remove("active-row"));
  document.getElementById(activeRowId).classList.add("active-row");

  // 6. SVG Gauge Progress Calculations
  // Radius of standard main circle = 95 -> Circumference = 2 * PI * 95 ≈ 596.9
  const bmiMaxLimitRange = 45;
  const strokeDashOffsetBMI =
    596 - (Math.min(bmi, bmiMaxLimitRange) / bmiMaxLimitRange) * 596;
  const progressCircleBMI = document.getElementById("gaugeProgress");
  progressCircleBMI.style.strokeDashoffset = strokeDashOffsetBMI;
  progressCircleBMI.style.stroke = gaugeColor;

  // Radius of fitness validation loop = 70 -> Circumference = 2 * PI * 70 ≈ 439.8
  const strokeDashOffsetFitness = 440 - (fitnessScore / 100) * 440;
  document.getElementById("fitnessProgress").style.strokeDashoffset =
    strokeDashOffsetFitness;

  // 7. Initialize/Render Visual Charts Section
  renderCharts(bmi, weightKg, idealWeight, bmr);
}

/*==============================================================
    PREMIUM CHART.JS ENGINE
    Part 1
    Global Defaults
    Gradient Helpers
    Animation Helpers
    Destroy Lifecycle
    renderCharts() Initialization
==============================================================*/

/*--------------------------------------------------------------
    GLOBAL CHART.JS DEFAULTS
--------------------------------------------------------------*/

Chart.defaults.responsive = true;
Chart.defaults.maintainAspectRatio = false;

Chart.defaults.animation = {
  duration: 1800,
  easing: "easeOutQuart",
};

Chart.defaults.layout = {
  padding: 12,
};

Chart.defaults.font.family = "'Poppins','Segoe UI',sans-serif";

Chart.defaults.font.size = 13;

Chart.defaults.font.weight = "500";

Chart.defaults.color = "#b8c7da";

Chart.defaults.borderColor = "rgba(255,255,255,.08)";

Chart.defaults.scale.grid.color = "rgba(255,255,255,.06)";

Chart.defaults.scale.grid.drawBorder = false;

Chart.defaults.plugins.legend.display = true;

Chart.defaults.plugins.legend.position = "bottom";

Chart.defaults.plugins.legend.labels = {
  color: "#dbe7f7",

  boxWidth: 14,

  boxHeight: 14,

  useBorderRadius: true,

  borderRadius: 4,

  padding: 18,

  font: {
    size: 12,

    weight: "600",
  },
};

Chart.defaults.plugins.tooltip = {
  enabled: true,

  backgroundColor: "rgba(15,23,42,.96)",

  titleColor: "#ffffff",

  bodyColor: "#dbe7f7",

  borderColor: "rgba(0,212,255,.45)",

  borderWidth: 1,

  cornerRadius: 14,

  displayColors: true,

  padding: 14,

  caretSize: 8,

  titleFont: {
    size: 14,

    weight: "700",
  },

  bodyFont: {
    size: 13,

    weight: "500",
  },
};

/*--------------------------------------------------------------
    GRADIENT FACTORY
--------------------------------------------------------------*/

function createVerticalGradient(ctx, color1, color2) {
  const gradient = ctx.createLinearGradient(0, 0, 0, 350);

  gradient.addColorStop(0, color1);
  gradient.addColorStop(0.5, color2);
  gradient.addColorStop(1, "rgba(255,255,255,.03)");

  return gradient;
}

function createHorizontalGradient(ctx, color1, color2) {
  const gradient = ctx.createLinearGradient(0, 0, 450, 0);

  gradient.addColorStop(0, color1);
  gradient.addColorStop(1, color2);

  return gradient;
}

function createRadialGlow(ctx, color) {
  const gradient = ctx.createRadialGradient(220, 160, 30, 220, 160, 260);

  gradient.addColorStop(0, color);
  gradient.addColorStop(1, "rgba(255,255,255,0)");

  return gradient;
}

/*--------------------------------------------------------------
    COMMON AXIS STYLE
--------------------------------------------------------------*/

function premiumAxis() {
  return {
    ticks: {
      color: "#b9c7d9",

      padding: 10,

      font: {
        size: 12,

        weight: "600",
      },
    },

    grid: {
      color: "rgba(255,255,255,.06)",

      drawBorder: false,

      tickLength: 0,
    },
  };
}

/*--------------------------------------------------------------
    DESTROY OLD CHARTS
--------------------------------------------------------------*/

function destroyExistingCharts() {
  const chartList = [
    bmiChartInstance,

    weightChartInstance,

    calorieChartInstance,
  ];

  chartList.forEach((chart) => {
    if (chart) {
      chart.destroy();
    }
  });

  bmiChartInstance = null;
  weightChartInstance = null;
  calorieChartInstance = null;
}

/*--------------------------------------------------------------
    PREMIUM LOADER
--------------------------------------------------------------*/

function toggleChartLoader(show = true) {
  const loader = document.querySelector(".chart-loader");

  if (!loader) return;

  loader.style.opacity = show ? "1" : "0";

  loader.style.visibility = show ? "visible" : "hidden";
}

/*--------------------------------------------------------------
    START RENDER FUNCTION
--------------------------------------------------------------*/

function renderCharts(
  currentBMI,

  currentWeight,

  idealWeight,

  baseBmr,
) {
  toggleChartLoader(true);

  destroyExistingCharts();

  const ctxBmi = document.getElementById("bmiChart").getContext("2d");

  const ctxWeight = document.getElementById("weightChart").getContext("2d");

  const ctxCalorie = document.getElementById("calorieChart").getContext("2d");

  /*--------------------------------------------
        PREMIUM GRADIENTS
    --------------------------------------------*/

  const blueGradient = createVerticalGradient(ctxBmi, "#38bdf8", "#2563eb");

  const greenGradient = createVerticalGradient(ctxWeight, "#34d399", "#059669");

  const pinkGradient = createVerticalGradient(ctxCalorie, "#ec4899", "#8b5cf6");

  const orangeGradient = createVerticalGradient(ctxBmi, "#fb923c", "#f97316");

  const redGradient = createVerticalGradient(ctxBmi, "#fb7185", "#dc2626");

  /*==============================================================
    PART 2
    PREMIUM BMI BAR CHART
==============================================================*/

  /*--------------------------------------------
        DYNAMIC BMI BAR COLOR
    --------------------------------------------*/

  let bmiGradient;

  if (currentBMI < 18.5) {
    bmiGradient = blueGradient;
  } else if (currentBMI < 25) {
    bmiGradient = greenGradient;
  } else if (currentBMI < 30) {
    bmiGradient = orangeGradient;
  } else {
    bmiGradient = redGradient;
  }

  /*--------------------------------------------
        BMI BAR CHART
    --------------------------------------------*/

  bmiChartInstance = new Chart(ctxBmi, {
    type: "bar",

    data: {
      labels: ["Your BMI", "Healthy Limit", "Obesity"],

      datasets: [
        {
          label: "BMI Score",

          data: [currentBMI, 24.9, 30],

          backgroundColor: [
            bmiGradient,

            createVerticalGradient(ctxBmi, "#38bdf8", "#2563eb"),

            createVerticalGradient(ctxBmi, "#fb7185", "#dc2626"),
          ],

          borderColor: ["#22d3ee", "#3b82f6", "#ef4444"],

          borderWidth: 2,

          borderRadius: 18,

          borderSkipped: false,

          hoverBorderWidth: 3,

          hoverBorderColor: "#ffffff",

          hoverBackgroundColor: [bmiGradient, "#60a5fa", "#fb7185"],

          maxBarThickness: 65,

          categoryPercentage: 0.62,

          barPercentage: 0.72,
        },
      ],
    },

    options: {
      responsive: true,

      maintainAspectRatio: false,

      interaction: {
        intersect: false,

        mode: "index",
      },

      animation: {
        duration: 1800,

        easing: "easeOutExpo",
      },

      plugins: {
        legend: {
          display: false,
        },

        tooltip: {
          backgroundColor: "rgba(15,23,42,.96)",

          borderColor: "rgba(56,189,248,.40)",

          borderWidth: 1,

          padding: 14,

          cornerRadius: 14,

          displayColors: true,

          titleColor: "#ffffff",

          bodyColor: "#dbe7f7",

          titleFont: {
            size: 14,

            weight: "700",
          },

          bodyFont: {
            size: 13,

            weight: "500",
          },

          callbacks: {
            title(context) {
              return context[0].label;
            },

            label(context) {
              return " BMI : " + context.raw;
            },

            afterLabel(context) {
              if (context.raw < 18.5) return "Status : Underweight";

              if (context.raw < 25) return "Status : Healthy";

              if (context.raw < 30) return "Status : Overweight";

              return "Status : Obesity";
            },
          },
        },
      },

      scales: {
        x: premiumAxis(),

        y: {
          beginAtZero: true,

          suggestedMax: 40,

          ticks: {
            color: "#c7d5e7",

            stepSize: 5,

            padding: 8,

            font: {
              size: 12,

              weight: "600",
            },
          },

          grid: {
            color: "rgba(255,255,255,.06)",

            drawBorder: false,
          },
        },
      },

      hover: {
        mode: "nearest",

        animationDuration: 400,
      },
    },

    plugins: [
      {
        id: "premiumShadow",

        beforeDatasetsDraw(chart) {
          const { ctx } = chart;

          ctx.save();

          ctx.shadowColor = "rgba(0,212,255,.35)";

          ctx.shadowBlur = 22;

          ctx.shadowOffsetY = 8;
        },

        afterDatasetsDraw(chart) {
          chart.ctx.restore();
        },
      },

      {
        id: "valueLabels",

        afterDatasetsDraw(chart) {
          const { ctx } = chart;

          ctx.save();

          ctx.fillStyle = "#ffffff";

          ctx.font = "600 13px Poppins";

          ctx.textAlign = "center";

          chart.getDatasetMeta(0).data.forEach((bar, index) => {
            const value = chart.data.datasets[0].data[index];

            ctx.fillText(
              value,

              bar.x,

              bar.y - 10,
            );
          });

          ctx.restore();
        },
      },
    ],
  });

  /*==============================================================
    PART 3
    PREMIUM WEIGHT COMPARISON DOUGHNUT CHART
==============================================================*/

  /*--------------------------------------------
        WEIGHT DATA
    --------------------------------------------*/

  const weightDifference = Math.abs(currentWeight - idealWeight).toFixed(1);

  const isHealthyWeight = currentWeight <= idealWeight;

  /*--------------------------------------------
        WEIGHT DOUGHNUT
    --------------------------------------------*/
  const healthyWeight = idealWeight;
  const excessWeight = Math.max(currentWeight - idealWeight, 0);
  const remainingWeight =
    currentWeight <= idealWeight ? currentWeight : idealWeight;

  weightChartInstance = new Chart(ctxWeight, {
    type: "doughnut",

    data: {
      labels: ["Current Weight", "Ideal Weight"],

      datasets: [
        {
          label: "Weight",
          data: [remainingWeight, excessWeight || 0.1],

          backgroundColor: [
            createVerticalGradient(ctxWeight, "#22d3ee", "#2563eb"),

            createVerticalGradient(ctxWeight, "#34d399", "#059669"),
          ],

          backgroundColor: [
            createVerticalGradient(ctxWeight, "#22d3ee", "#2563eb"),

            createVerticalGradient(ctxWeight, "#34d399", "#059669"),
          ],
          borderWidth: 3,

          hoverBorderColor: "#ffffff",

          hoverBorderWidth: 4,

          hoverOffset: 16,

          spacing: 6,

          cutout: "72%",
        },
      ],
    },

    options: {
      responsive: true,

      maintainAspectRatio: false,

      animation: {
        animateRotate: true,

        animateScale: true,

        duration: 1800,

        easing: "easeOutExpo",
      },

      interaction: {
        mode: "nearest",

        intersect: false,
      },

      plugins: {
        legend: {
          position: "bottom",

          labels: {
            color: "#dbe7f7",

            usePointStyle: true,

            pointStyle: "circle",

            padding: 22,

            font: {
              size: 13,

              weight: "600",
            },
          },
        },

        tooltip: {
          backgroundColor: "rgba(15,23,42,.96)",

          borderColor: "rgba(52,211,153,.45)",

          borderWidth: 1,

          cornerRadius: 14,

          padding: 14,

          titleColor: "#ffffff",

          bodyColor: "#dbe7f7",

          displayColors: true,

          callbacks: {
            label(context) {
              return `${context.label}: ${context.raw} kg`;
            },

            afterBody() {
              return ["", `Difference : ${weightDifference} kg`];
            },
          },
        },
      },
    },

    plugins: [
      /*------------------------------------
                CENTER TEXT PLUGIN
            ------------------------------------*/

      {
        id: "centerWeightText",

        afterDraw(chart) {
          const { ctx } = chart;

          const meta = chart.getDatasetMeta(0);

          if (!meta.data.length) return;

          const x = meta.data[0].x;
          const y = meta.data[0].y;

          ctx.save();

          ctx.textAlign = "center";

          ctx.textBaseline = "middle";

          ctx.fillStyle = "#ffffff";

          ctx.font = "700 26px Poppins";

          ctx.fillText(
            currentWeight + " kg",

            x,

            y - 12,
          );

          ctx.fillStyle = "#94a3b8";

          ctx.font = "500 12px Poppins";

          ctx.fillText(
            "Current",

            x,

            y + 16,
          );

          ctx.restore();
        },
      },

      /*------------------------------------
                OUTER GLOW
            ------------------------------------*/

      {
        id: "weightGlow",

        beforeDatasetsDraw(chart) {
          const { ctx } = chart;

          ctx.save();

          ctx.shadowColor = "rgba(34,211,238,.35)";

          ctx.shadowBlur = 30;

          ctx.shadowOffsetY = 8;
        },

        afterDatasetsDraw(chart) {
          chart.ctx.restore();
        },
      },

      /*------------------------------------
                HEALTH STATUS
            ------------------------------------*/

      {
        id: "weightStatus",

        afterDraw(chart) {
          const ctx = chart.ctx;

          ctx.save();

          ctx.textAlign = "center";

          ctx.font = "600 13px Poppins";

          ctx.fillStyle = isHealthyWeight ? "#22c55e" : "#f59e0b";

          ctx.fillText(
            isHealthyWeight ? "Healthy Range" : "Above Ideal",

            chart.width / 2,

            chart.height - 12,
          );

          ctx.restore();
        },
      },
    ],
  });

  /*==============================================================
    PART 4
    PREMIUM DAILY CALORIE LINE CHART
==============================================================*/

  /*--------------------------------------------
        CALORIE DATA
    --------------------------------------------*/

  const calorieData = [
    Math.round(baseBmr * 1.2), // Sedentary

    Math.round(baseBmr * 1.375), // Light

    Math.round(baseBmr * 1.55), // Moderate

    Math.round(baseBmr * 1.725), // Active

    Math.round(baseBmr * 1.9), // Athlete
  ];

  /*--------------------------------------------
        LINE CHART
    --------------------------------------------*/

  calorieChartInstance = new Chart(ctxCalorie, {
    type: "line",

    data: {
      labels: ["Sedentary", "Light", "Moderate", "Active", "Athlete"],

      datasets: [
        {
          label: "Daily Calories",

          data: calorieData,

          borderColor: "#ec4899",

          backgroundColor: pinkGradient,

          fill: true,

          borderWidth: 4,

          tension: 0.42,

          pointRadius: 6,

          pointHoverRadius: 9,

          pointBorderWidth: 3,

          pointBorderColor: "#ffffff",

          pointBackgroundColor: "#ec4899",

          pointHoverBackgroundColor: "#ffffff",

          pointHoverBorderColor: "#ec4899",
        },
      ],
    },

    options: {
      responsive: true,

      maintainAspectRatio: false,

      interaction: {
        intersect: false,

        mode: "index",
      },

      animation: {
        duration: 2200,

        easing: "easeOutQuart",
      },

      plugins: {
        legend: {
          display: true,

          position: "bottom",
        },

        tooltip: {
          backgroundColor: "rgba(15,23,42,.96)",

          borderColor: "rgba(236,72,153,.45)",

          borderWidth: 1,

          cornerRadius: 14,

          padding: 14,

          titleColor: "#ffffff",

          bodyColor: "#dbe7f7",

          callbacks: {
            label(context) {
              return `${context.raw} kcal/day`;
            },
          },
        },
      },

      scales: {
        x: premiumAxis(),

        y: {
          beginAtZero: false,

          ticks: {
            color: "#144e9a",

            callback(value) {
              return value + " kcal";
            },
          },

          grid: {
            color: "rgba(255,255,255,.06)",

            drawBorder: false,
          },
        },
      },
    },

    plugins: [
      /*------------------------------------
                LINE GLOW
            ------------------------------------*/

      {
        id: "lineGlow",

        beforeDatasetsDraw(chart) {
          const ctx = chart.ctx;

          ctx.save();

          ctx.shadowColor = "rgba(236,72,153,.35)";

          ctx.shadowBlur = 25;
        },

        afterDatasetsDraw(chart) {
          chart.ctx.restore();
        },
      },

      /*------------------------------------
                VALUE LABELS
            ------------------------------------*/

      {
        id: "pointLabels",

        afterDatasetsDraw(chart) {
          const ctx = chart.ctx;

          ctx.save();

          ctx.font = "600 12px Poppins";

          ctx.fillStyle = "#3b2ed2";

          ctx.textAlign = "center";

          chart.getDatasetMeta(0).data.forEach((point, index) => {
            ctx.fillText(
              calorieData[index],

              point.x,

              point.y - 14,
            );
          });

          ctx.restore();
        },
      },
    ],
  });

  /*--------------------------------------------
        HIDE LOADER
    --------------------------------------------*/

  setTimeout(() => {
    toggleChartLoader(false);
  }, 800);
}

/*==============================================================
    END OF PREMIUM CHART ENGINE
==============================================================*/

// ==========================================================================
// EXPORT PIPELINE (html2canvas & jsPDF Execution)
// ==========================================================================
function downloadPDF() {
  const reportTarget = document.getElementById("report");

  // Configurations to handle clean high-definition rendering inputs
  const options = {
    scale: 2,
    useCORS: true,
    logging: false,
    backgroundColor: "#ffffff",
  };

  html2canvas(reportTarget, options)
    .then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const { jsPDF } = window.jspdf;

      // Define clean PDF spatial bounds properties
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 210; // A4 standard width dimension space metric
      const pageHeight = 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      // Loop handles layout pagination cases if report expands past page bounds
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save("Premium_BMI_Health_Report.pdf");
    })
    .catch((error) => {
      console.error("PDF engine extraction exception encountered:", error);
    });
}
// Place this snippet inside your calculateBMI() function (e.g., around step 4 where you update the DOM text)
const now = new Date();
const options = {
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: true,
};
const formattedDateTime = now.toLocaleDateString("en-US", options);

// Push to the DOM
document.getElementById("rTimestamp").innerText = formattedDateTime;
// Replace section (6) inside your original bmi.js with this viewport-aware layout mapping logic:
const isMobile = window.innerWidth <= 600;

// BMI Gauge Offset Calculation Mapping
const bmiMaxLimitRange = 45;
const bmiCircumference = isMobile ? 471 : 596;
const strokeDashOffsetBMI =
  bmiCircumference -
  (Math.min(bmi, bmiMaxLimitRange) / bmiMaxLimitRange) * bmiCircumference;
const progressCircleBMI = document.getElementById("gaugeProgress");
progressCircleBMI.style.strokeDasharray = `${bmiCircumference}`;
progressCircleBMI.style.strokeDashoffset = strokeDashOffsetBMI;
progressCircleBMI.style.stroke = gaugeColor;

// Fitness Gauge Offset Calculation Mapping
const fitnessCircumference = isMobile ? 345 : 440;
const strokeDashOffsetFitness =
  fitnessCircumference - (fitnessScore / 100) * fitnessCircumference;
const progressCircleFitness = document.getElementById("fitnessProgress");
progressCircleFitness.style.strokeDasharray = `${fitnessCircumference}`;
progressCircleFitness.style.strokeDashoffset = strokeDashOffsetFitness;
