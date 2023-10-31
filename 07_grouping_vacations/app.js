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

  return Array.from(usersMap.values());
};

fetch('https://jsonbase.com/sls-team/vacations')
  .then(res => res.json())
  .then(res => {
    const usersArr = getGroupedUsers(res.data);
    console.log(usersArr);
  })
  .catch(err => {
    const usersArr = getGroupedUsers(usersData);
    console.log(usersArr);
  });