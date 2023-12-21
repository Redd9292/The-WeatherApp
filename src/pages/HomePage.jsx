import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Welcome To The WeatherApp!</h1>
      <Link to="/WeatherApp" className='text-blue-500'>Click Here To Check The Weather In Your Area!</Link>
    </div>
  );
};

export default HomePage;

