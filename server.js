const express = require("express");
const path = require("path");

const app = express();
const server = require("http").createServer(app);

const io = require("socket.io")(server);

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname + "/public")));

app.get("/", (req, res) => {
  res.render("start");
});
app.get("/send", (req, res) => {
  res.render("sender");
});
app.get("/receive", (req, res) => {
  res.render("receiver");
});

io.on("connection", function (socket) {
  socket.on("sender-join", function (data) {
    socket.join(data.uid);
  });
  socket.on("receiver-join", function (data) {
    socket.join(data.uid);
    socket.in(data.sender_uid).emit("init", data.uid);
  });
  socket.on("file-meta", function (data) {
    socket.in(data.uid).emit("fs-meta", data.metadata);
  });
  socket.on("fs-start", function (data) {
    socket.in(data.uid).emit("fs-share", {});
  });
  socket.on("file-raw", function (data) {
    socket.in(data.uid).emit("fs-share", data.buffer);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
