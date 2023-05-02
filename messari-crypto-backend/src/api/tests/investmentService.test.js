const { expect } = require('chai');
const sinon = require('sinon');
const { calculateInvestmentsAnualReturns } = require('../services/invesmentsService');
const { btcAssetId, ethAssetId, cardanoAssetId } = require('../../config/vars');

describe('calculateInvestmentsAnualReturns', () => {
  let axios; let
    io;

  beforeEach(() => {
    axios = {
      get: sinon.stub(),
    };
    io = {
      emit: sinon.stub(),
    };
  });

  it('should calculate investments annual returns and emit the results', async () => {
    const btcMetrics = {
      data: {
        market_data: {
          price_usd: 50000,
        },
      },
    };
    const ethMetrics = {
      data: {
        market_data: {
          price_usd: 3000,
        },
      },
    };
    const cardanoMetrics = {
      data: {
        market_data: {
          price_usd: 1.5,
        },
      },
    };

    axios.get.withArgs(`https://data.messari.io/api/v1/assets/${btcAssetId}/metrics`).resolves({ data: btcMetrics });
    axios.get.withArgs(`https://data.messari.io/api/v1/assets/${ethAssetId}/metrics`).resolves({ data: ethMetrics });
    axios.get.withArgs(`https://data.messari.io/api/v1/assets/${cardanoAssetId}/metrics`).resolves({ data: cardanoMetrics });

    const investment = 10000;

    await calculateInvestmentsAnualReturns(io, axios, investment);

    const [args] = io.emit.args;
    expect(args[0]).to.equal('returns');

    const returns = args[1];

    expect(returns.BTC.usd).to.be.an('number');
    expect(returns.BTC.crypto).to.be.an('number');

    expect(returns.ETH.usd).to.be.an('number');
    expect(returns.ETH.crypto).to.be.an('number');

    expect(returns.ADA.usd).to.be.an('number');
    expect(returns.ADA.crypto).to.be.an('number');
  });
});
