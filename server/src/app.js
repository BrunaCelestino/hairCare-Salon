const express = require('express');

const app = express();
const cors = require('cors');
const swaggerUI = require('swagger-ui-express');

app.use(cors());

require('dotenv-safe').config();

const db = require('./database/mongoConfig');

db.connect();

const swaggerDocument = require('./swagger.json');
const index = require('./routes/indexRoutes');
const localAdminRoutes = require('./routes/localAdminRouter');

app.use(express.json());

app.use('/', index);
app.use('/admin', localAdminRoutes);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

module.exports = app;