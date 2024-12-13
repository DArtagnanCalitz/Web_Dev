// Google Maps Integration
function initMap() {
    const california = { lat: 37.7749, lng: -119.4194 };
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 6,
        center: california,
    });

    // Example markers
    const marker = new google.maps.Marker({
        position: { lat: 36.7783, lng: -119.4179 },
        map: map,
        title: "Sample Campsite",
    });
}

// Real-Time Weather Updates
async function fetchWeather() {
    const weatherWidget = document.getElementById("weather-widget");
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=California&appid=11a5b159429d4f208290daa61e170ccc&units=imperial`);
        const data = await response.json();
        weatherWidget.innerHTML = `<p>${data.location.name}: ${data.current.temp_f}°F, ${data.current.condition.text}</p>`;
    } catch (error) {
        weatherWidget.innerHTML = "<p>Unable to load weather data. Try again later.</p>";
    }
}

fetchWeather();

// Community Stories Form Submission
document.getElementById("story-form").addEventListener("submit", async function (e) {
    e.preventDefault();

    // Get input values
    const nameInput = document.getElementById("username");
    const storyInput = document.getElementById("story");
    const name = nameInput.value;
    const story = storyInput.value;

    if (name && story) {
        try {
            const response = await fetch("/api/stories", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, story }),
            });

            const result = await response.json();
            alert(result.message);

            // Clear input fields after successful submission
            nameInput.value = "";
            storyInput.value = "";
        } catch (error) {
            alert("Error submitting story. Please try again.");
        }
    } else {
        alert("Please complete all fields before submitting.");
    }
});
