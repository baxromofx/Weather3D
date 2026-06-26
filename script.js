const API_KEY = "d1f1bb82f1326f714dabb1586699c084";

/* ---------------- TIME ---------------- */
function updateTime(){
    const now = new Date();

    document.getElementById("time").innerHTML =
        "📅 " + now.toLocaleDateString("ru-RU") +
        "<br>🕒 " + now.toLocaleTimeString("ru-RU");
}
setInterval(updateTime,1000);
updateTime();

/* ---------------- WEATHER ---------------- */
async function getWeather(lat, lon){

    const url = https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=ru;

    const res = await fetch(url);
    const data = await res.json();

    document.getElementById("city").textContent = data.name;
    document.getElementById("temp").textContent = Math.round(data.main.temp) + "°C";
    document.getElementById("weather").textContent = data.weather[0].description;

    document.getElementById("wind").textContent = "💨 " + data.wind.speed + " м/с";
    document.getElementById("hum").textContent = "💧 " + data.main.humidity + "%";

    // иконка
    const main = data.weather[0].main;
    let icon = "☀️";

    if(main === "Clouds") icon = "☁️";
    else if(main === "Rain") icon = "🌧️";
    else if(main === "Snow") icon = "❄️";
    else if(main === "Thunderstorm") icon = "⛈️";
    else if(main === "Mist" || main === "Fog") icon = "🌫️";

    document.getElementById("icon").textContent = icon;
}

/* ---------------- GEO ---------------- */
function loadWeather(){
    navigator.geolocation.getCurrentPosition(
        pos => getWeather(pos.coords.latitude, pos.coords.longitude),
        err => alert("Разреши геолокацию")
    );
}

document.getElementById("refresh").onclick = loadWeather;

loadWeather();

/* ---------------- 3D BACKGROUND ---------------- */
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({alpha:true});
renderer.setSize(window.innerWidth, window.innerHeight);

document.getElementById("scene").appendChild(renderer.domElement);

/* Солнце */
const sunGeo = new THREE.SphereGeometry(1.5,32,32);
const sunMat = new THREE.MeshBasicMaterial({color:0xffcc00});
const sun = new THREE.Mesh(sunGeo, sunMat);
scene.add(sun);

camera.position.z = 5;

/* Анимация */
function animate(){
    requestAnimationFrame(animate);

    sun.rotation.y += 0.01;

    renderer.render(scene, camera);
}
animate();

/* resize */
window.addEventListener("resize", ()=>{
    camera.aspect = window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
