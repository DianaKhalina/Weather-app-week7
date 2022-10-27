function formatDate(timestamp){
let date = new Date(timestamp);
let hours = date.getHours();
if (hours < 10) {
    hours = `0${hours}`;
}   
let minutes = date.getMinutes();
if (minutes < 10) {
    minutes = `0${minutes}`;
}
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let day = date.getDay();
return `${days[day]} ${hours}:${minutes}`;
}

function displayForecast() {
    let forecastElement = document.querySelector("#forecast");
let forecastHTML = `<div class="row">`;
let days = ["Thu", "Fri", "Sat", "Sun"];
days.forEach(function (day) {
    forecastHTML = forecastHTML + `<div class="col-2">
    <div class="weather-forecast-date">${day}</div>
     <img src="file:///C:/Users/user/Documents/GitHub/Weather-app-week7/src/img/04d.png" alt="" width="34" />
     <div class="weather-forecast-temperatures">
    <span class="weather-forecast-temperature-max">18°</span> <span class="weather-forecast-temperature-min">12°</span>
 </div>
 </div>
`;
});

            
            forecastHTML = forecastHTML + `</div>`;
            forecastElement.innerHTML = forecastHTML;
}

function displayTemperature(response) {
    let temperatureElement = document.querySelector("#temperature");
    let cityElement = document.querySelector("#city");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind");
    let dateElement = document.querySelector("#date");
    let iconElement = document.querySelector("#icon");
    celsiusTemperature = response.data.main.temp; 
    
    unitsElement.innerHTML = `°C`;
    celsiusLink.classList.add("active");
    fahrenheitLink.classList.remove("active");

    temperatureElement.innerHTML = Math.round(celsiusTemperature);
    cityElement.innerHTML = response.data.name;
    descriptionElement.innerHTML = response.data.weather[0].description;
    humidityElement.innerHTML = response.data.main.humidity;
    windElement.innerHTML = response.data.wind.speed;
    dateElement.innerHTML = formatDate(response.data.dt * 1000);
    iconElement.setAttribute("src", `src/img/${response.data.weather[0].icon}.png`);
    iconElement.setAttribute("alt", response.data.weather[0].description);
}

function search(city) {
    let apiKey = "209f33579f32165aac3b50595a16eef6";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayTemperature);
   
}
function handleSubmit(event){
    event.preventDefault();
    let inputCityElemnt = document.querySelector("#input-city");
    search(inputCityElemnt.value);
    console.log(inputCityElemnt.value);
}

function displayFahrenheitTemperature(event){
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");
    celsiusLink.classList.remove("active");
    fahrenheitLink.classList.add("active");
    let fahrenheitTemperature = (celsiusTemperature * 9 / 5) + 32;
    unitsElement.innerHTML = `°F`;
    temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event){
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");
    celsiusLink.classList.add("active");
    fahrenheitLink.classList.remove("active");
    temperatureElement.innerHTML = Math.round(celsiusTemperature);
    unitsElement.innerHTML = `°C`;

}
let celsiusTemperature = null;
let unitsElement = document.querySelector("#units");
search("Kyiv");
displayForecast();
let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);