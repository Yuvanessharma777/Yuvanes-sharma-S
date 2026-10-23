
const weatherData = {
  chennai: {
    name: "Chennai",
    temp: 32,
    condition: "Partly cloudy",
    icon: "🌤️",
    humidity: 68,
    wind: 14,
    uv: 7,
    feels: 35,
    forecast: [
      ["Today", "🌤️", 32, 27],
      ["Tomorrow", "☀️", 34, 28],
      ["Friday", "⛅", 31, 26],
      ["Saturday", "🌦️", 30, 25],
      ["Sunday", "☀️", 33, 27]
    ]
  },
  coimbatore: {
    name: "Coimbatore",
    temp: 29,
    condition: "Partly cloudy",
    icon: "⛅",
    humidity: 62,
    wind: 11,
    uv: 6,
    feels: 30,
    forecast: [
      ["Today", "⛅", 29, 22],
      ["Tomorrow", "☀️", 31, 22],
      ["Friday", "🌤️", 30, 21],
      ["Saturday", "🌦️", 28, 22],
      ["Sunday", "⛅", 29, 21]
    ]
  },
  bengaluru: {
    name: "Bengaluru",
    temp: 26,
    condition: "Light rain",
    icon: "🌦️",
    humidity: 74,
    wind: 12,
    uv: 5,
    feels: 27,
    forecast: [
      ["Today", "🌦️", 26, 20],
      ["Tomorrow", "⛅", 27, 20],
      ["Friday", "🌧️", 25, 19],
      ["Saturday", "🌤️", 28, 20],
      ["Sunday", "⛅", 27, 19]
    ]
  },
  mumbai: {
    name: "Mumbai",
    temp: 31,
    condition: "Sunny",
    icon: "☀️",
    humidity: 71,
    wind: 16,
    uv: 8,
    feels: 34,
    forecast: [
      ["Today", "☀️", 31, 27],
      ["Tomorrow", "🌤️", 32, 27],
      ["Friday", "⛅", 30, 26],
      ["Saturday", "🌦️", 29, 26],
      ["Sunday", "☀️", 32, 27]
    ]
  },
  delhi: {
    name: "Delhi",
    temp: 28,
    condition: "Clear skies",
    icon: "☀️",
    humidity: 48,
    wind: 9,
    uv: 6,
    feels: 29,
    forecast: [
      ["Today", "☀️", 28, 18],
      ["Tomorrow", "🌤️", 30, 19],
      ["Friday", "⛅", 29, 18],
      ["Saturday", "☀️", 31, 20],
      ["Sunday", "🌤️", 30, 19]
    ]
  }
};

const searchForm = document.getElementById("searchForm");
const cityInput = document.getElementById("cityInput");
const searchMessage = document.getElementById("searchMessage");
const unitToggle = document.getElementById("unitToggle");

let selectedCity = "chennai";
let isFahrenheit = false;

function toDisplayTemperature(celsius) {
  return isFahrenheit
    ? Math.round((celsius * 9) / 5 + 32)
    : celsius;
}

function renderWeather(cityKey) {
  const weather = weatherData[cityKey];

  if (!weather) {
    searchMessage.textContent =
      "City not found. Try Chennai, Coimbatore, Bengaluru, Mumbai or Delhi.";
    return;
  }

  selectedCity = cityKey;
  searchMessage.textContent = "";

  document.getElementById("cityName").textContent = weather.name;
  document.getElementById("weatherDate").textContent =
    "Sample conditions · Not live data";
  document.getElementById("weatherDescription").textContent =
    weather.condition;
  document.getElementById("weatherIcon").textContent = weather.icon;
  document.getElementById("humidity").textContent =
    `${weather.humidity}%`;
  document.getElementById("wind").textContent =
    `${weather.wind} km/h`;
  document.getElementById("uv").textContent =
    `${weather.uv} · ${weather.uv >= 6 ? "High" : "Moderate"}`;

  document.getElementById("temperature").textContent =
    toDisplayTemperature(weather.temp);
  document.getElementById("feelsLike").textContent =
    toDisplayTemperature(weather.feels);

  unitToggle.textContent = isFahrenheit ? "°F / °C" : "°C / °F";

  const forecastList = document.getElementById("forecastList");
  forecastList.replaceChildren();

  weather.forecast.forEach(([day, icon, high, low]) => {
    const card = document.createElement("article");
    card.className = "forecast-card";

    const dayText = document.createElement("p");
    dayText.className = "forecast-day";
    dayText.textContent = day;

    const weatherIcon = document.createElement("div");
    weatherIcon.className = "forecast-icon";
    weatherIcon.textContent = icon;
    weatherIcon.setAttribute("aria-hidden", "true");

    const highText = document.createElement("div");
    highText.className = "forecast-high";
    highText.textContent = `${toDisplayTemperature(high)}°`;

    const lowText = document.createElement("div");
    lowText.className = "forecast-low";
    lowText.textContent = `${toDisplayTemperature(low)}°`;

    card.append(dayText, weatherIcon, highText, lowText);
    forecastList.append(card);
  });
}

searchForm.addEventListener("submit", event => {
  event.preventDefault();

  const city = cityInput.value.trim().toLowerCase();

  if (!city) {
    searchMessage.textContent = "Please enter a city name.";
    return;
  }

  const cityKey = city.replace(/\s+/g, "");

  renderWeather(cityKey);
});

unitToggle.addEventListener("click", () => {
  isFahrenheit = !isFahrenheit;
  renderWeather(selectedCity);
});

document.getElementById("weatherDate").textContent =
  new Intl.DateTimeFormat("en-IN", {
    weekday: "long",
    month: "short",
    day: "numeric"
  }).format(new Date());

renderWeather("chennai");
