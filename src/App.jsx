import React, { useState, useEffect } from 'react';
// import CityList from './components/CityList';
// import CurrentWeather from './components/CurrentWeather';
// import Forecast from './components/Forecast'
// import { fetchCurrentWeather, fetchHourlyForecast } from './services/WeatherService';





import HomePage  from './pages/HomePage';
import WeatherApp from './pages/WeatherApp';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';




function App() {
    return (
      <div className="App">
      <Header />
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/WeatherApp" element={<WeatherApp />} />
        </Routes>
      
      </div>
    );
  }
  
  export default App;