'use strict';
(() => {
  const chip = document.getElementById('weatherChip');
  if (!chip) return;

  const CACHE_KEY = 'arborwise-weather-van-alstyne-v48';
  const CACHE_MAX_AGE = 60 * 60 * 1000;
  const REFRESH_EVERY = 30 * 60 * 1000;
  const API_URL = 'https://api.open-meteo.com/v1/forecast?latitude=33.4215&longitude=-96.5772&current=temperature_2m,weather_code,is_day&hourly=precipitation_probability&temperature_unit=fahrenheit&precipitation_unit=inch&timezone=America%2FChicago&forecast_days=1';

  const descriptions = {
    0:['☀','Clear'],1:['🌤','Mostly clear'],2:['⛅','Partly cloudy'],3:['☁','Cloudy'],
    45:['🌫','Fog'],48:['🌫','Fog'],51:['🌦','Light drizzle'],53:['🌦','Drizzle'],55:['🌧','Heavy drizzle'],
    56:['🌧','Freezing drizzle'],57:['🌧','Freezing drizzle'],61:['🌦','Light rain'],63:['🌧','Rain'],65:['🌧','Heavy rain'],
    66:['🌧','Freezing rain'],67:['🌧','Freezing rain'],71:['🌨','Light snow'],73:['🌨','Snow'],75:['❄','Heavy snow'],
    77:['❄','Snow grains'],80:['🌦','Light showers'],81:['🌧','Showers'],82:['⛈','Heavy showers'],
    85:['🌨','Snow showers'],86:['🌨','Heavy snow showers'],95:['⛈','Thunderstorms'],96:['⛈','Storms with hail'],99:['⛈','Severe storms with hail']
  };

  function readCache() {
    try {
      const saved = JSON.parse(localStorage.getItem(CACHE_KEY) || 'null');
      return saved && saved.weather ? saved : null;
    } catch {
      return null;
    }
  }

  function writeCache(weather) {
    try { localStorage.setItem(CACHE_KEY, JSON.stringify({savedAt:Date.now(), weather})); } catch {}
  }

  function render(weather, stale = false) {
    const codeInfo = descriptions[weather.code] || ['🌡','Weather'];
    const temperature = Math.round(Number(weather.temperature));
    const rainChance = Number.isFinite(Number(weather.rainChance)) ? Math.round(Number(weather.rainChance)) : 0;
    chip.classList.remove('isUnavailable');
    chip.textContent = `${codeInfo[0]} ${temperature}° · ${rainChance}%`;
    chip.title = `Van Alstyne: ${codeInfo[1]}, ${temperature}°F, ${rainChance}% chance of rain${stale ? ' (last available reading)' : ''}.`;
    chip.setAttribute('aria-label', chip.title);
    window.ARBORWISE_WEATHER = {...weather, description:codeInfo[1], stale};
    window.dispatchEvent(new CustomEvent('arborwise:weather', {detail:window.ARBORWISE_WEATHER}));
  }

  function renderUnavailable() {
    chip.classList.add('isUnavailable');
    chip.textContent = 'WX —';
    chip.title = 'Van Alstyne weather is temporarily unavailable. Arborwise operations are unaffected.';
    chip.setAttribute('aria-label', chip.title);
  }

  function nearestRainChance(data) {
    const times = Array.isArray(data.hourly?.time) ? data.hourly.time : [];
    const chances = Array.isArray(data.hourly?.precipitation_probability) ? data.hourly.precipitation_probability : [];
    const currentHour = String(data.current?.time || '').slice(0,13);
    let index = times.findIndex(time => String(time).slice(0,13) === currentHour);
    if (index < 0) index = 0;
    return Number(chances[index] ?? 0);
  }

  async function loadWeather() {
    const cached = readCache();
    if (cached) render(cached.weather, Date.now() - Number(cached.savedAt || 0) > CACHE_MAX_AGE);

    try {
      const response = await fetch(API_URL, {cache:'no-store'});
      if (!response.ok) throw new Error(`Weather request failed: ${response.status}`);
      const data = await response.json();
      const weather = {
        temperature:Number(data.current?.temperature_2m),
        code:Number(data.current?.weather_code),
        isDay:Number(data.current?.is_day),
        rainChance:nearestRainChance(data),
        observedAt:String(data.current?.time || ''),
        location:'Van Alstyne, Texas'
      };
      if (!Number.isFinite(weather.temperature)) throw new Error('Weather response did not include temperature');
      writeCache(weather);
      render(weather, false);
    } catch {
      if (!cached) renderUnavailable();
    }
  }

  loadWeather();
  setInterval(loadWeather, REFRESH_EVERY);
  window.ARBORWISE_WEATHER_CHIP_VERSION = '48';
})();
