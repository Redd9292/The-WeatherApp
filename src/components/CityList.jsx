import React from 'react';

const CityList = ({ cities, onCityClick }) => {
  return (
    <div className="flex space-x-4">
      {cities.map((city) => (
        <button key={city.id} onClick={() => onCityClick(city)} className="text-blue-500">
          {city.name}
        </button>
      ))}
    </div>
  );
};

export default CityList;
