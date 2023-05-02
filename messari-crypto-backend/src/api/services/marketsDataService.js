/* eslint-disable max-len */
const { btcAssetId, ethAssetId, cardanoAssetId } = require('../../config/vars');

exports.getMarketDataInterval = (io, logger, axios, messageType, interval) => setInterval(async () => {
  try {
    const [{ data: btcMetrics }, { data: ethMetrics }, { data: cardanoMetrics }] = await Promise.all([
      axios.get(`https://data.messari.io/api/v1/assets/${btcAssetId}/metrics`),
      axios.get(`https://data.messari.io/api/v1/assets/${ethAssetId}/metrics`),
      axios.get(`https://data.messari.io/api/v1/assets/${cardanoAssetId}/metrics`),
    ]);

    io.emit(messageType, {
      marketData: [
        btcMetrics,
        ethMetrics,
        cardanoMetrics,
      ],
    });
  } catch (error) {
    logger.info(error);
    console.error(error);
  }
}, interval);

exports.getMarketData = async (io, logger, axios, messageType) => {
  try {
    const [{ data: btcMetrics }, { data: ethMetrics }, { data: cardanoMetrics }] = await Promise.all([
      axios.get(`https://data.messari.io/api/v1/assets/${btcAssetId}/metrics`),
      axios.get(`https://data.messari.io/api/v1/assets/${ethAssetId}/metrics`),
      axios.get(`https://data.messari.io/api/v1/assets/${cardanoAssetId}/metrics`),
    ]);

    io.emit(messageType, {
      marketData: [
        btcMetrics,
        ethMetrics,
        cardanoMetrics,
      ],
    });
  } catch (error) {
    logger.info(error);
    console.error(error);
  }
};
