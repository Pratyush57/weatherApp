import { useEffect, useState } from 'react';
import axios from 'axios';
import { WeatherData, ForecastData } from '../types/weather';

const API_KEY = "821a06c2e2f6c197ff7bfa8dd99057a3";

export const useWeather = (city: string) => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [forecastData, setForecastData] = useState<ForecastData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);
        setError(null);

        const weatherRes = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        );

        const forecastRes = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
        );

        setWeatherData(weatherRes.data);
        setForecastData(forecastRes.data);
      } catch (err: any) {
        setError('Failed to fetch weather data');
        console.error('Weather API error:', err);
      } finally {
        setLoading(false);
      }
    };

    if (city) fetchWeather();
  }, [city]);

  return { weatherData, forecastData, loading, error };
};
