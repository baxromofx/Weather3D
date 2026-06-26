const API_KEY = "d1f1bb82f1326f714dabb1586699c084";

window.onload = function () {

    function updateTime() {
        const now = new Date();

        const time = document.getElementById("time");
        if (time) {
            time.innerHTML =
                "📅 " + now.toLocaleDateString("ru-RU") +
                "<br>🕒 " + now.toLocaleTimeString("ru-RU");
        }
    }

    setInterval(updateTime, 1000);
    updateTime();

    async function getWeather(lat, lon) {
        try {
            const response = await fetch(
                https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=ru
            );

            const data = await response.json();

            document.getElementById("city").textContent = data.name;
            document.getElementById("temp").textContent = Math.round(data.main.temp) + "°C";
            document.getElementById("weather").textContent =
                data.weather[0].description +
                " | 💨 " + data.wind.speed + " м/с" +
                " | 💧 " + data.main.humidity + "%";
const weather = data.weather[0].main;

let icon = "☀️";

switch (weather) {
    case "Clouds":
        icon = "☁️";
        break;
    case "Rain":
        icon = "🌧";
        break;
    case "Snow":
        icon = "❄️";
        break;
    case "Thunderstorm":
        icon = "⛈";
        break;
    case "Drizzle":
        icon = "🌦";
        break;
    case "Mist":
    case "Fog":
        icon = "🌫";
        break;
}

document.getElementById("weatherIcon").textContent = icon;
        } catch (e) {
            alert("Не удалось загрузить погоду.");
            console.log(e);
        }
    }

    function loadWeather() {
        navigator.geolocation.getCurrentPosition(
            pos => getWeather(pos.coords.latitude, pos.coords.longitude),
            () => alert("Разрешите доступ к геолокации.")
        );
    }

    document.getElementById("refresh").onclick = loadWeather;

    loadWeather();
};
