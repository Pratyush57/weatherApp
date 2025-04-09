import React from 'react';
import { useWeather } from '../hooks/useWeather';
import { WeatherCard } from '../components/WeatherCard';
import { ForecastCard } from '../components/ForecastCard';
import { motion } from 'framer-motion';

export const WeatherPage: React.FC = () => {
  const { weatherData, forecastData, loading } = useWeather('Bhubaneswar');

  if (loading) return <p className="text-center mt-10 text-lg">Loading...</p>;
  if (!weatherData || !forecastData) return <p className="text-center mt-10 text-lg">No data found.</p>;

  return (
    <motion.div
      className="p-4"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <WeatherCard data={weatherData} />
      </motion.div>

      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.7 }}
      >
        <ForecastCard data={forecastData} />
      </motion.div>
    </motion.div>
  );
};
