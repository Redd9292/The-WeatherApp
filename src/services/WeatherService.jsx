import axios from 'axios'

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
console.log('API_KEY:', API_KEY);
const API_BASE_URL = 'https://api.weatherapi.com/v1';
console.log('API_BASE_URL:', API_BASE_URL);

// const fetchWeatherData = async (city) => {
//   const response = await fetch(`${BASE_URL}/current.json?key=${API_KEY}&q=${city}`);
//   const data = await response.json();
//   return data;
// };

// const fetchHourlyForecast = async (city) => {
//   // Implement fetching hourly forecast data
// };

// export { fetchWeatherData, fetchHourlyForecast };


export const fetchCurrentWeather = async (city, unit) => {
  try {
    const trimmedCity = city.trim();

    const response = await axios.get(`${API_BASE_URL}/current.json`, {
      params: {
        key: API_KEY,
        q: trimmedCity,
        unit: unit === 'metric' ? 'm' : 'f',
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
        hour: 1,
        unit: unit === 'metric' ? 'm' : 'f',
      },
    });

    return response.data?.forecast?.forecastday[0]?.hour || [];
  } catch (error) {
    console.error('Error fetching hourly forecast:', error);
    throw error;
  }
};