const express = require("express");
const cors = require('cors'); 
const http = require("http");
const socketIo = require("socket.io");

const mysql = require("mysql");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(cors()); 

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

app.use(express.static(path.join(__dirname, "public")));

app.get("/socket.io/socket.io.js", (req, res) => {
  res.sendFile(__dirname + "/node_modules/socket.io/client-dist/socket.io.js");
});

app.get('/flightsByAirport/:airportCode', (req, res) => {
  const airportCode = req.params.airportCode;
  const query = `
    SELECT * FROM flights
    WHERE dep_iata = ? OR arr_iata = ?
  `;

  db.query(query, [airportCode, airportCode], (err, result) => {
    if (err) {
      console.error('Error retrieving flights by airport: ' + err);
      res.status(500).json({ error: 'Error retrieving flights by airport.' });
    } else {
      res.json(result);
    }
  });
});

app.get('/flightsByDate/:date', (req, res) => {
  const date = req.params.date;

  const query = `
    SELECT * FROM flights
    WHERE DATE(dep_time) = ?
  `;

  db.query(query, [date], (err, result) => {
    if (err) {
      console.error('Error retrieving flights by date: ' + err);
      res.status(500).json({ error: 'Error retrieving flights by date.' });
    } else {
      res.json(result);
    }
  });
});

io.on("connection", (socket) => {

  function handleNewFlight(newFlight) {
    io.emit('newFlight', { method: "POST", newFlight });
  }

  db.query("SELECT * FROM flights", (err, result) => {
    if (err) {
      console.error("Error fetching flight data:  " + err);
    } else {
      socket.emit("initialData", result);
    }
  });

  const changeStream = db.query("SELECT * FROM flights").stream();

  changeStream.on("data", (data) => {
    socket.emit("dataUpdated", { method: "PUT", updatedFlight: data });
  });

  changeStream.on("end", () => {
    console.log("Observer finished");
  });
});

server.listen(port, () => {
  console.log(`Express server is listening on port ${port}`);
});
