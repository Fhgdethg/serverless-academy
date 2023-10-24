const readline = require('readline/promises');

const { stdin: input, stdout: output } = process;
const rl = readline.createInterface({ input, output });

exports.rl = rl;