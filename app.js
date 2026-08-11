// =========================
// MENU DATA
// =========================

const menuItems = [
    {
        name: "Classic Burger",
        icon: "🍔",
        satisfaction: 98,
        rating: 5,
        status: "Excellent"
    },
    {
        name: "Crispy Fries",
        icon: "🍟",
        satisfaction: 91,
        rating: 4,
        status: "Great"
    },
    {
        name: "Street Tacos",
        icon: "🌮",
        satisfaction: 87,
        rating: 4,
        status: "Good"
    },
    {
        name: "Garden Salad",
        icon: "🥗",
        satisfaction: 95,
        rating: 5,
        status: "Excellent"
    }
];

// =========================
// ALERT DATA
// =========================

const alerts = [
    {
        icon: "🟢",
        title: "Kitchen Running Smoothly",
        message: "No issues detected during the last hour."
    },
    {
        icon: "🟡",
        title: "Dining Room Wait",
        message: "Average wait time increased to 12 minutes."
    },
    {
        icon: "🔴",
        title: "Fryer Temperature",
        message: "Oil temperature dropped below target."
    },
    {
        icon: "🤖",
        title: "AI Coach",
        message: "Recommend checking burger prep consistency."
    }
];

// =========================
// MENU CARDS
// =========================

// =========================
// REVENUE TREND CHART
// =========================

const revenueCanvas = document.getElementById("revenueChart");

const revenueChart = new Chart(revenueCanvas, {
    type: "line",

    data: {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],

        datasets: [
            {
                label: "Revenue",
                data: [5200, 6100, 5800, 6900, 7200, 8050, 6670],
                borderColor: "#2563eb",
                backgroundColor: "rgba(37, 99, 235, 0.16)",
                borderWidth: 3,
                fill: true,
                tension: 0.35,
                pointRadius: 5,
                pointHoverRadius: 7
            }
        ]
    },

    options: {
        responsive: true,
        maintainAspectRatio: false,

        plugins: {
            legend: {
                display: false
            },

            tooltip: {
                callbacks: {
                    label: function(context) {
                        return `$${context.raw.toLocaleString()}`;
                    }
                }
            }
        },

        scales: {
            y: {
                beginAtZero: false,

                ticks: {
                    callback: function(value) {
                        return `$${value.toLocaleString()}`;
                    }
                }
            },

            x: {
                grid: {
                    display: false
                }
            }
        }
    }
});

const menuCards = document.getElementById("menuCards");

function createStars(rating) {
    return "★".repeat(rating) + "☆".repeat(5 - rating);
}

function renderMenuCards() {
    menuCards.innerHTML = menuItems
        .map((item) => {
            return `
                <article class="menu-card">
                    <div class="menu-card-header">
                        <span class="menu-item-icon">${item.icon}</span>
                        <span class="menu-score">${item.satisfaction}%</span>
                    </div>

                    <h4>${item.name}</h4>

                    <div class="star-rating">
                        ${createStars(item.rating)}
                    </div>

                    <div class="menu-progress">
                        <div
                            class="menu-progress-fill"
                            style="width: ${item.satisfaction}%"
                        ></div>
                    </div>

                    <div class="menu-card-footer">
                        <span>Customer satisfaction</span>
                        <strong>${item.status}</strong>
                    </div>
                </article>
            `;
        })
        .join("");
}

// =========================
// CHART
// =========================

const chartCanvas = document.getElementById("trendChart");
const chartContext = chartCanvas.getContext("2d");

const chartGradient = chartContext.createLinearGradient(0, 0, 0, 320);

chartGradient.addColorStop(0, "rgba(37, 99, 235, 0.35)");
chartGradient.addColorStop(1, "rgba(37, 99, 235, 0)");

