const { isConnectedToDB } = require('../libs/db/models');
const logger = require('./helpers/logger');

isConnectedToDB()
  .then(() => {
    const app = require('./config/app');
    const { APP_PORT } = require('./config/constants');

    app.listen(APP_PORT, () => logger.info('Application successfully started'));
  })
  .catch(err => logger.error(err.message));
