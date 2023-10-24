const { rl } = require('./readlineHelpers');
const getWords = async () => {
  const str = await rl.question('Hello. Enter 10 words or digits dividing them with spaces: ');

  return str.trim().split(' ');
};

exports.getWords = getWords