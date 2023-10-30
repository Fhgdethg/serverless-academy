const fs = require('fs');
const path = require('path');

const readAndSplitFile = (filePath) => {
  const fileContent = fs.readFileSync(filePath, 'utf-8');

  const names = fileContent
    .split('\n')
    .map(line => line.trim())
    .filter(line => line);

  return names;
};

function uniqueValues(fileContents) {
  const uniquePhrases = new Set();

  fileContents.forEach(phrases => {
    phrases.forEach(phrase => uniquePhrases.add(phrase));
  });

  return uniquePhrases.size;
}

function existInAllFiles(fileContents) {
  let countPhrases = 0;

  fileContents.forEach(phrases => countPhrases += new Set(phrases).size);

  return countPhrases;
}

function existInAtLeastTen(fileContents, filesCount = 10) {
  let countPhrases = 0;
  const optimizedFilesCount = filesCount >= 10 ? filesCount : 10;

  fileContents.forEach((phrases, idx) => {
    if (idx + 1 > optimizedFilesCount) return;

    countPhrases += new Set(phrases).size;
  });

  return countPhrases;
}

const startTime = Date.now();

const directoryPath = './files';
const filePaths = Array.from({ length: 20 }, (_, i) => path.join(directoryPath, `out${i}.txt`));

const fileContents = filePaths.map(readAndSplitFile);

const uniqueCount = uniqueValues(fileContents);
const allFilesCount = existInAllFiles(fileContents);
const atLeastTenCount = existInAtLeastTen(fileContents);

console.log(`Unique usernames: ${uniqueCount};`);
console.log(`In 20 files: ${allFilesCount};`);
console.log(`At least in 10 files: ${atLeastTenCount};`);

const endTime = Date.now();

console.log(`Time: ${endTime - startTime} ms.`);