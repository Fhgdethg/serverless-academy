import path from 'path';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const dbUrl = path.join(__dirname, '..', 'db.txt');

export const checkIsDbExist = async () => {
  try {
    await fs.access(dbUrl);
    return true;
  } catch (err) {
    return false;
  }
}

export const getDbData = async () =>
    Boolean(await fs.readFile(dbUrl, 'utf-8'))
  ? JSON.parse(await fs.readFile(dbUrl, 'utf-8'))
  : []
;

export const setDataInDb = async (data) =>
  await fs.writeFile(dbUrl, JSON.stringify(data));