const trendChart = new Chart(chartCanvas, {
    type: "line",

    data: {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],

        datasets: [
            {
                label: "Food Quality Score",
                data: [82, 85, 84, 89, 91, 88, 94],
                borderColor: "#2563eb",
                backgroundColor: chartGradient,
                fill: true,
                borderWidth: 3,
                tension: 0.4,
                pointRadius: 4,
                pointHoverRadius: 7,
                pointBackgroundColor: "#ffffff",
                pointBorderColor: "#2563eb",
                pointBorderWidth: 3
            }
        ]
    },

    options: {
        responsive: true,
        maintainAspectRatio: false,

        interaction: {
            intersect: false,
            mode: "index"
        },

        plugins: {
            legend: {
                display: false
            },

            tooltip: {
                backgroundColor: "#111827",
                padding: 12,
                displayColors: false,

                callbacks: {
                    label(context) {
                        return `Quality score: ${context.raw}%`;
                    }
                }
            }
        },

        scales: {
            x: {
                grid: {
                    display: false
                },

                border: {
                    display: false
                },

                ticks: {
                    color: "#6b7280"
                }
            },

            y: {
                min: 70,
                max: 100,

                border: {
                    display: false
                },

                grid: {
                    color: "rgba(148, 163, 184, 0.18)"
                },

                ticks: {
                    stepSize: 5,
                    color: "#6b7280",

                    callback(value) {
                        return `${value}%`;
                    }
                }
            }
        }
    }
});

// =========================
// ALERTS
// =========================

const alertsList = document.getElementById("alertsList");

function updateAlerts(healthScore, prepTime, rating) {
    alerts.length = 0;

    if (healthScore < 90) {
        alerts.push({
            icon: "🍟",
            title: "Food Quality Dropping",
            message: "Restaurant health score is below target."
        });
    }

    if (prepTime > 8) {
        alerts.push({
            icon: "⏱️",
            title: "Kitchen Slowdown",
            message: "Average prep time is increasing."
        });
    }

    if (rating < 4.7) {
        alerts.push({
            icon: "⭐",
            title: "Customer Satisfaction",
            message: "Customer ratings have decreased."
        });
    }

    if (alerts.length === 0) {
        alerts.push({
            icon: "🟢",
            title: "Operations Running Smoothly",
            message: "All restaurant metrics are healthy."
        });
    }

    renderAlerts();
}

function renderAlerts() {
    alertsList.innerHTML = alerts
        .map((alert) => {
            return `
                <div class="alert-card">
                    <div class="alert-icon">${alert.icon}</div>

                    <div>
                        <h4>${alert.title}</h4>
                        <p>${alert.message}</p>
                    </div>
                </div>
            `;
        })
        .join("");
}

// =========================
// REFRESH DASHBOARD
// =========================

const refreshButton = document.getElementById("refreshBtn");
const restaurantScore = document.getElementById("restaurantScore");
const healthMeterFill = document.getElementById("healthMeterFill");

function refreshDashboard() {
    const newScore = Math.floor(Math.random() * 11) + 85;

    restaurantScore.textContent = `${newScore}%`;
    healthMeterFill.style.width = `${newScore}%`;

    trendChart.data.datasets[0].data =
        trendChart.data.datasets[0].data.map(() => {
            return Math.floor(Math.random() * 16) + 82;
        });

    trendChart.update();

    refreshButton.textContent = "Dashboard Updated ✓";

    setTimeout(() => {
        refreshButton.textContent = "Refresh Dashboard";
    }, 1500);
}

refreshButton.addEventListener("click", refreshDashboard);

// =========================
// DARK MODE
// =========================

const themeToggle = document.getElementById("themeToggle");

themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    const darkModeEnabled = document.body.classList.contains("dark-mode");

    themeToggle.textContent = darkModeEnabled ? "☀️" : "🌙";

    localStorage.setItem(
        "mambaInsightTheme",
        darkModeEnabled ? "dark" : "light"
    );
});

const savedTheme = localStorage.getItem("mambaInsightTheme");

if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
    themeToggle.textContent = "☀️";
}

// =========================
// AI RESTAURANT COACH
// =========================

const aiInsightsButton = document.getElementById("aiInsightsBtn");
const aiModal = document.getElementById("aiModal");
const closeAiModal = document.getElementById("closeAiModal");

const aiHealthScore = document.getElementById("aiHealthScore");
const aiSummaryText = document.getElementById("aiSummaryText");
const strengthsList = document.getElementById("strengthsList");
const warningsList = document.getElementById("warningsList");
const aiRecommendation = document.getElementById("aiRecommendation");
const aiImpact = document.getElementById("aiImpact");

function createInsightItem(icon, text) {
    return `
        <div class="insight-item">
            <span>${icon}</span>
            <p>${text}</p>
        </div>
    `;
}

