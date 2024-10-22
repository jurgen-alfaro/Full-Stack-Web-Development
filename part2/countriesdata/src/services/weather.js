import axios from "axios"
const baseUrl = "https://api.openweathermap.org/data/2.5/weather"

const getCountryWeather = (lat, lon) => {
    const request = axios.get(baseUrl, {
        params: {
            lat,
            lon,
            appid: import.meta.env.VITE_OPEN_WEATHER_API_KEY,
            units: "metric"
        }
    })
    return request.then(response => response.data)
}

export default { getCountryWeather }