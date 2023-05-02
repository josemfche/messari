/* eslint-disable no-unused-expressions */
const sinon = require('sinon');
const chai = require('chai');

const { expect } = chai;

const { getMarketData } = require('../services/marketsDataService');

describe('getMarketData', () => {
  it('should emit the market data with the given message type', async () => {
    const io = { emit: sinon.spy() };
    const logger = { info: sinon.spy() };
    const axios = { get: sinon.stub() };
    axios.get.onCall(0).resolves({ data: { market_data: { price_usd: 50000 } } });
    axios.get.onCall(1).resolves({ data: { market_data: { price_usd: 2000 } } });
    axios.get.onCall(2).resolves({ data: { market_data: { price_usd: 1.2 } } });
    const messageType = 'test_message_type';

    expect(io.emit.calledOnceWith(messageType, {
      marketData: [
        { market_data: { price_usd: 50000 } },
        { market_data: { price_usd: 2000 } },
        { market_data: { price_usd: 1.2 } },
      ],
    })).to.be.false;
    expect(logger.info.called).to.be.false;
  });

  it('should log the error and throw if the axios request fails', async () => {
    const io = { emit: sinon.spy() };
    const logger = { info: sinon.spy() };
    const axios = { get: sinon.stub() };
    axios.get.rejects(new Error('test error'));
    const messageType = 'test_message_type';

    try {
      await getMarketData(io, logger, axios, messageType);
      expect.fail('Should have thrown an error');
    } catch (error) {
      expect(logger.info.calledOnce).to.be.true;
      expect(logger.info.calledWith('test error')).to.be.false;
      expect(io.emit.called).to.be.false;
    }
  });
});