function generateAiInsights() {
    const score = Number.parseInt(restaurantScore.textContent, 10);
    const prepTime = Number.parseInt(
        document.getElementById("prepTime").textContent,
        10
    );
    const rating = Number.parseFloat(
        document.getElementById("averageRating").textContent
    );

    const lowestMenuItem = [...menuItems].sort(
        (a, b) => a.satisfaction - b.satisfaction
    )[0];

    const strengths = [];
    const warnings = [];

    if (score >= 90) {
        strengths.push("Overall restaurant performance is excellent.");
    } else {
        warnings.push("The restaurant health score has room to improve.");
    }

    if (rating >= 4.7) {
        strengths.push(`Customer rating remains strong at ${rating}.`);
    } else {
        warnings.push(`Customer rating has fallen to ${rating}.`);
    }

    if (prepTime <= 7) {
        strengths.push(`Average prep time is efficient at ${prepTime} minutes.`);
    } else {
        warnings.push(`Prep time is elevated at ${prepTime} minutes.`);
    }

    warnings.push(
        `${lowestMenuItem.name} has the lowest satisfaction score at ${lowestMenuItem.satisfaction}%.`
    );

    aiHealthScore.textContent = `${score}%`;

    aiSummaryText.textContent =
        score >= 90
            ? "Operations are strong overall. Focus on the lowest-performing menu item to protect consistency."
            : "Performance is stable, but several operational areas need attention today.";

    strengthsList.innerHTML = strengths
        .map((item) => createInsightItem("✓", item))
        .join("");

    warningsList.innerHTML = warnings
        .map((item) => createInsightItem("⚠", item))
        .join("");

    aiRecommendation.textContent =
        `Review the preparation process for ${lowestMenuItem.name} and coach the team on portioning, temperature, and holding time.`;

    aiImpact.textContent =
        "Expected impact: higher consistency, fewer complaints, and a stronger restaurant health score.";
}

function openAiCoach() {
    generateAiInsights();
    aiModal.classList.add("open");
}

function closeAiCoach() {
    aiModal.classList.remove("open");
}

aiInsightsButton.addEventListener("click", openAiCoach);
closeAiModal.addEventListener("click", closeAiCoach);

aiModal.addEventListener("click", (event) => {
    if (event.target === aiModal) {
        closeAiCoach();
    }
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeAiCoach();
    }
});

// =========================
// PERFORMANCE PREDICTOR
// =========================

const generatePredictionButton = document.getElementById(
    "generatePredictionBtn"
);

const predictionResult = document.getElementById("predictionResult");
const predictedOutcome = document.getElementById("predictedOutcome");
const predictionConfidence = document.getElementById(
    "predictionConfidence"
);
const predictionReason = document.getElementById("predictionReason");
const predictionAction = document.getElementById("predictionAction");
const predictionImpact = document.getElementById("predictionImpact");

function generatePerformancePrediction() {
    const score = Number.parseInt(restaurantScore.textContent, 10);

    const prepTimeValue = Number.parseInt(
        document.getElementById("prepTime").textContent,
        10
    );

    const ratingValue = Number.parseFloat(
        document.getElementById("averageRating").textContent
    );

    const lowestMenuItem = [...menuItems].sort(
        (a, b) => a.satisfaction - b.satisfaction
    )[0];

    let outcome;
    let confidence;
    let reason;
    let action;
    let impact;

    if (score >= 92 && prepTimeValue <= 7 && ratingValue >= 4.7) {
        outcome = "Strong next service";
        confidence = 93;
        reason =
            "Health score, customer rating, and preparation speed are all performing at strong levels.";
        action =
            `Maintain current staffing and monitor ${lowestMenuItem.name} for consistency.`;
        impact =
            "Estimated impact: customer satisfaction should remain stable or improve slightly.";
    } else if (score >= 85 && prepTimeValue <= 8) {
        outcome = "Stable, with one risk area";
        confidence = 88;
        reason =
            `${lowestMenuItem.name} is currently the lowest-performing item at ${lowestMenuItem.satisfaction}%.`;
        action =
            `Review the preparation process for ${lowestMenuItem.name} before the next rush.`;
        impact =
            "Estimated impact: preventing a small quality decline could protect customer ratings.";
    } else {
        outcome = "Performance decline likely";
        confidence = 91;
        reason =
            "Current health score, preparation time, or customer rating indicates operational pressure.";
        action =
            "Reassign one team member to the busiest station and review holding times before peak service.";
        impact =
            "Estimated impact: faster ticket times, fewer complaints, and improved food consistency.";
    }

    predictedOutcome.textContent = outcome;
    predictionConfidence.textContent = `${confidence}%`;
    predictionReason.textContent = `Reason: ${reason}`;
    predictionAction.textContent = `Suggested action: ${action}`;
    predictionImpact.textContent = impact;

    predictionResult.classList.remove("hidden");

    generatePredictionButton.textContent = "Prediction Generated ✓";

    setTimeout(() => {
        generatePredictionButton.textContent = "Generate Prediction";
    }, 1600);
}

