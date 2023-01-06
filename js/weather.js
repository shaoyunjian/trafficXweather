const API_KEY = "CWB-8E2F7118-4F42-45DE-A9F5-75A7A2EB1994"
const WEATHER_API = "https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-091?Authorization=" + API_KEY + "&locationName="
const weaklyWeather = document.querySelector("#weekly_weather")

const terminalToCity = {
  "南港站": "臺北市",
  "台北站": "臺北市",
  "板橋站": "新北市",
  "桃園站": "桃園市",
  "新竹站": "新竹縣",
  "苗栗站": "苗栗縣",
  "台中站": "臺中市",
  "彰化站": "彰化縣",
  "雲林站": "雲林縣",
  "嘉義站": "嘉義縣",
  "台南站": "臺南市",
  "左營站": "高雄市"
}


async function getWeather(result) {
  if (result.error) {
    weaklyWeather.innerHTML = "請選擇起始站及終點站"
  } else {
    const terminal = result.terminal
    const city = terminalToCity[terminal]
    const response = await fetch(WEATHER_API + `${city}`)
    const jsonData = await response.json()
    const data = jsonData.records.locations[0].location[0]

    weaklyWeather.innerHTML = `
      <div class="weather-title">${city}天氣預報</div>
      <div class="daily-weather-title">
      <div class="date"><b>日期</b></div>
      <div class="weather-description"><b>天氣描述</b></div>
      <div class="degree"><b>最高溫／最低溫</b></div>
      <div class="humidity"><b>平均相對溼度</b></div>
      </div>`

    for (let i = 1; i < 15; i = i + 2) {
      date = data.weatherElement[6].time[i].startTime.split(" ")[0]
      weatherDescription = data.weatherElement[6].time[i].elementValue[0].value
      maxDegree = data.weatherElement[12].time[i].elementValue[0].value
      minDegree = data.weatherElement[8].time[i].elementValue[0].value
      humidity = data.weatherElement[2].time[i].elementValue[0].value

      createDailyWeather(date, weatherDescription, maxDegree, minDegree, humidity)
    }
  }
}


function createDailyWeather(dataDate, dataWeatherDescription, maxDegree, minDegree, dataHumidity) {
  const dailyWeather = document.createElement("div")
  dailyWeather.classList.add("daily-weather")

  const date = document.createElement("div")
  const weatherDescription = document.createElement("div")
  const temperature = document.createElement("div")
  const humidity = document.createElement("div")

  date.classList.add("date")
  weatherDescription.classList.add("weather-description")
  temperature.classList.add("temperature")
  humidity.classList.add("humidity")

  date.textContent = dataDate
  weatherDescription.textContent = dataWeatherDescription
  temperature.innerHTML = `${maxDegree}℃ / ${minDegree}℃`
  humidity.textContent = dataHumidity + "%"

  dailyWeather.appendChild(date)
  dailyWeather.appendChild(weatherDescription)
  dailyWeather.appendChild(temperature)
  dailyWeather.appendChild(humidity)

  weaklyWeather.appendChild(dailyWeather)
}


