export const timeParser = (time) => {
  const timestamp = time * 1000;

  const dateObject = new Date(timestamp);

  const year = dateObject.getFullYear();
  const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
  const day = dateObject.getDate().toString().padStart(2, '0');
  const hours = dateObject.getHours().toString().padStart(2, '0');
  const minutes = dateObject.getMinutes().toString().padStart(2, '0');
  const seconds = dateObject.getSeconds().toString().padStart(2, '0');

  const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

  return formattedDate;
}

export const getParsedNowDate = () => {
  const currentDate = new Date();
  const day = currentDate.getDate().toString().padStart(2, '0');
  const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
  const year = currentDate.getFullYear();

  const formattedDate = `${day}.${month}.${year}`;

  return formattedDate;
};