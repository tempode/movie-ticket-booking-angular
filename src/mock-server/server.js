const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

// Custom route handling for POST requests
server.post('/bookings', (req, res) => {
  const db = router.db;
  const booking = req.body;
  const bookings = db.get('bookings');
  bookings.push(booking);
  db.write();

  res.status(201).json(booking);
});

server.use(router);
server.listen(3000, () => {
  console.log('JSON Server is running on port 3000');
});
