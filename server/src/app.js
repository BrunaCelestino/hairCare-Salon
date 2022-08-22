const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const cors = require('cors');
const configViewEngine = require('./config/viewEngine');
// const swaggerUI = require('swagger-ui-express');

app.use(cors());

require('dotenv-safe').config();

const db = require('./database/postgreSQLconfig');

db.connect();
configViewEngine(app);

// const swaggerDocument = require('./swagger.json');
const index = require('./routes/indexRoutes');
const homepage = require('./routes/homepageRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const unitRoutes = require('./routes/unitRoutes');
const clientRoutes = require('./routes/clientRoutes');
const professionalRoutes = require('./routes/professionalRoutes');
const schedulelRoutes = require('./routes/scheduleRoutes');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', index, homepage);
app.use('/service', serviceRoutes);
app.use('/unit', unitRoutes);
app.use('/client', clientRoutes);
app.use('/professional', professionalRoutes);
app.use('/schedule', schedulelRoutes);
// app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

module.exports = app;
