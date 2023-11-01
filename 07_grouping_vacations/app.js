import usersData from './data.json' assert { type: 'json' };

const getGroupedUsers = (users) => {
  const usersMap = new Map();

  users.forEach(item => {
    const vacations = [];

    users.forEach(({ user, startDate, endDate }) => {
      if (user._id === item.user._id)
        vacations.push({
          startDate: startDate,
          endDate: endDate,
        })
    })

    usersMap.set(item.user._id, {
      userId: item.user._id,
      userName: item.user.name,
      vacations,
    });
  });

  const usersArr = Array.from(usersMap.values());
  const formattedJSON = JSON.stringify(usersArr, null, 2);

  return formattedJSON;
};

fetch('https://jsonbase.com/sls-team/vacations')
  .then(res => res.json())
  .then(res => {
    const usersJSON = getGroupedUsers(res.data);
    console.log(usersJSON);
  })
  .catch(err => {
    const usersJSON = getGroupedUsers(usersData);
    console.log(usersJSON);
  });