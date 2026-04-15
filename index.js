document.addEventListener("DOMContentLoaded", () => {
    const input = document.querySelector("#state");
    const button = document.querySelector("#fetch-alerts");
    const output = document.querySelector("#alerts");
    const errorBox = document.querySelector("#error");

    button.addEventListener("click", async () => {
        const state = input.value.trim();

        // required by tests
        input.value = "";
        output.textContent = "";
        errorBox.textContent = "";

        try {
            const response = await fetch(
                `https://api.weather.gov/alerts/active?area=${state}`
            );

            if (!response.ok) {
                throw new Error("Network error");
            }

            const data = await response.json();

            if (data.features.length === 0) {
                output.textContent = "No alerts found.";
                return;
            }

            // show first alert headline
            const alert = data.features[0].properties;
            output.textContent = alert.headline || "Alert found";
        } catch (err) {
            errorBox.textContent = "Error fetching alerts!";
        }
    });
});