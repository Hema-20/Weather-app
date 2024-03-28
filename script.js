async function getWeather() {
    const apiKey = 'c0742f44752415c0a6706a143c9e4852';
    const cityInput = document.getElementById('city-input');
    const city = cityInput.value.trim();

    if (!city) {
        alert('Please enter a city name.');
        return;
    }

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (response.ok) {
            displayWeather(data);
        } else {
            handleWeatherError(data);
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
        alert('An error occurred while fetching weather data. Please try again.');
    }
}

function displayWeather(data) {
    const weatherInfo = document.getElementById('weather-info');
    const cityElement = document.getElementById('city');
    const temperatureElement = document.getElementById('temperature');
    const weatherElement = document.getElementById('weather');
    const humidityElement = document.getElementById('humidity');
    const windSpeedElement = document.getElementById('wind-speed');

    cityElement.textContent = data.name;
    temperatureElement.textContent = data.main.temp;
    weatherElement.textContent = data.weather[0].description;
    humidityElement.textContent = data.main.humidity;
    windSpeedElement.textContent = data.wind.speed;

    weatherInfo.style.display = 'block';
}

function handleWeatherError(data) {
    const weatherInfo = document.getElementById('weather-info');
    weatherInfo.style.display = 'none';

    if (data.message) {
        alert(`Error: ${data.message}`);
    } else {
        alert('An unknown error occurred while fetching weather data. Please try again.');
    }
}
