const { rl } = require('./readlineHelpers');

const getOnlyWords = (strArr) => strArr.filter(str => /^[a-zA-Z]+$/.test(str));

const getOnlyNumbers = (strArr) => strArr.filter(str => Number(str));

const sortWordsFromAToZ = (words) => words.sort((a, b) => a.localeCompare(b));

const sortNumbersToMax = (numbers) =>
  numbers
    .map(Number)
    .sort((a, b) => a - b)
    .map(String);

const sortNumbersToMin = (numbers) =>
  numbers
    .map(Number)
    .sort((a, b) => b - a)
    .map(String);

const sortWordsByLengthToMax = (words) => words.sort((a, b) => a.length - b.length);



const variantsHandler = async (strArr) => {
    let variant;
    let clearVariant;

    const isLongStr = strArr.length >= 10;

    while (true) {
      variant  = await rl.question('Select (1 - 5) and press ENTER: ');
      clearVariant = variant.trim();

      const onlyWords = getOnlyWords(strArr);
      const onlyNumbers = getOnlyNumbers(strArr);
      const sortedWords = sortWordsFromAToZ(onlyWords);

      if (clearVariant === '1' && isLongStr) {
        console.log(sortedWords);
        return clearVariant;
      }
      else if (clearVariant === '2' && isLongStr) {
        const sortedNumbersToMax = sortNumbersToMax(onlyNumbers);
        console.log(sortedNumbersToMax);
        return clearVariant;
      }
      else if (clearVariant === '3' && isLongStr) {
        const sortedNumbersToMin = sortNumbersToMin(onlyNumbers);
        console.log(sortedNumbersToMin);
        return clearVariant;
      }
      else if (clearVariant === '4' && isLongStr) {
        const sortedWordsByLengthToMax = sortWordsByLengthToMax(onlyWords);
        console.log(sortedWordsByLengthToMax);
        return clearVariant;
      }
      else if (clearVariant === '5' && isLongStr) {
        const onlyUniqueWords = [...new Set(onlyWords)];
        console.log(onlyUniqueWords);
        return clearVariant;
      }
      else if (clearVariant === '6' && isLongStr) {
        const onlyUniqueWordsAndNumbers = [...new Set([...onlyWords, ...onlyNumbers])];
        console.log(onlyUniqueWordsAndNumbers);
        return clearVariant;
      }
      else if (clearVariant === 'exit') {
        console.log('Good bye! Come back again!');
        return clearVariant;
      }
      else if (clearVariant !== 'exit' && !isLongStr) {
        console.log('Data is not correct')
        return clearVariant;
      }
      else {
        variant = await rl.question('Select (1 - 5) and press ENTER: ');
        clearVariant = variant.trim();
        break;
      }
    }
};

exports.variantsHandler = variantsHandler