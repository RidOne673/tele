const keep_alive = require('./keep_alive');
const http = require('http');

require("./ttdl")
require("./chatgpt")
require("./ytdl")
require("./aytdl")
require("./config")

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end(JSON.stringify(global.donate));
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
