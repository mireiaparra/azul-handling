// Import necessary modules
const express = require('express');
const mysql = require('mysql');

const app = express();
const port = process.env.PORT || 3000;

const db = mysql.createConnection({
  host: 'localhost',
  user: 'mireia',
  password: 'azul_prueba',
  database: 'flights'
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database: ' + err);
  } else {
    console.log('Connected to the database');
  }
});

app.get('/getFlights', (req, res) => {
  const sql = 'SELECT * FROM flights';

  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error executing the query: ' + err);
      res.status(500).json({ error: 'Error fetching flights' });
    } else {
      res.json(result); 
    }
  });
});

app.listen(port, () => {
  console.log(`Express server is listening on port ${port}`);
});

