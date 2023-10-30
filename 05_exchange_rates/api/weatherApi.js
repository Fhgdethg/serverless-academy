import axios from 'axios';

const weatherApiPass = 'https://api.openweathermap.org/data/2.5';

export const weatherApi = axios.create({
  baseURL: weatherApiPass,
});