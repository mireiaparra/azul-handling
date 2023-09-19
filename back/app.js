const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const mysql = require("mysql");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const port = process.env.PORT || 3000;

const db = mysql.createConnection({
  host: "localhost",
  user: "mireia",
  password: "azul_prueba",
  database: "flights",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database: " + err);
  } else {
    console.log("Connected to the database");
  }
});

app.get("/socket.io/socket.io.js", (req, res) => {
  res.sendFile(__dirname + "/node_modules/socket.io/client-dist/socket.io.js");
});

io.on("connection", (socket) => {
  db.query("SELECT * FROM flights", (err, result) => {
    if (err) {
      console.error("Error fetching flight data:  " + err);
    } else {
      socket.emit("initialData", result);
    }
  });

  const changeStream = db.query("SELECT * FROM flights").stream();

  changeStream.on("data", (data) => {
    socket.emit("dataUpdated", data);
  });

  changeStream.on("end", () => {
    console.log("Observer finished");
  });
});

server.listen(port, () => {
  console.log(`Express server is listening on port ${port}`);
});
