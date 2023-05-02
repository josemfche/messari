// make bluebird default Promise
Promise = require('bluebird'); // eslint-disable-line no-global-assign
const axios = require('axios');
const { port, env } = require('./config/vars');
const logger = require('./config/logger');
const { server, io } = require('./config/express');
const { getMarketDataInterval, getMarketData } = require('./api/services/marketsDataService');
const { calculateInvestmentsAnualReturns } = require('./api/services/invesmentsService');
const { apiKey } = require('./config/vars');

// listen to requests
server.listen(port, () => logger.info(`server started on port ${port} (${env})`));

axios.defaults.headers.get['x-rapid-api-key'] = apiKey;

io.on('connection', (socket) => {
  console.log('Connected');
  getMarketData(io, logger, axios, 'market:data');

  socket.on('investment:anual', (data) => {
    calculateInvestmentsAnualReturns(socket, axios, data);
  });
});

// Send market data automatically thru websockets
getMarketDataInterval(io, logger, axios, 'market:data', 5000);

/**
* Exports express
* @public
*/
module.exports = server;
