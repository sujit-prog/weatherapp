import React, { useEffect, useRef } from 'react'
import './Weather.css'
import search_icon from '../assets/search.png'
import cloudy_icon from '../assets/cloudy.png'
import drizzle_icon from '../assets/drizzle.png'
import humid_icon from '../assets/humid.png'
import rainy_icon from '../assets/rainy-day.png'
import snow_icon from '../assets/snow.png'
import storm_icon from '../assets/storm.png'
import clear_icon from '../assets/sun.png'
import wind_icon from '../assets/wind.png'
import { useState } from 'react'

const Weather = () => {
  const inputRef = useRef();
  const[WeatherData, setWeatherData] = useState(false);
  const allIcons = {
    "01d":clear_icon,
    "01n":clear_icon,
    "02d":cloudy_icon,
    "02n":cloudy_icon,
    "03d":cloudy_icon,
    "03n":cloudy_icon,
    "04d":drizzle_icon,
    "04n":drizzle_icon,
    "09d":rainy_icon,
    "09n":rainy_icon,
    "10d":rainy_icon,
    "10n":rainy_icon,
    "11d":storm_icon,
    "11n":storm_icon,
    "13d":snow_icon,
    "13n":snow_icon,
  };

  const search =async (city) => {
    if(!city) {
      alert("enter a city name")
    return;
  }
    try{
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
      const res = await fetch(url);
      const data = await res.json();

      if(data.cod === "404") {
        alert("City not found");
        return;
      }
      console.log(data);

      const icon = allIcons[data.weather[0].icon] || clear_icon;
      setWeatherData({
        temperature: Math.floor(data.main.temp),
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        city: data.name,
        icon: icon
       
      });
    } catch (error) {
      setWeatherData(false);
      console.log(error);
    }}
    useEffect(() => {
      search("delhi");
    }, []);
  return (
    <div className='weather'>
        <div className='search-bar'>    
            <button className='search-button'onClick={()=>search(inputRef.current.value)}>Get Weather</button>
            <input ref={inputRef} placeholder='Enter City Name' />
            <img src={search_icon} alt='' onClick={()=>search(inputRef.current.value)} />
        </div>
        {WeatherData?<>
          <img src={WeatherData.icon} alt='' className='weather-icon' />
        <p className='temperature'>{WeatherData.temperature}</p>
        <p className='location'>{WeatherData.city}</p>
        <div className='weather-info'>
          <div className='col'>
            <img src={humid_icon} alt='' />
            <p>{WeatherData.humidity}%</p>
            <span>Humidity</span>
          </div>
          <div className='col'>
            <img src={wind_icon} alt='' />
            <p>{WeatherData.windSpeed}km/h</p>
            <span>Wind Speed</span>
          </div>
        </div>
    </> :<></>}
    </div>
     
    )
}

export default Weather
