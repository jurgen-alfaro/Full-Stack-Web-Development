import { useEffect, useState } from "react"
import weatherService from "../services/weather"

const CountryDetails = ({ country }) => {
    const { 
        name, 
        capital, 
        area, 
        languages, 
        flags, 
        flag,
        capitalInfo
    } = country

    const [temperature, setTemperature] = useState('')
    const [wind, setWind] = useState('')
    const [icon, setIcon] = useState('')

    useEffect(() => {
        const { latlng } = capitalInfo
        const lat = latlng[0]
        const lon = latlng[1]
        
        weatherService.getCountryWeather(lat, lon)
            .then(weatherData => {
                setTemperature(weatherData.main.temp)
                setWind(weatherData.wind.speed)
                setIcon(weatherData.weather[0].icon)
            })
    }, [])


    return (
        <div>
            <h1>{name.common}</h1>
            <div>capital {capital}</div>
            <div>area {area}</div>

            <h3>languages:</h3>
            <ul>
                {
                    Object.values(languages).map((lang) => (
                        <li key={lang}>{lang}</li>
                    ))
                }
            </ul>
            <img src={flags.svg} alt={flag} width={180} height={180}/>

            <h2>Weather in {capital}</h2>
            <p>temperature {temperature} Celcius</p>
            <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt="weather icon" />
            <p>wind {wind} m/s</p>
        </div>
    )
}

export default CountryDetails