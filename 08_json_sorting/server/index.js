import http from 'http';
import { jsonRouter } from "./routers/json.router.js";

const PORT = process.env.PORT || 2000;

const baseUrl = `http://localhost:${PORT}/jsonbase.com/sls-team/`;

const server = http.createServer((req, res) => {
  const url = new URL(req.url, baseUrl);
  const pathArr = url.pathname.split('/');
  const path = `/${pathArr[pathArr.length - 1]}`;

  jsonRouter(req, res, path);
});

server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});