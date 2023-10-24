import { createUser, getIsWantSearchUser, searchUser } from './helpers/userHelpers.js';
import {getDbData, checkIsDbExist, setDataInDb} from "./helpers/dbHelpers.js";

(async () => {
  const isDbExist = await checkIsDbExist();

  if (!isDbExist) await setDataInDb([]);


  await createUser();

  const isWantSearch = await getIsWantSearchUser()

  if (isWantSearch) {
    const dbData = await getDbData() || [];

    console.log(dbData);

    await searchUser();
  }
})();
