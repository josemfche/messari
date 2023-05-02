import React, { useState } from "react";
import { Socket } from "socket.io-client";
import { BigNumber } from "bignumber.js";
import { ReactSVG } from "react-svg";

type Crypto = "BTC" | "ETH" | "ADA";

type CryptoReturns = {
  [key in Crypto]: {
    usd: BigNumber;
    crypto: BigNumber;
  };
};

interface CryptoInvestmentProps {
  socket: Socket;
  calculateInvestment: () => void;
  investment: number;
  setInvestment: (investment: number) => void;
  initialInvestment: number;
}

const CryptoInvestment: React.FC<CryptoInvestmentProps> = ({
  socket,
  setInvestment,
  investment,
  initialInvestment,
  calculateInvestment,
}) => {
  const [cryptoReturns, setCryptoReturns] = useState<CryptoReturns>({
    BTC: { usd: new BigNumber(0), crypto: new BigNumber(0) },
    ETH: { usd: new BigNumber(0), crypto: new BigNumber(0) },
    ADA: { usd: new BigNumber(0), crypto: new BigNumber(0) },
  });

  socket.on("returns", (data: CryptoReturns) => {
    setCryptoReturns(data);

  });

  const handleBalanceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const balance = parseFloat(event.target.value);
    if (!isNaN(balance)) {
      setInvestment(balance);
    }
  };

  const formatNumber = (num: BigNumber): string => {
    return num.toFixed(2);
  };

  return (
    <div className="dark:bg-gray-800 text-white py-12 rounded">
      <div className="container mx-auto px-4">
        <div className="max-w-lg mx-auto">
          <h1 className="text-3xl font-bold mb-6">Crypto Investment Calculator</h1>
          <div className="mb-6">
            <label htmlFor="investment" className="block mb-2 font-semibold">
              Initial balance to invest (USD)
            </label>
            <input
              type="text"
              id="investment"
              className="w-full px-4 py-3 bg-gray-800 rounded-lg border border-gray-700 focus:outline-none focus:border-gray-500"
              defaultValue={investment}
              value={investment.toString()}
              onChange={handleBalanceChange}
            />
          </div>
          <div>
            {Object.entries(cryptoReturns).map(([crypto, returns]) => (
              <div key={crypto} className="mb-8 flex flex-col justify-center border-b border-zinc-400">
                <div className="flex flex-row">
                  <ReactSVG src={`/${crypto.toLowerCase()}.svg`} className="w-6 h-6 inline-block mr-4" />
                  <h2 className="text-xl font-bold mb-4 flex items-center justity-center">
                    <span>{crypto}</span>
                  </h2>
                </div>
                <div className="mb-2 flex flex-row">
                  <span className="font-semibold mr-4 w-1/2 text-left">Initial Investment:</span>
                  <span className="font-semibold w-1/2">${initialInvestment}</span>
                </div>
                <div className="mb-2 flex flex-row">
                  <span className="font-semibold mr-4 w-1/2 text-left">Annual return in USD:</span>
                  <span className="font-semibold w-1/2">${formatNumber(returns.usd)}</span>
                </div>
                <div className="mb-2 flex flex-row">
                  <span className="font-semibold mr-4 w-1/2 text-left">Annual return in {crypto}:</span>
                  <span className="font-semibold w-1/2">{formatNumber(returns.crypto)}</span>
                </div>
                <div className="mb-4 flex flex-row">
                  <span className="font-semibold mr-4 w-1/2 text-left">Total balance after a year:</span>
                  <span className="font-semibold w-1/2">${formatNumber(new BigNumber(initialInvestment).plus(returns.usd))}</span>
                </div>
              </div>
            ))}
          </div>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={() => calculateInvestment()}>
            Calculate returns
          </button>
        </div>
      </div>
    </div>
  );
};

export default CryptoInvestment;