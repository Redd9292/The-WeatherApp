import React from 'react';

const Forecast = ({ hourlyForecast, dailyForecast, unit }) => {
  console.log(hourlyForecast)
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Forecast</h2>

       
       <div className="mb-8">
         <h3 className="text-xl font-bold mb-2">Hourly Forecast</h3>
         <div className="flex overflow-x-auto space-x-4">
           {hourlyForecast.map((hourlyData, index) => (
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
       </div>
       );
}; 

export default Forecast;
