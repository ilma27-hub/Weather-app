import React, { useEffect, useRef, useState } from 'react'
import './Weather.css'
import search_icon from '../assets/search.png'
import clear_icon from '../assets/clear.png'
import cloud_icon from '../assets/cloud.png'
import drizzle_icon from '../assets/drizzle.png'
import rain_icon from '../assets/rain.png'
import snow_icon from '../assets/snow.png'
import wind_icon from '../assets/wind.png'
import humidity_icon from '../assets/humidity.png'
const Weather = () => { 

  const[weatherData, setWeatherData] = useState(false);
const allicons ={
  "01d":clear_icon,
  "01n":clear_icon,
  "02d":cloud_icon,
  "02n":cloud_icon,
  "03d":cloud_icon,
  "03n":cloud_icon,
  "04d":drizzle_icon,
  "04n":rain_icon,
  "09d":rain_icon,
  "09d":rain_icon,
  "010n":rain_icon,
  "10d":rain_icon,
  "13d":snow_icon,
  "13n":snow_icon,
}

const inputRef =useRef()
const search =async (city)=>{
  if(city ===""){
    alart("Enter City Name");
return;
  }

  try {
    const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    const icon =allicons[data.weather[0].icon] || clear_icon;
    setWeatherData({
      humidity: data.main.huminity,
      windSpeed: data.wind.speed,
      temperature:Math.floor(data.main.temp),
      location: data.name,
      icon: icon
    })


  } catch (error) {
    setWeatherData(false);
    console.error("Error in fetching weather data")
    
  }
}

useEffect(()=>{
  search("New York");
},[])
  return (
    <div className='weather'>
      <div className="search-bar">
        <input ref={inputRef} type="text" placeholder='Search'/>
        <img src={search_icon} alt="" onClick={()=>search(inputRef.current.value)}/>
      </div>
      {weatherData?<>
      
      <img src={weatherData.icon} alt="" className='weather-icon' />
      <p className='temperature'>{weatherData.temperature}°C</p>
      <p className='location'>{weatherData.location}</p>
      <div className="weader-data">
      <div className="col">
      <img src={humidity_icon}alt="" />
      <div>
        <p>{weatherData.humidity} 91%</p>
        <span>Humidity</span>
        </div>
      </div>
      <div className="col">
      <img src={wind_icon}alt="" />
      <div>
        <p>{weatherData.windSpeed} km/h</p>
        <span>wind speed</span>
        </div>
      </div>
    </div>

    </>:<></>}
    </div>
  )
}

export default Weather
