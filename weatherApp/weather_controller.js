import { Controller } from "https://unpkg.com/@hotwired/stimulus/dist/stimulus.js";

export default class WeatherController extends Controller {
    static targets = ["cityInput", "weatherInfo", "cityName", "temperature", "humidity", "wind", "condition"];

    connect() {
        console.log("Weather Controller yüklendi!");
        this.loadWeatherData();
    }

    async loadWeatherData() {
        try {
            const response = await fetch("./weather.json"); 
            this.weatherData = await response.json(); 
            this.loadTemperatureChart(); 
            
        } catch (error) {
            console.error("Hava durumu verisi yüklenemedi:", error);
        }
    }

    

    loadTemperatureChart() {
        const cities = this.weatherData.cities;
        const cityNames = cities.map(city => city.name); 
        const temperatures = cities.map(city => parseFloat(city.temperature.replace("°C", ""))); 

        const ctx = document.getElementById("temperatureChart").getContext("2d");
        new Chart(ctx, {
            type: "line", 
            data: {
                labels: cityNames, 
                datasets: [{
                    label: "Sıcaklık (°C)", 
                    data: temperatures, 
                    borderColor: "rgba(75, 192, 192, 1)", 
                    backgroundColor: "rgba(75, 192, 192, 0.2)", 
                    fill: true, 
                    tension: 0.1 
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'Türkiye Hava Durumu Sıcaklıkları'
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: false
                    }
                }
            }
        });
    }

    searchWeather() {
        const userInput = this.cityInputTarget.value.trim().toLowerCase(); 

        if (!userInput) {
            alert("Lütfen bir şehir adı girin!");
            return;
        }

        
        const city = this.weatherData.cities.find(c => c.name.toLowerCase() === userInput);

        if (city) {
            this.cityNameTarget.textContent = city.name;
            this.temperatureTarget.textContent = city.temperature;
            this.humidityTarget.textContent = city.humidity;
            this.windTarget.textContent = city.wind;
            this.conditionTarget.textContent = city.condition;
            this.weatherInfoTarget.style.display = "block"; 
        
        
        } else {
            alert("Bu şehir bulunamadı. Lütfen geçerli bir şehir girin.");
            this.weatherInfoTarget.style.display = "none"; 
        }
    }
    
}