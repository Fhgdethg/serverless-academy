import { getParsedNowDate } from "./timeService.js";
import {getCacheData, setMInCache} from "./cacheService.js";

import { privatBankApi } from "../api/privatBankApi.js";
import { monoBankApi } from "../api/monoBankApi.js";

import { qKeys } from "../constants/qKeys.js";
import { monoEUR, monoUAH, monoUSD } from "../constants/currencies.js";

const getPrivatBankCourse = async (currencyAbbr) => {
  const { data: privatCourses } = await privatBankApi(qKeys.exchangeRates, {
    params: {
      date: getParsedNowDate(),
    }
  });

  const { saleRateNB, purchaseRate } = privatCourses.exchangeRate.find(
    ({ baseCurrency, currency }) => baseCurrency === 'UAH' && currency === currencyAbbr
  );

  return {
    privatBuy: saleRateNB,
    privatSell: purchaseRate,
  };
}

const getMonoBankCourse = async (currencyAbbr) => {
  try {
    const courseCache = getCacheData(currencyAbbr);

    if (courseCache) {
      return {
        monoBuy: courseCache.rateBuy,
        monoSell: courseCache.rateSell,
      };
    }

    const { data: monoCourses } = await monoBankApi(`${qKeys.bank}${qKeys.currency}`);

    const { rateBuy: rateBuyUSD, rateSell: rateSellUSD } = monoCourses.find(
      ({ currencyCodeA, currencyCodeB }) =>
        currencyCodeA === monoUSD && currencyCodeB === monoUAH
    );
    const { rateBuy: rateBuyEUR, rateSell: rateSellEUR } = monoCourses.find(
      ({ currencyCodeA, currencyCodeB }) =>
        currencyCodeA === monoEUR && currencyCodeB === monoUAH
    );

    setMInCache([
      {key: "USD", val: { rateBuy: rateBuyUSD, rateSell: rateSellUSD }, ttl: 62},
      {key: "EUR", val: { rateBuy: rateBuyEUR, rateSell: rateSellEUR }, ttl: 62},
    ]);

    return {
      monoBuy: currencyAbbr === 'USD' ? rateBuyUSD : rateBuyEUR,
      monoSell: currencyAbbr === 'USD' ? rateSellUSD : rateSellEUR,
    };
  } catch (err) {
    const courseCache = getCacheData(currencyAbbr);

    return {
      monoBuy: courseCache.rateBuy,
      monoSell: courseCache.rateSell,
    };
  }
}

export const getCourses = async (currencyAbbr) => {
  const { privatBuy, privatSell } = await getPrivatBankCourse(currencyAbbr);
  const { monoBuy, monoSell } = await getMonoBankCourse(currencyAbbr);

  const courseOutput = `
    Курс ${currencyAbbr === 'USD' ? 'доллара' : 'євро'};
    Приватбанк: ${privatBuy.toFixed(2)}/${privatSell.toFixed(2)};
    Монобанк: ${monoBuy.toFixed(2)}/${monoSell.toFixed(2)};
  `;

  return courseOutput;
}