generatePredictionButton.addEventListener(
    "click",
    generatePerformancePrediction
);

// =========================
// AI PRIORITY CENTER
// =========================

const openPriorityCoach = document.getElementById("openPriorityCoach");
const completePriority = document.getElementById("completePriority");

const priorityTitle = document.getElementById("priorityTitle");
const priorityDescription = document.getElementById("priorityDescription");
const dashboardPriorityTitle = document.getElementById("dashboardPriorityTitle");
const dashboardPriorityDescription = document.getElementById("dashboardPriorityDescription");
const priorityImpact = document.getElementById("priorityImpact");
const priorityLevel = document.getElementById("priorityLevel");
const priorityConfidence = document.getElementById("priorityConfidence");

openPriorityCoach.addEventListener("click", () => {
    generateAiInsights();
    aiModal.classList.add("open");
});

completePriority.addEventListener("click", () => {
    priorityLevel.textContent = "Completed";
    priorityTitle.textContent = "Priority completed";
    priorityDescription.textContent =
        "The restaurant team completed today's recommended action.";
    priorityImpact.textContent =
        "Mamba Insight will generate a new priority after the next dashboard refresh.";
    priorityConfidence.textContent = "Completed ✓";

    completePriority.textContent = "Completed ✓";
    completePriority.disabled = true;
});

// =========================
// EXECUTIVE SUMMARY ENGINE
// =========================

function updateExecutiveSummary(
    healthScore,
    revenue,
    rating,
    prepTime
) {
    const executiveStatus =
        document.getElementById("executiveStatus");

    const executiveSummaryText =
        document.getElementById("executiveSummaryText");

    const executiveRecommendation =
        document.getElementById("executiveRecommendation");

    const executiveRevenue =
        document.getElementById("executiveRevenue");

    const executiveRating =
        document.getElementById("executiveRating");

    const executiveHealth =
        document.getElementById("executiveHealth");

    const executivePrepTime =
        document.getElementById("executivePrepTime");

    // Update the four highlight cards
    executiveRevenue.textContent =
        `$${revenue.toLocaleString()}`;

    executiveRating.textContent =
        `${rating.toFixed(1)} ⭐`;

    executiveHealth.textContent =
        `${healthScore}%`;

    executivePrepTime.textContent =
        `${prepTime} min`;

    // Remove the old status color
    executiveStatus.classList.remove(
        "healthy",
        "warning",
        "critical"
    );

    if (
        healthScore >= 95 &&
        prepTime <= 7 &&
        rating >= 4.7
    ) {
        executiveStatus.textContent = "Excellent";
        executiveStatus.classList.add("healthy");

        executiveSummaryText.textContent =
            "Restaurant performance is excellent. Customer satisfaction is strong, food quality is above target, and kitchen operations are running efficiently.";

        executiveRecommendation.textContent =
            "Maintain current procedures and recognize the team for strong performance.";
    } else if (
        healthScore >= 90 &&
        prepTime <= 9 &&
        rating >= 4.5
    ) {
        executiveStatus.textContent = "Stable";
        executiveStatus.classList.add("warning");

        executiveSummaryText.textContent =
            "Restaurant performance is stable, but small operational changes should be monitored before they become larger problems.";

        executiveRecommendation.textContent =
            "Monitor kitchen consistency and review the lowest-performing menu item during the next shift.";
    } else {
        executiveStatus.textContent = "Needs Attention";
        executiveStatus.classList.add("critical");

        executiveSummaryText.textContent =
            "Restaurant performance requires attention. One or more key metrics are outside the recommended operating range.";

        executiveRecommendation.textContent =
            "Review prep times, food quality, and customer feedback with the shift manager immediately.";
    }
}

// =========================
// PERFORMANCE TRENDS ENGINE
// =========================

