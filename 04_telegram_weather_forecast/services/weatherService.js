import { weatherApi } from "../api/weatherApi.js";

import { timeParser } from "./timeService.js";

import {qKeys} from "../constants/qKeys.js";

export const getTemperatureInC = (temp) => Math.round(temp - 273);

export const getOptimizedWeatherData = async () => {
  const appid = '61e132799d0ae2765657dcd33cb45f18';

  const {data: weather} = await weatherApi(qKeys.weather, {
    params: {
      q: 'Nice,FRA',
      appid,
    }
  })

  const time = timeParser(weather.dt);

  const weatherOutput =
    `
    ${time}
    
    temperature: ${getTemperatureInC(weather.main.temp)} °C;
    feels like: ${getTemperatureInC(weather.main.feels_like)} °C;
    temperature min: ${getTemperatureInC(weather.main.temp_min)} °C;
    temperature max: ${getTemperatureInC(weather.main.temp_max)} °C;
    pressure: ${weather.main.pressure} hPa;
    humidity: ${weather.main.humidity} %;
    sea level pressure: ${weather.main.sea_level} hPa;
    grand level pressure: ${weather.main.grnd_level} hPa;
    
    general description: ${weather.weather[0].description};
    
    wind speed: ${weather.wind.speed} m/s;
    wind temperature: ${getTemperatureInC(weather.wind.deg)} °C;
    `

  return weatherOutput;
};