const express = require('express');

const app = express();
const cors = require('cors');
// const swaggerUI = require('swagger-ui-express');

app.use(cors());

require('dotenv-safe').config();

const db = require('./database/postgreSQLconfig');

db.connect();

// const swaggerDocument = require('./swagger.json');
const index = require('./routes/indexRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const unitRoutes = require('./routes/unitRoutes');
const clientRoutes = require('./routes/clientRoutes');
const professionalRoutes = require('./routes/professionalRoutes');
const schedulelRoutes = require('./routes/scheduleRoutes');

app.use(express.json());

app.use('/', index);
app.use('/service', serviceRoutes);
app.use('/unit', unitRoutes);
app.use('/client', clientRoutes);
app.use('/professional', professionalRoutes);
app.use('/schedule', schedulelRoutes);
// app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

module.exports = app;