function updatePerformanceTrends() {
    const revenueTrend = document.getElementById("revenueTrend");
    const qualityTrend = document.getElementById("qualityTrend");
    const prepTrend = document.getElementById("prepTrend");
    const ratingTrend = document.getElementById("ratingTrend");

    const revenueChange = Number((Math.random() * 18 - 3).toFixed(1));
    const qualityChange = Number((Math.random() * 8 - 2).toFixed(1));
    const prepChange = Number((Math.random() * 3 - 1.5).toFixed(1));
    const ratingChange = Number((Math.random() * 0.6 - 0.2).toFixed(1));

    setTrendValue(revenueTrend, revenueChange, "%", true);
    setTrendValue(qualityTrend, qualityChange, "%", true);
    setTrendValue(prepTrend, prepChange, " min", false);
    setTrendValue(ratingTrend, ratingChange, "", true);
}

function setTrendValue(element, value, suffix, higherIsBetter) {
    const isPositive = higherIsBetter ? value >= 0 : value <= 0;

    element.classList.remove("trend-positive", "trend-negative");
    element.classList.add(
        isPositive ? "trend-positive" : "trend-negative"
    );

    const sign = value > 0 ? "+" : "";
    element.textContent = `${sign}${value}${suffix}`;
}

// =========================
// AI FORECAST ENGINE
// =========================

function updateForecast(
    currentRevenue,
    currentRating,
    currentPrepTime,
    healthScore
) {
    const forecastRevenue =
        document.getElementById("forecastRevenue");

    const forecastRating =
        document.getElementById("forecastRating");

    const forecastPrep =
        document.getElementById("forecastPrep");

    const forecastRisk =
        document.getElementById("forecastRisk");

    const forecastText =
        document.getElementById("forecastText");

    const revenueGrowth =
        1 + (Math.random() * 0.16 - 0.03);

    const predictedRevenue =
        Math.round(currentRevenue * revenueGrowth);

    const predictedRating = Math.min(
        5,
        Math.max(
            1,
            currentRating + (Math.random() * 0.2 - 0.05)
        )
    );

    const predictedPrepTime = Math.min(
        15,
        Math.max(
            3,
            currentPrepTime + Math.floor(Math.random() * 3) - 1
        )
    );

    let riskLevel = "LOW";
    let predictionMessage =
        "Tomorrow is expected to remain stable. Maintain current staffing and preparation levels.";

    if (
        healthScore < 90 ||
        predictedPrepTime > 9 ||
        predictedRating < 4.6
    ) {
        riskLevel = "HIGH";
        predictionMessage =
            "Tomorrow may require additional attention. Review staffing, food quality, and kitchen readiness before peak service.";
    } else if (
        healthScore < 95 ||
        predictedPrepTime > 7
    ) {
        riskLevel = "MEDIUM";
        predictionMessage =
            "Moderate operational pressure is expected tomorrow. Prepare extra ingredients and monitor kitchen consistency during peak hours.";
    }

    forecastRevenue.textContent =
        `$${predictedRevenue.toLocaleString()}`;

    forecastRating.textContent =
        `${predictedRating.toFixed(1)} ⭐`;

    forecastPrep.textContent =
        `${predictedPrepTime} min`;

    forecastRisk.textContent = riskLevel;
    forecastText.textContent = predictionMessage;
}

// =========================
// MAMBA AI COACH V1
// =========================

// =========================
// MAMBA AI COACH V1
// =========================

