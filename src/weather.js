import React, { useState, useEffect } from 'react';
import './App.css';

const Weather = () => {
  const [city, setCity] = useState('London');
  const [weather, setWeather] = useState(null);

  const fetchWeather = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=75202936599fa8ba21f0f88a57582b81`
      );
      const data = await response.json();
      setWeather(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, [city]);

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchWeather();
  };

  if (!weather) {
    return <div>Loading...</div>;
  }

  return (
    <div className="weather">
      <h1>Weather App</h1>
      <form onSubmit={handleSubmit}>
      <label htmlFor="city">City:</label>
<input
  type="text"
  id="city"
  name="city"
  value={city}
  onChange={handleCityChange}
/>
<button type="submit">Submit</button>
</form>
<h2>{weather.name}</h2>
<p>{weather.weather && weather.weather[0] ? weather.weather[0].description : 'No description available'}</p>
<p>Temperature: {weather.main ? weather.main.temp : 'N/A'} &#8490; </p>
<p>Feels Like: {weather.main ? weather.main.feels_like : 'N/A'}</p>
<p>Humidity: {weather.main ? weather.main.humidity : 'N/A'}</p>
</div>
  );
};

export default Weather;