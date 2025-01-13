import React, { useEffect, useState } from 'react';
import Search from '../search';

export default function Weather() {
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);
    const [weatherData, setWeatherData] = useState(null);
  
    async function fetchWeatherData(param) {
      setLoading(true);
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${param}&appid=f2b9af3dc963b0e7f59e23478c0997c8&units=metric`
        );
        const data = await response.json();
        if (data) {
          setWeatherData(data);
          setLoading(false);
        }
      } catch (e) {
        console.log(e);
        setLoading(false);
      }
    }
  
    async function handleSearch() {
      fetchWeatherData(search);
    }
  
    function getCurrentDate() {
      return new Date().toLocaleString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      });
    }
  
    useEffect(() => {
      fetchWeatherData('Bangalore');
    }, []);
  
    return (
      <div className="weather-app">
        <Search search={search} setSearch={setSearch} handleSearch={handleSearch} />
        {loading ? (
          <div className="loading">Loading...</div>
        ) : (
          <div>
            <div className="city-name">
              <h2>
                {weatherData?.name}, <span>{weatherData?.sys?.country}</span>
              </h2>
            </div>
            <div className="date">
              <span>{getCurrentDate()}</span>
            </div>
            <div>
              <div className="weather-temp">{weatherData?.main?.temp}°C</div>
              <p className="description">
                {weatherData?.weather?.[0]?.description || ''}
              </p>
              <div className="weather-info">
                <div>
                  <p className="wind">{weatherData?.wind?.speed} m/s</p>
                  <p>Wind Speed</p>
                </div>
                <div>
                  <p className="humidity">{weatherData?.main?.humidity}%</p>
                  <p>Humidity</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }