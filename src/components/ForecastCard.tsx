import React from 'react';
import { motion } from 'framer-motion';
import { ForecastData } from '../types/weather';

interface ForecastCardProps {
  data: ForecastData;
}

export const ForecastCard: React.FC<ForecastCardProps> = ({ data }) => {
  const dailyForecasts = data.list.filter((_, index) => index % 8 === 0).slice(0, 5);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-4xl mx-auto mt-8"
    >
      <motion.h3
        className="text-xl font-semibold text-gray-700 mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        5-Day Forecast
      </motion.h3>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {dailyForecasts.map((forecast, index) => (
          <motion.div
            key={index}
            className="bg-white/80 backdrop-blur-sm rounded-xl p-4 flex flex-col items-center"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 + index * 0.15, type: 'spring' }}
            whileHover={{ scale: 1.05, rotate: 1 }}
          >
            <p className="text-sm text-gray-600 mb-2">
              {new Date(forecast.dt_txt).toLocaleDateString('en-US', { weekday: 'short' })}
            </p>
            <img
              src={`https://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`}
              alt={forecast.weather[0].main}
              className="w-12 h-12"
            />
            <p className="text-lg font-semibold">{Math.round(forecast.main.temp)}°C</p>
            <p className="text-sm text-gray-600">{forecast.weather[0].main}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
