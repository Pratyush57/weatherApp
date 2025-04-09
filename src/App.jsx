import React, { useState, useCallback, useEffect } from 'react';
import {
  Search, Loader2, RefreshCw, Sun, Moon, CloudSun, CloudMoon
} from 'lucide-react';
import { WeatherCard } from './components/WeatherCard';
import { SearchHistory } from './components/SearchHistory';
import { ForecastCard } from './components/ForecastCard';
import { motion } from 'framer-motion';
// import dayjs from 'dayjs';

const API_KEY = "821a06c2e2f6c197ff7bfa8dd99057a3";
const API_BASE = 'https://api.openweathermap.org/data/2.5';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [history, setHistory] = useState([]);
  const [unit] = useState('metric');
  const [theme, setTheme] = useState('day');
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const fetchWeather = useCallback(async (searchCity) => {
    try {
      setLoading(true);
      setError(null);

      const [weatherRes, forecastRes] = await Promise.all([
        fetch(`${API_BASE}/weather?q=${searchCity}&appid=${API_KEY}&units=${unit}`),
        fetch(`${API_BASE}/forecast?q=${searchCity}&appid=${API_KEY}&units=${unit}`)
      ]);

      if (!weatherRes.ok || !forecastRes.ok) {
        throw new Error('City not found or API error');
      }

      const [weatherData, forecastData] = await Promise.all([
        weatherRes.json(),
        forecastRes.json()
      ]);

      setWeather(weatherData);
      setForecast(forecastData);
      setTheme(weatherData.weather[0].icon.includes('d') ? 'day' : 'night');

      setHistory(prev => {
        const newHistory = [
          { city: searchCity, timestamp: Date.now() },
          ...prev.filter(item => item.city !== searchCity)
        ].slice(0, 5);
        return newHistory;
      });

      setCity('');
    } catch (err) {
      setError(err.message || 'Failed to fetch weather data');
      console.error('API fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, [unit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      fetchWeather(city.trim());
    }
  };

  const handleRefresh = () => {
    if (weather) {
      fetchWeather(weather.name);
    }
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  const bgGradient = darkMode
    ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-black'
    : theme === 'day'
      ? 'bg-gradient-to-br from-blue-300 via-blue-100 to-white'
      : 'bg-gradient-to-br from-gray-800 via-gray-700 to-blue-900';

  return (
    <motion.div
      className={`min-h-screen ${bgGradient} p-4 md:p-8 transition-colors duration-700 text-gray-900 dark:text-white`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="max-w-4xl mx-auto">
        <motion.h1
          className="font-poppins text-4xl font-bold text-center mb-4 drop-shadow-lg"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {"Weatherify".split('').map((letter, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i, duration: 0.5 }}
            >
              {letter}
            </motion.span>
          ))}
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.1, type: 'spring', stiffness: 200 }}
          >
            🌤️
          </motion.span>
        </motion.h1>

        <motion.p
          className="text-center text-lg mb-10 text-gray-700 dark:text-gray-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          {getGreeting()}! Stay updated with the latest weather conditions.
        </motion.p>

        <form onSubmit={handleSubmit} className="relative mb-8">
          <motion.div className="flex gap-2" initial={{ y: -10 }} animate={{ y: 0 }} transition={{ duration: 0.4 }}>
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <motion.input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter city name..."
                whileFocus={{ scale: 1.03 }}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/80 dark:bg-white/20 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-gray-900 dark:text-white"
              />
            </div>
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all disabled:opacity-50"
            >
              Search
            </motion.button>
          </motion.div>
        </form>

        <motion.div className="flex items-center justify-end mb-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setDarkMode(prev => !prev)}
              className="p-2 rounded-full bg-white/40 dark:bg-gray-700 hover:scale-110 transition-transform"
            >
              {darkMode ? <Sun className="text-yellow-400" /> : <Moon className="text-black" />}
            </button>
            <div className="flex items-center gap-2">
              {theme === 'day' ? <CloudSun className="text-yellow-400" /> : <CloudMoon className="text-white" />}
              <span className="text-sm text-gray-700 dark:text-gray-300">{theme === 'day' ? 'Day' : 'Night'} Mode</span>
            </div>
          </div>
        </motion.div>

        {loading && (
          <motion.div className="flex justify-center items-center py-12" initial={{ scale: 0.8 }} animate={{ scale: 1 }} transition={{ duration: 0.5 }}>
            <Loader2 className="w-8 h-8 text-white animate-spin" />
          </motion.div>
        )}

        {error && (
          <motion.div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {error}
          </motion.div>
        )}

        {weather && !loading && (
          <motion.div className="relative" initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5 }}>
            <motion.button
              onClick={handleRefresh}
              whileHover={{ rotate: 180 }}
              className="absolute right-4 top-4 p-2 rounded-full bg-white/50 hover:bg-white/80 transition-all"
              title="Refresh weather data"
            >
              <RefreshCw className="w-5 h-5 text-gray-700" />
            </motion.button>
            <motion.div
              className="text-center text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {/* {dayjs().format('dddd, MMMM D, YYYY - h:mm A')} */}
            </motion.div>
            <WeatherCard data={weather} />
            {forecast && <ForecastCard data={forecast} />}
          </motion.div>
        )}

        {history.length > 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
            <SearchHistory history={history} onSelect={fetchWeather} />
          </motion.div>
        )}

        <motion.footer
          className="text-center mt-10 opacity-80 text-sm text-gray-700 dark:text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          © 2025 Weatherify. Built with ☁️ & ❤️
        </motion.footer>
      </div>
    </motion.div>
  );
}

export default App;
