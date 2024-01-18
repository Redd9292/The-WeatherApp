import React from 'react';


const CurrentWeather = ({ weatherData, unit, onToggleUnit }) => {
  if (!weatherData) {
    return null; 
  }
  
  const { location, current } = weatherData;

  return (
    <div>
      <h2 className="text-2xl font-bold">{location.name}, {location.region}</h2>
      <div className="flex items-center space-x-2">
        <img
          src={current.condition.icon}
          alt={current.condition.text}
          className="w-10 h-10"
        />
        <p className="text-3xl font-bold"> {unit === 'metric' ? `${current.temp_c}°C` : `${current.temp_f}°F`}</p>
     
      </div>
      <p>{current.condition.text}</p>
      <p>Humidity: {current.humidity}%</p>
      <button onClick={onToggleUnit} className="text-blue-500">F | C   ({unit === 'metric' ? 'Celsius' : 'Fahrenheit'})</button>
    </div>
  );
};

export default CurrentWeather;