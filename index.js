//const keep_alive = require('./lib/keep_alive');
const http = require('http');

require("./config");
require("./chat/ttdl");
require("./chat/chatgpt");
require("./chat/ytdl");
require("./chat/aytdl");
require("./chat/igdl.js");
require("./chat/fbdl.js");
require("./chat/twdl");

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end(JSON.stringify(global.donate));
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
