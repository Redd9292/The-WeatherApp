import React, { useState, useEffect } from 'react';
// import CityList from '../components/CityList';
import CurrentWeather from '../components/CurrentWeather';
import Forecast from '../components/Forecast'
// import HomePage  from './pages/HomePage';
import { fetchCurrentWeather, fetchHourlyForecast } from '../services/WeatherService';



// const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
// const API_BASE_URL = 'https://api.weatherapi.com/v1';



const WeatherApp = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [unit, setUnit] = useState('metric'); // metric for Celsius, imperial for Fahrenheit
  const [hourlyForecast, setHourlyForecast] = useState(null)
  

  const handleSearch = async (e) => {
    e.preventDefault()
    console.log(city)
    if (city) {
      try {
        const currentWeatherData = await fetchCurrentWeather(city, unit);
       
        setWeatherData(currentWeatherData);
      } catch (error) {
        console.error('Error fetching current weather:', error);
      }
    }
  };

  const handleHourlyForecast = async (e) => {
    // e.preventDefault()
    console.log(city)
    if (city) {
      try {
        const hourlyWeatherData = await fetchHourlyForecast(city, unit);
       console.log(hourlyWeatherData)
        setHourlyForecast(hourlyWeatherData);
      } catch (error) {
        console.error('Error fetching current weather:', error);
      }
    }
  };

  const toggleUnit = () => {
    setUnit(unit === 'metric' ? 'imperial' : 'metric');
  };
  useEffect(() => {
    handleHourlyForecast()
   
     // eslint-disable-next-line react-hooks/exhaustive-deps
     },[weatherData, unit]);
  
  // const isValidCity = (city) => {
  //   return city && city.length >= 3;
  // };

 






  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Weather Forecast</h1>
      <div className="flex items-center space-x-2">
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="p-2 border border-gray-300"
        />
        <button onClick={handleSearch} className="bg-blue-500 text-white p-2">Search</button>
      </div> 
      {weatherData && (
        <div className="mt-8">
          <CurrentWeather 
            weatherData={weatherData}
            unit={unit}
            onToggleUnit={toggleUnit}
          />
          </div> 
      )}
        <Forecast
        hourlyForecast={hourlyForecast}
        // dailyForecast={dailyForecast}
        unit={unit}
        />
      {/* Display list of cities with current weather information here */}
      {/* You need to pass the city list and the onCityClick function to CityList */}
      {/* Example: <CityList cities={yourCityList} onCityClick={handleCityClick} /> */}
    </div>
  );
};

export default WeatherApp;
