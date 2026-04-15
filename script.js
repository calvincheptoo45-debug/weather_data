// =========================
// WEATHER API LAB SOLUTION
// =========================

// Fetch weather alerts from National Weather Service API
async function fetchWeatherData(state) {
  try {
    const input = state.trim().toUpperCase();

    // Validate input
    if (!input) {
      displayError("Please enter a valid state abbreviation.");
      return;
    }

    // API endpoint
    const url = `https://api.weather.gov/alerts?area=${input}`;

    const response = await fetch(url);

    // Handle HTTP errors
    if (!response.ok) {
      throw new Error("Failed to fetch weather data.");
    }

    const data = await response.json();

    displayWeather(data);

  } catch (error) {
    displayError("Unable to load weather data. Please try again later.");
  }
}

// Display weather alerts in DOM
function displayWeather(data) {
  const container = document.getElementById("weatherResults");

  // Clear previous results
  container.innerHTML = "";

  const alerts = data.features;

  // Handle no alerts case
  if (!alerts || alerts.length === 0) {
    container.innerHTML = "<p>No active weather alerts found.</p>";
    return;
  }

  // Render each alert
  alerts.forEach((alert) => {
    const title = alert.properties.headline || "No title available";
    const description = alert.properties.description || "No description available";

    const alertCard = document.createElement("div");
    alertCard.classList.add("alert-card");

    alertCard.innerHTML = `
      <h3>${title}</h3>
      <p>${description}</p>
    `;

    container.appendChild(alertCard);
  });
}

// Display error messages in DOM
function displayError(message) {
  const container = document.getElementById("weatherResults");

  container.innerHTML = "";

  const errorBox = document.createElement("div");
  errorBox.classList.add("error");

  errorBox.textContent = message;

  container.appendChild(errorBox);
}

// Event listener for button click
document.addEventListener("DOMContentLoaded", () => {
  const button = document.getElementById("fetchBtn");

  button.addEventListener("click", () => {
    const stateInput = document.getElementById("stateInput").value;
    fetchWeatherData(stateInput);
  });
});