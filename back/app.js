const express = require("express");
const cors = require('cors'); 
const http = require("http");
const socketIo = require("socket.io");

const mysql = require("mysql");
const path = require("path");
const bodyParser = require('body-parser')

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: '*'
  }
});

app.use(cors()); 
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
 
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

app.post('/flights', (req, res) => {
  const {reg_number, dep_iata, aircraft_icao, status, arr_iata, dep_time } = req.body;
  if (!reg_number) {
    return res.status(422).json({ error: 'reg_number must be specified' });
  }
  // Find the flight
  let query = `SELECT * FROM flights WHERE reg_number = ?;`;
  db.query(query, [reg_number], (err, result) => {
    if (err) {
      console.error('Error finding flight: ' + err);
      res.status(500).json({ error: 'Error finding flight.' });
    } else {
      const newFlight = {reg_number, dep_iata, aircraft_icao, status, arr_iata, dep_time };
      // If the flight exists, then update it
      if (result.length !== 0) {
        query = `UPDATE flights SET dep_iata =  ?, aircraft_icao = ?, status = ?, arr_iata = ?, dep_time = ? WHERE reg_number = ?;`;
        db.query(query, [dep_iata, aircraft_icao, status, arr_iata, dep_time, reg_number], (err, result) => {
          if (err) {
            console.error('Error updating flight: ' + err);
            return res.status(500).json({ error: 'Error updating flight.' });
          } else {
            // Emit the flight
            io.emit('dataUpdated', { method: "PUT", newFlight });
            return res.json(newFlight);
          }
        });
      }
      // Else insert it
      else {
        query = `INSERT INTO flights (reg_number, dep_iata, aircraft_icao, status, arr_iata, dep_time)  
        VALUES (?, ?, ?, ?, ?, ?);`
      
        db.query(query, [reg_number, dep_iata, aircraft_icao, status, arr_iata, dep_time], (err, result) => {
          if (err) {
            console.error('Error posting flight: ' + err);
            return res.status(500).json({ error: 'Error posting flight.' });
          } else {
            io.emit('newFlight', { method: "POST", newFlight });
            io.emit('dataUpdated', { method: "PUT", newFlight });
            return res.json(newFlight);
          }
        });
      }
    }
  });

  

})

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

});

server.listen(port, () => {
  console.log(`Express server is listening on port ${port}`);
});