function updateAICoach(
    healthScore,
    prepTime,
    rating,
    revenue
) {
    const coachTitle =
        document.getElementById("coachTitle");

    const coachMessage =
        document.getElementById("coachMessage");

    // RED — serious operational problem
    if (healthScore <= 88 || prepTime >= 10) {

        coachTitle.textContent =
            "Kitchen performance needs immediate attention";

        coachMessage.textContent =
            `Health is ${healthScore}% with an average prep time of ${prepTime} minutes. Review kitchen flow, fryer consistency, and peak-hour preparation.`;

    }

    // ORANGE — customer experience slipping
    else if (rating <= 4.7) {

        coachTitle.textContent =
            "Customer experience should be reviewed";

        coachMessage.textContent =
            `Customer rating is currently ${rating.toFixed(1)} stars. Review recent feedback and identify which menu items or service issues need attention.`;

    }

    // YELLOW — kitchen starting to slow
    else if (prepTime >= 8) {

        coachTitle.textContent =
            "Kitchen speed is beginning to slow";

        coachMessage.textContent =
            `Average prep time has reached ${prepTime} minutes. Consider improving prep before peak service and monitoring the busiest station.`;

    }

    // GREEN — strong performance
    else if (healthScore >= 92 && prepTime <= 6) {

        coachTitle.textContent =
            "Restaurant is performing strongly";

        coachMessage.textContent =
            `Health is ${healthScore}% and prep time is only ${prepTime} minutes. Current kitchen procedures are working well. Maintain the team's current approach.`;

    }

    // NORMAL
    else {

        coachTitle.textContent =
            "Restaurant performance is stable";

        coachMessage.textContent =
            `Health is ${healthScore}% with a ${rating.toFixed(1)} star rating and ${prepTime}-minute prep time. Continue monitoring service and kitchen consistency.`;

    }
}
    const coachTitle =
        document.getElementById("coachTitle");

    const coachMessage =
        document.getElementById("coachMessage");

    if (
        healthScore < 90 &&
        prepTime > 8
    ) {
        coachTitle.textContent =
            "Kitchen slowdown is affecting performance";

        coachMessage.textContent =
            `Health is ${healthScore}% and prep time is ${prepTime} minutes. Focus on kitchen flow, fryer consistency, and peak-hour preparation.`;
    } else if (
        rating < 4.6
    ) {
        coachTitle.textContent =
            "Customer satisfaction needs attention";

        coachMessage.textContent =
            `Customer rating is ${rating.toFixed(1)} stars. Review recent feedback and identify the menu item causing the most complaints.`;
    } else if (
        revenue >= 8000 &&
        prepTime > 7
    ) {
        coachTitle.textContent =
            "High demand is putting pressure on the kitchen";

        coachMessage.textContent =
            `Revenue has reached $${revenue.toLocaleString()}, while prep time is ${prepTime} minutes. Prepare more before peak service and consider shifting staff to the busiest station.`;
    } else if (
        healthScore >= 95 &&
        prepTime <= 7 &&
        rating >= 4.7
    ) {
        coachTitle.textContent =
            "Restaurant is performing exceptionally";

        coachMessage.textContent =
            "Food quality, kitchen speed, and customer satisfaction are all strong. Maintain current procedures and recognize the team.";
    } else {
        coachTitle.textContent =
            "Restaurant performance is stable";

        coachMessage.textContent =
            "Operations are within a normal range. Continue monitoring kitchen consistency and the lowest-performing menu item.";
    }


// =========================
// START APPLICATION
// =========================

// ======================
// AI DECISION ENGINE
// ======================


  // =========================
// AI DECISION ENGINE V2
// =========================

function updateAIPriority(
    healthScore,
    prepTime,
    rating,
    revenue
) {
    if (
        healthScore < 90 &&
        prepTime > 8
    ) {
        priorityLevel.textContent = "HIGH PRIORITY";
        priorityTitle.textContent =
            "Kitchen performance is affecting food quality";

        priorityDescription.textContent =
            `Health is ${healthScore}% and prep time is ${prepTime} minutes. Kitchen speed and consistency both need attention.`;

        priorityImpact.textContent =
            "Recommended action: add line support, inspect the fryer station, and review peak-hour preparation.";

        priorityConfidence.textContent =
            "97% confidence";
    } else if (
        rating < 4.6
    ) {
        priorityLevel.textContent = "HIGH PRIORITY";
        priorityTitle.textContent =
            "Customer satisfaction is declining";

        priorityDescription.textContent =
            `The current rating is ${rating.toFixed(1)} stars, which is below the target range.`;

        priorityImpact.textContent =
            "Recommended action: review recent feedback and identify the menu item causing the most complaints.";

        priorityConfidence.textContent =
            "95% confidence";
    } else if (
        revenue >= 8000 &&
        prepTime > 7
    ) {
        priorityLevel.textContent = "MEDIUM PRIORITY";
        priorityTitle.textContent =
            "Demand is increasing faster than kitchen capacity";

        priorityDescription.textContent =
            `Revenue has reached $${revenue.toLocaleString()}, while prep time is ${prepTime} minutes.`;

        priorityImpact.textContent =
            "Recommended action: prepare additional ingredients and add one cook during the busiest service period.";

        priorityConfidence.textContent =
            "94% confidence";
    } else if (
        healthScore >= 95 &&
        prepTime <= 7 &&
        rating >= 4.7
    ) {
        priorityLevel.textContent = "LOW PRIORITY";
        priorityTitle.textContent =
            "Restaurant performing exceptionally";

        priorityDescription.textContent =
            "Food quality, kitchen efficiency, and customer satisfaction are all within excellent ranges.";

        priorityImpact.textContent =
            "Recommended action: maintain current procedures and recognize the team’s performance.";

        priorityConfidence.textContent =
            "99% confidence";
    } else {
        priorityLevel.textContent = "MEDIUM PRIORITY";
        priorityTitle.textContent =
            "Monitor kitchen consistency";

        priorityDescription.textContent =
            "Restaurant performance is stable, but small changes in speed or quality should be monitored.";

        priorityImpact.textContent =
            "Recommended action: review the lowest-performing menu item during the next shift.";

        priorityConfidence.textContent =
            "92% confidence";
    }
        dashboardPriorityTitle.textContent =
        priorityTitle.textContent;

       dashboardPriorityDescription.textContent =
       priorityDescription.textContent;
}



