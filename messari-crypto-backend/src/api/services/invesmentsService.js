/* eslint-disable max-len */
const { btcAssetId, ethAssetId, cardanoAssetId } = require('../../config/vars');

exports.calculateInvestmentsAnualReturns = async (io, axios, investment) => {
  try {
    const [{ data: btcMetrics }, { data: ethMetrics }, { data: cardanoMetrics }] = await Promise.all([
      axios.get(`https://data.messari.io/api/v1/assets/${btcAssetId}/metrics`),
      axios.get(`https://data.messari.io/api/v1/assets/${ethAssetId}/metrics`),
      axios.get(`https://data.messari.io/api/v1/assets/${cardanoAssetId}/metrics`),
    ]);

    const btcPrice = btcMetrics.data.market_data.price_usd;
    const ethPrice = ethMetrics.data.market_data.price_usd;
    const cardanoPrice = cardanoMetrics.data.market_data.price_usd;

    const btcReturnsInUSD = (investment * (1 + 0.05) ** 12) - investment;
    const ethReturnsInUSD = (investment * (1 + 0.042) ** 12) - investment;
    const cardanoReturnsInUSD = (investment * (1 + 0.01) ** 12) - investment;

    const btcFinalQuantity = btcReturnsInUSD / btcPrice;
    const ethFinalQuantity = ethReturnsInUSD / ethPrice;
    const cardanoFinalQuantity = cardanoReturnsInUSD / cardanoPrice;

    io.emit('returns', {
      BTC: { usd: btcReturnsInUSD, crypto: btcFinalQuantity },
      ETH: { usd: ethReturnsInUSD, crypto: ethFinalQuantity },
      ADA: { usd: cardanoReturnsInUSD, crypto: cardanoFinalQuantity },
    });
  } catch (error) {
    console.error(error);
  }
};
