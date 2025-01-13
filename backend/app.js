const express = require('express');
const bodyParser = require('body-parser');

const routes = require('./routes/index.js');
const db = require('./models');
const cors = require('cors')

const app = express();

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// CORS
app.use(cors())

// Routes
app.use('/api', routes);

db.sequelize
  .authenticate()
  .then(() => {
    console.log('Database connected successfully!');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

module.exports = app;
