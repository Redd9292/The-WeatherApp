import axios from 'axios'
// import {fetchHourlyForecast}
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const API_BASE_URL = 'https://api.weatherapi.com/v1';



export const fetchCurrentWeather = async (city, unit) => {
  try {
    const trimmedCity = city.trim();

    const response = await axios.get(`${API_BASE_URL}/current.json`, {
      params: {
        key: API_KEY,
        q: trimmedCity,
        // unit: unit === 'metric' ? 'metric' : 'f',
        unit: unit === 'metric' ? 'metric' : 'imperial',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching current weather:', error);
    throw error;
  }
};

export const fetchHourlyForecast = async (city, unit) => {
  try {
    const trimmedCity = city.trim();


    const response = await axios.get(`${API_BASE_URL}/forecast.json`, {
      params: {
        key: API_KEY,
        q: trimmedCity,
        days: 1,
        // hour: 1,
        // unit: unit === 'metric' ? 'metric' : 'f',
        unit: unit === 'metric' ? 'metric' : 'imperial',
      },
    });

    const hourlyForecast = response.data?.forecast?.forecastday[0]?.hour || [];
    console.log('Hourly Forecast:', hourlyForecast);

    return hourlyForecast;
  } catch (error) {
    console.error('Error fetching hourly forecast:', error);
    throw error;
  }
};



