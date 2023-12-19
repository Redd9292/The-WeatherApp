// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import CityList from './components/CityList';
// import CurrentWeather from './components/CurrentWeather';
// import Forecast from './components/Forecast';

// const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
// const API_BASE_URL = 'http://api.weatherapi.com/v1';

// const WeatherApp = () => {
//   const [city, setCity] = useState('');
//   const [weatherData, setWeatherData] = useState(null);
//   const [unit, setUnit] = useState('metric'); // 'metric' for Celsius, 'imperial' for Fahrenheit

//   useEffect(() => {
//     if (city) {
//       const trimmedCity = city.trim();

//       axios.get(`${API_BASE_URL}/current.json`, {
//         params: {
//           key: API_KEY,
//           q: trimmedCity,
//           unit: unit === 'metric' ? 'm' : 'f',
//         },
//       })
//         .then((response) => setWeatherData(response.data))
//         .catch((error) => console.error('Error fetching current weather:', error));
//     }
//   }, [city, unit]);

//   const handleSearch = () => {
//     if (city) {
//       const trimmedCity = city.trim();
//       setCity(trimmedCity);

//       axios.get(`${API_BASE_URL}/current.json`, {
//         params: {
//           key: API_KEY,
//           q: trimmedCity,
//           unit: unit === 'metric' ? 'm' : 'f',
//         },
//       })
//         .then((response) => setWeatherData(response.data))
//         .catch((error) => console.error('Error fetching current weather:', error));
//     }
//   };

//   const handleCityClick = (clickedCity) => {
//     if (isValidCity(clickedCity)) {
//       const trimmedCity = clickedCity.trim();

//       // Fetch current weather
//       axios.get(`${API_BASE_URL}/current.json`, {
//         params: {
//           key: API_KEY,
//           q: trimmedCity,
//           unit: unit === 'metric' ? 'm' : 'f',
//         },
//       })
//         .then((response) => {
//           // Set current weather data
//           setWeatherData(response.data);

//           // Fetch hourly and 6-day forecast
//           return axios.get(`${API_BASE_URL}/forecast.json`, {
//             params: {
//               key: API_KEY,
//               q: trimmedCity,
//               days: 6, // Number of days for the forecast
//               hour: 1, // Fetch hourly forecast
//               unit: unit === 'metric' ? 'm' : 'f',
//             },
//           });
//         })
//         .then((forecastResponse) => {
//           // Set forecast data
//           setWeatherData((prevData) => ({
//             ...prevData,
//             forecast: forecastResponse.data,
//           }));
//         })
//         .catch((error) => console.error('Error fetching weather data:', error));
//     } else {
//       console.error('Invalid city name. Please enter a valid city name.');
//     }
//   };

//   const toggleUnit = () => {
//     setUnit(unit === 'metric' ? 'imperial' : 'metric');
//   };

//   const isValidCity = (city) => {
//     return city && city.length >= 3;
//   };

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
//       <h1 className="text-4xl font-bold mb-4">Weather App</h1>
//       <div className="flex items-center space-x-2">
//         <input
//           type="text"
//           placeholder="Enter city"
//           value={city}
//           onChange={(e) => setCity(e.target.value)}
//           className="p-2 border border-gray-300"
//         />
//         <button onClick={handleSearch} className="bg-blue-500 text-white p-2">Search</button>
//       </div>
//       {weatherData && (
//         <div className="mt-8">
//           <CurrentWeather
//             weatherData={weatherData}
//             unit={unit}
//             onToggleUnit={toggleUnit}
//           />
//         </div>
//       )}
//       {/* Display list of cities with current weather information here */}
//       {/* You need to pass the city list and the onCityClick function to CityList */}
//       {/* Example: <CityList cities={yourCityList} onCityClick={handleCityClick} /> */}
//     </div>
//   );
// };

// export default WeatherApp;




// src/App.jsx
import React, { useState, useEffect } from 'react';
import CityList from './components/CityList';
import CurrentWeather from './components/CurrentWeather';
import { fetchCurrentWeather, fetchHourlyForecast } from './services/WeatherService';

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const API_BASE_URL = 'https://api.weatherapi.com/v1';



const WeatherApp = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [unit, setUnit] = useState('metric'); // 'metric' for Celsius, 'imperial' for Fahrenheit

  useEffect(() => {
    const fetchData = async () => {
      if (city) {
        try {
          const currentWeatherData = await fetchCurrentWeather(city, unit);
          setWeatherData(currentWeatherData);

          const forecastData = await fetchHourlyForecast(city, unit); // Corrected function name
          setWeatherData((prevData) => ({
            ...prevData,
            forecast: forecastData,
          }));
        } catch (error) {
          console.error('Error fetching weather data:', error);
        }
      }
    };

    fetchData();
  }, [city, unit]);

  const handleSearch = async () => {
    if (city) {
      try {
        const currentWeatherData = await fetchCurrentWeather(city, unit);
        setWeatherData(currentWeatherData);
      } catch (error) {
        console.error('Error fetching current weather:', error);
      }
    }
  };

  const handleCityClick = async (clickedCity) => {
    if (isValidCity(clickedCity)) {
      try {
        const currentWeatherData = await fetchCurrentWeather(clickedCity, unit);
        setWeatherData(currentWeatherData);

        const forecastData = await fetchHourlyForecast(clickedCity, unit); // Corrected function name
        setWeatherData((prevData) => ({
          ...prevData,
          forecast: forecastData,
        }));
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    } else {
      console.error('Invalid city name. Please enter a valid city name.');
    }
  };

  const toggleUnit = () => {
    setUnit(unit === 'metric' ? 'imperial' : 'metric');
  };

  const isValidCity = (city) => {
    return city && city.length >= 3;
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Weather App</h1>
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
      {/* Display list of cities with current weather information here */}
      {/* You need to pass the city list and the onCityClick function to CityList */}
      {/* Example: <CityList cities={yourCityList} onCityClick={handleCityClick} /> */}
    </div>
  );
};

export default WeatherApp;
