import axios from 'axios';

const privatBankApiPass = 'https://api.privatbank.ua/p24api';

export const privatBankApi = axios.create({
  baseURL: privatBankApiPass,
});