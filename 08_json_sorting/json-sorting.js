const PORT = process.env.PORT || 2000;

const customBaseUrl = `http://localhost:${PORT}/jsonbase.com/sls-team/`;

const BASE_URL = process.env.BASE_URL || customBaseUrl;

const findIsDoneValue = (obj) => {
  if (obj && typeof obj === 'object') {
    if ('isDone' in obj) {
      return obj.isDone;
    }

    for (const key in obj) {
      if (typeof obj[key] === 'object') {
        const result = findIsDoneValue(obj[key]);
        if (result !== undefined) {
          return result;
        }
      }
    }
  }
  return undefined;
}

const fetchJSONWithRetries = async (urls, retries = 3) => {
  let trueCount = 0;
  let falseCount = 0;

  for (const url of urls) {
    try {
      const response = await fetch(url);

      if (response.ok) {
        const data = await response.json();

        const isDone = findIsDoneValue(data)

        if (isDone) trueCount += 1;
        else falseCount += 1;

        console.log(`[Success] ${url}: isDone - ${isDone ? 'True' : 'False'}`);
      }
      else throw new Error('The endpoint is unavailable')
    } catch (error) {
      if (retries > 0) await fetchJSONWithRetries([url], retries - 1);
      else console.log(`[Fail] ${url}: The endpoint is unavailable`);
    }
  }

  return { trueCount, falseCount }
}

const urls = [
  `${BASE_URL}json-793`,
  `${BASE_URL}json-955`,
  `${BASE_URL}json-231`,
  `${BASE_URL}json-931`,
  `${BASE_URL}json-93`,
  `${BASE_URL}json-342`,
  `${BASE_URL}json-770`,
  `${BASE_URL}json-491`,
  `${BASE_URL}json-281`,
  `${BASE_URL}json-718`,
  `${BASE_URL}json-310`,
  `${BASE_URL}json-806`,
  `${BASE_URL}json-469`,
  `${BASE_URL}json-258`,
  `${BASE_URL}json-516`,
  `${BASE_URL}json-79`,
  `${BASE_URL}json-706`,
  `${BASE_URL}json-521`,
  `${BASE_URL}json-350`,
  `${BASE_URL}json-64`,
];

(async () => {
  const { trueCount, falseCount } = await fetchJSONWithRetries(urls);

  console.log(`Found True values: ${trueCount},`);
  console.log(`Found False values: ${falseCount},`);
})();