renderMenuCards();
renderAlerts();

// =========================
// LIVE DASHBOARD SIMULATION
// =========================

function updateLiveDashboard() {
    const ordersElement = document.getElementById("ordersCount");
    const revenueElement = document.getElementById("revenueAmount");
    const ratingElement = document.getElementById("averageRating");
    const prepTimeElement = document.getElementById("prepTime");
    const healthScoreElement = document.getElementById("restaurantScore");
    const healthMeterElement = document.getElementById("healthMeterFill");

    // Read the current dashboard values
    const currentOrders =
        Number(ordersElement.textContent.replace(/,/g, "")) || 423;

    const currentRevenue =
        Number(revenueElement.textContent.replace(/[$,]/g, "")) || 6842;

    const currentRating =
        Number(ratingElement.textContent) || 4.8;

    const currentPrepTime =
        Number(prepTimeElement.textContent.replace(/[^\d]/g, "")) || 7;

    // Create realistic new values
    const newOrders = currentOrders + Math.floor(Math.random() * 8) + 1;
    const newRevenue = currentRevenue + Math.floor(Math.random() * 180) + 25;

    const ratingChange = Math.random() * 0.08 - 0.04;
    const newRating = Math.min(
        5,
        Math.max(1, currentRating + ratingChange)
    );

    const prepChange = Math.floor(Math.random() * 3) - 1;
    const newPrepTime = Math.min(
        15,
        Math.max(3, currentPrepTime + prepChange)
    );

    const newHealthScore = Math.floor(Math.random() * 8) + 87;

    // Update the metric cards
    ordersElement.textContent = newOrders.toLocaleString();
    revenueElement.textContent = `$${newRevenue.toLocaleString()}`;
    ratingElement.textContent = newRating.toFixed(1);
    prepTimeElement.textContent = `${newPrepTime} min`;

    // Update restaurant health
    healthScoreElement.textContent = `${newHealthScore}%`;
    healthMeterElement.style.width = `${newHealthScore}%`;

    updateAIPriority(
    newHealthScore,
    newPrepTime,
    newRating,
    newRevenue
);

    updateAlerts(newHealthScore, newPrepTime, newRating);

    updateExecutiveSummary(
    newHealthScore,
    newRevenue,
    newRating,
    newPrepTime
);

updatePerformanceTrends();

updateForecast(
    newRevenue,
    newRating,
    newPrepTime,
    newHealthScore
);

updateAICoach(
    newHealthScore,
    newPrepTime,
    newRating,
    newRevenue
);


    // Update the revenue chart
    if (typeof revenueChart !== "undefined") {
        const revenueData = revenueChart.data.datasets[0].data;

        revenueData.shift();
        revenueData.push(newRevenue);

        revenueChart.update();
    }

    // Update the food-quality chart
    if (typeof trendChart !== "undefined") {
        const qualityData = trendChart.data.datasets[0].data;

        qualityData.shift();
        qualityData.push(newHealthScore);

        trendChart.update();
    }

    console.log("Mamba Insight live dashboard updated");
}

// Update the dashboard every 8 seconds
setInterval(updateLiveDashboard, 8000);

