document.addEventListener("DOMContentLoaded", () => {
    const input = document.querySelector("#state");
    const button = document.querySelector("#fetch-alerts");
    const displayDiv = document.querySelector("#alerts-display");
    const errorDiv = document.querySelector("#error-message");

    button.addEventListener("click", async () => {
        const state = input.value.trim();

        // clear input
        input.value = "";

        // clear UI
        displayDiv.textContent = "";
        errorDiv.textContent = "";
        errorDiv.classList.add("hidden");

        try {
            const res = await fetch(
                `https://api.weather.gov/alerts/active?area=${state}`
            );

            if (!res.ok) throw new Error("Network failure");

            const data = await res.json();

            const alerts = data.features;

            // display number of alerts
            displayDiv.textContent = `Weather Alerts: ${alerts.length}`;

            // display each alert
            alerts.forEach(alert => {
                const p = document.createElement("p");
                p.textContent = alert.properties.headline;
                displayDiv.appendChild(p);
            });

        } catch (err) {
            errorDiv.textContent = err.message;
            errorDiv.classList.remove("hidden");
        }
    });
});