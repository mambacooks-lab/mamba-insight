const menuItems = [
  {
    name: "🍔 Burger",
    label: "Burger",
    positiveReviews: 91,
    negativeReviews: 9,
    score: 91
  },
  {
    name: "🍟 Fries",
    label: "Fries",
    positiveReviews: 74,
    negativeReviews: 26,
    score: 74
  },
  {
    name: "🌮 Tacos",
    label: "Tacos",
    positiveReviews: 96,
    negativeReviews: 4,
    score: 96
  }
];
const ordersCount = document.getElementById("ordersCount");
const revenueAmount = document.getElementById("revenueAmount");
const averageRating = document.getElementById("averageRating");
const prepTime = document.getElementById("prepTime");
const alertsList = document.getElementById("alertsList");
const restaurantScore = document.getElementById("restaurantScore");
const menuCards = document.getElementById("menuCards");
const mostLovedText = document.getElementById("mostLovedText");
const needsAttentionText = document.getElementById("needsAttentionText");
const healthMeterFill = document.getElementById("healthMeterFill");
const trendChart = document.getElementById("trendChart");
const scoreHistory = [];

function updateRestaurantScore() {
  const total = menuItems.reduce((sum, item) => sum + item.score, 0);
  const average = Math.round(total / menuItems.length);

  restaurantScore.textContent = `${average}%`;
  healthMeterFill.style.width = `${average}%`;

  if (average >= 90) {
    healthMeterFill.style.background = "#22c55e";
  } else if (average >= 80) {
    healthMeterFill.style.background = "#fbbf24";
  } else {
    healthMeterFill.style.background = "#ef4444";
  }
   updateTrendChart(average);
}

function calculateScore(item) {
  const totalReviews =
    item.positiveReviews + item.negativeReviews;

  item.score = Math.round(
    (item.positiveReviews / totalReviews) * 100
  );
}

function displayMenuCards() {
  menuCards.innerHTML = "";

  menuItems.forEach(item => {
    let colorClass = "";

    if (item.score >= 90) {
      colorClass = "green";
    } else if (item.score >= 80) {
      colorClass = "yellow";
    } else {
      colorClass = "red";
    }

    menuCards.innerHTML += `
  <div class="card">
    <h2>${item.name}</h2>

    <div class="feedback-counts">
      <span>👍 ${item.positiveReviews}</span>
      <span>👎 ${item.negativeReviews}</span>
    </div>

    <p>Customer Satisfaction</p>

    <div class="score ${colorClass}">
      ${item.score}%
    </div>
  </div>
`;
});
}

function updateOperations() {
  ordersCount.textContent =
    operationsData.orders.toLocaleString();

  revenueAmount.textContent =
    `$${operationsData.revenue.toLocaleString()}`;

  averageRating.textContent =
    operationsData.rating.toFixed(1);

  prepTime.textContent =
    `${operationsData.prepTime} min`;
}

function updateAlerts() {
  alertsList.innerHTML = "";

  menuItems.forEach(item => {
    let alertType = "";
    let alertTitle = "";
    let alertMessage = "";
    let recommendation = "";

    if (item.score < 80) {
      alertType = "alert-critical";
      alertTitle = `🔴 Critical Alert: ${item.label}`;
      alertMessage = `${item.label} has dropped to ${item.score}%.`;
      recommendation =
        item.label === "Fries"
          ? "Check fryer temperature, oil quality, and hold time."
          : "Review preparation, temperature, and customer complaints.";
    } else if (item.score < 90) {
      alertType = "alert-warning";
      alertTitle = `🟡 Watch List: ${item.label}`;
      alertMessage = `${item.label} is currently at ${item.score}%.`;
      recommendation = "Monitor the next customer reviews closely.";
    } else {
      alertType = "alert-success";
      alertTitle = `🟢 Strong Performance: ${item.label}`;
      alertMessage = `${item.label} is performing well at ${item.score}%.`;
      recommendation = "Maintain the current preparation process.";
    }

    alertsList.innerHTML += `
      <div class="alert-card ${alertType}">
        <h3>${alertTitle}</h3>
        <p>${alertMessage}</p>
        <p><strong>Recommended action:</strong> ${recommendation}</p>
      </div>
    `;
  });
}

const operationsData = {
  orders: 423,
  revenue: 6842,
  rating: 4.8,
  prepTime: 7
};

function updateInsights() {
  const highestItem = menuItems.reduce((highest, item) => {
    return item.score > highest.score ? item : highest;
  });

  const lowestItem = menuItems.reduce((lowest, item) => {
    return item.score < lowest.score ? item : lowest;
  });

  mostLovedText.textContent =
    `${highestItem.label} is today's top performer at ${highestItem.score}%.`;

  needsAttentionText.textContent =
    `${lowestItem.label} currently has the lowest quality score at ${lowestItem.score}%.`;
}

displayMenuCards();
updateInsights();
updateAlerts();
updateRestaurantScore();

document.getElementById("refreshBtn").addEventListener("click", () => {
  menuItems.forEach(item => {
    item.score = Math.floor(Math.random() * 21) + 80;
  });

  displayMenuCards();
  updateInsights();
  updateRestaurantScore();
});

function updateTrendChart(score) {
  const currentTime = new Date().toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit"
  });

  scoreHistory.push({
    score: score,
    time: currentTime
  });

  if (scoreHistory.length > 8) {
    scoreHistory.shift();
  }

  trendChart.innerHTML = "";

  scoreHistory.forEach(entry => {
    let barColor = "#fbbf24";

    if (entry.score >= 90) {
      barColor = "#22c55e";
    } else if (entry.score < 80) {
      barColor = "#ef4444";
    }

    trendChart.innerHTML += `
      <div class="trend-bar-group">
        <div class="trend-value">${entry.score}%</div>

        <div
          class="trend-bar"
          style="height: ${(entry.score - 70) * 8}px; background: ${barColor};"
        ></div>

        <div class="trend-time">${entry.time}</div>
      </div>
    `;
  });
}

document.getElementById("refreshBtn").addEventListener("click", () => {
  menuItems.forEach(item => {
    const newPositiveReviews = Math.floor(Math.random() * 8) + 1;
    const newNegativeReviews = Math.floor(Math.random() * 5);

    item.positiveReviews += newPositiveReviews;
    item.negativeReviews += newNegativeReviews;

    calculateScore(item);
  });

  operationsData.orders += Math.floor(Math.random() * 20) + 5;
  operationsData.revenue += Math.floor(Math.random() * 500) + 100;

  operationsData.rating = Math.min(
    5,
    Math.max(
      1,
      operationsData.rating + (Math.random() * 0.2 - 0.1)
    )
  );

  operationsData.prepTime = Math.max(
    3,
    Math.min(
      15,
      operationsData.prepTime + Math.floor(Math.random() * 3) - 1
    )
  );

  displayMenuCards();
  updateInsights();
  updateAlerts();
  updateOperations();
  updateRestaurantScore();
});