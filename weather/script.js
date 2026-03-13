const container = document.getElementById("weatherContainer")
const loader = document.getElementById("loader")

const cities = [
{ name:"Delhi", lat:28.61, lon:77.20 },
{ name:"London", lat:51.50, lon:-0.12 },
{ name:"New York", lat:40.71, lon:-74.00 }
]

function weatherEmoji(code){

if(code === 0) return "☀️"
if(code <= 3) return "⛅"
if(code <= 48) return "☁️"
if(code <= 67) return "🌧️"
if(code <= 77) return "❄️"
if(code <= 99) return "⛈️"

return "🌍"

}

function weatherCondition(code){

if(code === 0) return "Clear Sky"
if(code <= 3) return "Partly Cloudy"
if(code <= 48) return "Cloudy"
if(code <= 67) return "Rain"
if(code <= 77) return "Snow"
if(code <= 99) return "Storm"

return "Unknown"

}

async function fetchWeather(){

try{

loader.classList.remove("hidden")

const requests = cities.map(city =>

fetch(`https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lon}&current_weather=true`)
.then(res => res.json())

)

const results = await Promise.all(requests)

loader.classList.add("hidden")

results.forEach((data,index)=>{

const city = cities[index]

const temp = data.current_weather.temperature
const code = data.current_weather.weathercode

const card = document.createElement("div")
card.className="card"

card.innerHTML=`

<h2>${city.name}</h2>
<div class="temp">${temp}°C</div>
<div>${weatherCondition(code)}</div>
<div class="emoji">${weatherEmoji(code)}</div>

`

container.appendChild(card)

})

}catch(error){

loader.classList.add("hidden")

container.innerHTML = "<h2>⚠️ Failed to fetch weather data</h2>"

}

}

fetchWeather()