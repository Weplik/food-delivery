const { isConnectedToDB } = require('../libs/db/models');

isConnectedToDB()
  .then(() => {
    const app = require('./config/app');
    const { APP_PORT } = require('./config/constants');

    app.listen(APP_PORT, () => console.log('Application successfully started'));
  })
  .catch(err => console.error(err.message));
