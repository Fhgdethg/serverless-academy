import axios from 'axios';

const monoBankApiPass = 'https://api.monobank.ua';

export const monoBankApi = axios.create({
  baseURL: monoBankApiPass,
});