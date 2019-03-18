const http = require('http');
const app = require('./server/app');



const server = http.createServer(app);

const hostname = '127.0.0.1';
const port = 3000;

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});