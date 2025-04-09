import React from 'react';
import { motion } from 'framer-motion';
import { WeatherData } from '../types/weather';
import { Cloud, Droplets, Wind } from 'lucide-react';

interface WeatherCardProps {
  data: WeatherData;
  className?: string;
}

export const WeatherCard: React.FC<WeatherCardProps> = ({ data, className = '' }) => {
  
  const isDark = 'dark';
  const baseTextColor = isDark ? 'text-gray-100' : 'text-gray-800';
  const mutedTextColor = isDark ? 'text-gray-400' : 'text-gray-600';
  const cardBg = isDark ? 'bg-white/10 backdrop-blur-md' : 'bg-white/80 backdrop-blur-md';
  const shadowStyle = isDark ? 'shadow-black/30' : 'shadow-lg';

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, type: 'spring' }}
      whileHover={{ scale: 1.02 }}
      className={`${cardBg} rounded-2xl p-6 ${shadowStyle} transition-all ${className}`}
    >
      <div className="flex flex-col items-center">
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className={`text-3xl font-bold mb-2 ${baseTextColor}`}
        >
          {data.name}
        </motion.h2>

        <motion.img
          src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`}
          alt={data.weather[0].description}
          className="w-32 h-32 object-contain"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, type: 'spring' }}
        />

        <motion.p
          className={`text-5xl font-bold mb-4 ${baseTextColor}`}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          {Math.round(data.main.temp)}°C
        </motion.p>

        <motion.p
          className={`text-xl capitalize mb-6 ${mutedTextColor}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          {data.weather[0].description}
        </motion.p>

        <motion.div
          className="grid grid-cols-3 gap-6 w-full"
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.2
              }
            }
          }}
        >
          {[
            {
              icon: <Droplets className="w-8 h-8 text-blue-500 mb-2" />,
              label: 'Humidity',
              value: `${data.main.humidity}%`
            },
            {
              icon: <Wind className="w-8 h-8 text-blue-500 mb-2" />,
              label: 'Wind Speed',
              value: `${Math.round(data.wind.speed)} km/h`
            },
            {
              icon: <Cloud className="w-8 h-8 text-blue-500 mb-2" />,
              label: 'Condition',
              value: data.weather[0].main
            }
          ].map((info, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              whileHover={{ scale: 1.05 }}
            >
              {info.icon}
              <span className={`text-sm ${mutedTextColor}`}>{info.label}</span>
              <span className={`text-lg font-semibold ${baseTextColor}`}>{info.value}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};
