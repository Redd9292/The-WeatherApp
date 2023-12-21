import React, { useState, useEffect } from 'react';
import CurrentWeather from '../components/CurrentWeather';
import Forecast from '../components/Forecast';
import { fetchCurrentWeather, fetchHourlyForecast, fetchDailyForecast } from '../services/WeatherService';

const WeatherApp = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [unit, setUnit] = useState('metric'); // metric for Celsius, imperial for Fahrenheit
  const [hourlyForecast, setHourlyForecast] = useState(null);
  const [dailyForecast, setDailyForecast] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (city) {
      try {
        const currentWeatherData = await fetchCurrentWeather(city, unit);
        setWeatherData(currentWeatherData);
      } catch (error) {
        console.error('Error fetching current weather:', error);
      }
    }
  };

  const handleHourlyForecast = async () => {
    if (city) {
      try {
        const hourlyWeatherData = await fetchHourlyForecast(city, unit);
        setHourlyForecast(hourlyWeatherData);
      } catch (error) {
        console.error('Error fetching hourly forecast:', error);
      }
    }
  };

  const handleDailyForecast = async () => {
    if (city) {
      try {
        const dailyWeatherData = await fetchDailyForecast(city, unit);
        setDailyForecast(dailyWeatherData);
      } catch (error) {
        console.error('Error fetching daily forecast:', error);
      }
    }
  };

  const toggleUnit = () => {
    setUnit(unit === 'metric' ? 'imperial' : 'metric');
  };

  useEffect(() => {
    handleHourlyForecast();
    handleDailyForecast();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [weatherData, unit]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold mb-4 ">Weather Forecast</h1>
      <div className="flex items-center space-x-2">
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="p-2 border border-gray-300"
        />
        <button onClick={handleSearch} className="bg-blue-500 text-white p-2">
          Search
        </button>
      </div>
      {weatherData && (
        <div className="mt-8">
          <CurrentWeather weatherData={weatherData} unit={unit} onToggleUnit={toggleUnit} />
        </div>
      )}

{hourlyForecast && (
  <div className="mb-8">
    <h3 className="text-xl font-bold mb-2 text-center pt-6">Hourly Forecast</h3>
    <div className="flex overflow-x-auto space-x-4">
      {hourlyForecast.slice(0, 7).map((hourlyData, index) => (
        <div key={index} className="flex-shrink-0 w-24 text-center">
          <p className="text-sm">{hourlyData.time}</p>
          <img
            src={hourlyData.condition.icon}
            alt={hourlyData.condition.text}
            className="w-10 h-10 mx-auto"
          />
          <p className="text-sm">
            {unit === 'metric' ? `${hourlyData.temp_c}°C` : `${hourlyData.temp_f}°F`}
          </p>
        </div>
      ))}
    </div>
  </div>
)}

      {dailyForecast && (
        <div className="mb-8">
          <h3 className="text-xl font-bold mb-2 text-center">Daily Forecast</h3>
          <div className="flex overflow-x-auto space-x-4">
            {dailyForecast.map((dailyData, index) => (
              <div key={index} className="flex-shrink-0 w-24 text-center">
                <p className="text-sm">{dailyData.date}</p>
                <img
                  src={dailyData.day.condition.icon}
                  alt={dailyData.day.condition.text}
                  className="w-10 h-10 mx-auto"
                />
                <p className="text-sm">
                  {unit === 'metric' ? `${dailyData.day.maxtemp_c}°C` : `${dailyData.day.maxtemp_f}°F`}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
