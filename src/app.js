const express = require('express');
const bodyParser = require('body-parser');
const mainRouter = require('./routes/mainRoute');
const app = express();
const sequelize = require('./models/db');

// Middleware
app.use(bodyParser.json());
app.use('', mainRouter);

app.set('sequelize', sequelize)
app.set('models', sequelize.models)

module.exports = app;