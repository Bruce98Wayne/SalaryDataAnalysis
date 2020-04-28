
const express = require('express');
const app = express();
const port = process.env.PORT || 4000;
const db = require('./db/db')

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));


db.authenticate()
  .then(() => { 
    console.log('Connected to the database successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  })

// create a GET route
app.get('/express_backend', (req, res) => {
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});