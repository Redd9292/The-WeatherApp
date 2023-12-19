import React from 'react';

const CurrentWeather = ({ weatherData, unit, onToggleUnit }) => {
  return (
    <div>
      {/* Display current weather information here */}
      <button onClick={onToggleUnit} className="text-blue-500">Toggle Unit</button>
    </div>
  );
};

export default CurrentWeather;
