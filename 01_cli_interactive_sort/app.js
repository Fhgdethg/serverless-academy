const { getWords } = require('./helpers/wordsHelpers');
const { variantsHandler } = require('./helpers/sortingVariantsHelpers');
const { rl } = require('./helpers/readlineHelpers');

const { sortingVariantsStr } = require('./constants/interfaceText.js');

(async () => {
  try {
    while (true) {
      const words = await getWords();
      console.log(sortingVariantsStr);
      const variant = await variantsHandler(words);

      if (variant === 'exit') return;
    }

  } catch (err) {
    console.error('Program error', err);
  } finally {
    rl.close();
  }
})();

