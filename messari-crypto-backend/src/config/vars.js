const path = require('path');

// import .env variables
require('dotenv-safe').config({
  path: path.join(__dirname, '../../.env'),
  example: path.join(__dirname, '../../.env.example'),
});

module.exports = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  logs: process.env.NODE_ENV === 'production' ? 'combined' : 'dev',
  btcAssetId: process.env.BTC_ASSET_ID,
  ethAssetId: process.env.ETH_ASSET_ID,
  cardanoAssetId: process.env.CARDANO_ASSET_ID,
  apiKey: process.env.API_KEY,
};
