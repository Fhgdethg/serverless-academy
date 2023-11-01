import {jsonController} from "../controllers/json.controller.js";

import {
  json_793,
  json_955,
  json_231,
  json_931,
  json_93,
  json_342,
  json_770,
  json_491,
  json_281,
  json_718,
  json_310,
  json_806,
  json_469,
  json_258,
  json_516,
  json_79,
  json_706,
  json_521,
  json_350,
  json_64,
} from '../data.js';

export const jsonRouter = (req, res, path) => {
  if (path === '/json-793') jsonController(req, res, json_793);
  else if (path === '/json-955') jsonController(req, res, json_955);
  else if (path === '/json-231') jsonController(req, res, json_231);
  else if (path === '/json-931') jsonController(req, res, json_931);
  else if (path === '/json-93') jsonController(req, res, json_93);
  else if (path === '/json-342') jsonController(req, res, json_342);
  else if (path === '/json-770') jsonController(req, res, json_770);
  else if (path === '/json-491') jsonController(req, res, json_491);
  else if (path === '/json-281') jsonController(req, res, json_281);
  else if (path === '/json-718') jsonController(req, res, json_718);
  else if (path === '/json-310') jsonController(req, res, json_310);
  else if (path === '/json-806') jsonController(req, res, json_806);
  else if (path === '/json-469') jsonController(req, res, json_469);
  else if (path === '/json-258') jsonController(req, res, json_258);
  else if (path === '/json-516') jsonController(req, res, json_516);
  else if (path === '/json-79') jsonController(req, res, json_79);
  else if (path === '/json-706') jsonController(req, res, json_706);
  else if (path === '/json-521') jsonController(req, res, json_521);
  else if (path === '/json-350') jsonController(req, res, json_350);
  else if (path === '/json-64') jsonController(req, res, json_64);

  else {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8;' });
    res.end({message: 'Route is not exist'});
  }
}