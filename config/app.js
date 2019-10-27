const app = require('express')();
const bodyParser = require('body-parser');
require('express-async-errors');
const routes = require('../routes');
const errorMiddleware = require('../middlewares/error');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api', routes);

app.use(errorMiddleware);

module.exports = app;
