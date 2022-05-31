const express = require("express");
const path = require("path");
const app = express();
const server = require("http").createServer(app);

const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname + "/public")));

server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
