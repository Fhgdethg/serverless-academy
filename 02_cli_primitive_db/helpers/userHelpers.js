import inquirer from 'inquirer';

import { getDbData, setDataInDb } from './dbHelpers.js';

const ageValidation = (age) => Boolean(Number(age));

const addUserInDb = async (user) => {
  const dbData = await getDbData() || [];

  await setDataInDb([user, ...dbData]);
}

export const createUser = async () => {
  while (true) {
    const { name } = await inquirer
      .prompt([
        {
          type: 'input',
          name: 'name',
          message: 'Enter the user\'s name. To cancel press ENTER:',
      }]);

    if (!Boolean(name.trim())) break;

    const userData = await inquirer
      .prompt([
      {
        type: 'list',
        name: 'gender',
        message: 'Choose your Gender:',
        choices: ['male', 'female'],
        default: '(Use arrow keys)',
      },
      {
        type: 'input',
        name: 'age',
        message: 'Enter your age:',
      },
    ])

    const isAgeValid = ageValidation(userData.age);

    if (!isAgeValid) delete userData.age;

    const user = { name, ...userData };

    await addUserInDb(user)
  }
}

export const getIsWantSearchUser = async () => {
  const { isWantSearch } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'isWantSearch',
      message: 'Would you to search values in DB?',
      default: '(Y/n)',
    },
  ]);
  return isWantSearch
}

export const searchUser = async () => {
  const dbData = await getDbData() || [];
  const { name } = await inquirer
    .prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Enter user\'s name you wanna find in DB:',
    }]);

  if (!name.length) {
    console.log('Name is not correct.');
    return;
  }

  if (!dbData?.length) {
    console.log('DB is empty.');
    return;
  }

  const users = dbData
    .filter(user => user.name.toLowerCase() === name.toLowerCase());
  let usersDataJSON = JSON.stringify(users);
  const usersCount = users.length;

  if (!usersCount) console.log(`User ${name} was not found.`);
  else if (usersCount > 1)
    console.log(`Users with name ${name} were found.\n${usersDataJSON}`);
  else {
    usersDataJSON = JSON.stringify(users[0]);
    console.log(`User ${name} was found.\n${usersDataJSON}`);
  }
}

