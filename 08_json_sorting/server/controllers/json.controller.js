export const jsonController = (req, res, data) => {
  res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8;' });
  res.end(JSON.stringify({data}));
}