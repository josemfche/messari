// @ts-nocheck
// CSVLink and saveAs are having type issues
import { CSVLink } from 'react-csv'
import { saveAs } from 'file-saver'
import { ReactSVG } from 'react-svg'
import { CryptoData } from '../utils/types'

type CryptoTableProps = {
  data: CryptoData[];
};

const CryptoTable: React.FC<CryptoTableProps> = ({ data }) => {

  const headers = [
    { label: 'Symbol', key: 'symbol' },
    { label: 'Name', key: 'name' },
    { label: 'Price USD', key: 'price_usd' },
    { label: 'Price BTC', key: 'price_btc' },
    { label: '24h Volume', key: 'volume_last_24_hours' },
    { label: '% Change 1h', key: 'percent_change_usd_last_1_hour' },
    { label: '% Change 24h', key: 'percent_change_usd_last_24_hours' },
    { label: 'Market Cap', key: 'marketcap_current_marketcap_usd' },
    { label: 'Circulating Supply', key: 'supply_circulating' },
    { label: 'Block Count 24h', key: 'blockchain_stats_24_hours_count_of_blocks_added' },
  ];

  const csvData = data?.map(({ data: crypto }) => ({
    symbol: crypto.symbol.toUpperCase(),
    name: crypto.name,
    price_usd: `$${crypto.market_data.price_usd.toFixed(2)}`,
    price_btc: crypto.market_data.price_btc.toFixed(8),
    volume_last_24_hours: `$${crypto.market_data.volume_last_24_hours.toFixed(2)}`,
    percent_change_usd_last_1_hour: `${crypto.market_data.percent_change_usd_last_1_hour.toFixed(2)}%`,
    percent_change_usd_last_24_hours: `${crypto.market_data.percent_change_usd_last_24_hours.toFixed(2)}%`,
    marketcap_current_marketcap_usd: `$${crypto.marketcap.current_marketcap_usd.toLocaleString()}`,
    supply_circulating: crypto.supply.circulating.toLocaleString(),
    blockchain_stats_24_hours_count_of_blocks_added: crypto.blockchain_stats_24_hours.count_of_blocks_added.toLocaleString(),
  }));

  const json = JSON.stringify(data, null, 2);


  const handleJSONExport = () => {
    const jsonBlob = new Blob([json], { type: 'application/json' });
    saveAs(jsonBlob, "table-data.json");
  };


  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <table className="table-auto w-full text-white dark:text-gray-300">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs text-center font-medium text-gray-500 uppercase tracking-wider">
              Symbol
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs text-center font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs text-center font-medium text-gray-500 uppercase tracking-wider">
              Price USD
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs text-center font-medium text-gray-500 uppercase tracking-wider">
              Price BTC
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs text-center font-medium text-gray-500 uppercase tracking-wider">
              24h Volume
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs text-center font-medium text-gray-500 uppercase tracking-wider">
              % Change 1h
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs text-center font-medium text-gray-500 uppercase tracking-wider">
              % Change 24h
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs text-center font-medium text-gray-500 uppercase tracking-wider">
              Market Cap
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs text-center font-medium text-gray-500 uppercase tracking-wider">
              Circulating Supply
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs text-center font-medium text-gray-500 uppercase tracking-wider">
              Block Count 24h
            </th>
          </tr>
        </thead>
        <tbody className="bg-gray-800 divide-y divide-gray-700">
          {data.map(({ data: crypto }, index) => (
            <tr key={index} className="hover:bg-gray-700">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10">
                    <ReactSVG src={`/${crypto.symbol.toLowerCase()}.svg`} />
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-200 text-center">{crypto.symbol.toUpperCase()}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-200 text-center">{crypto.name}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className={`text-sm font-medium ${crypto.market_data.percent_change_usd_last_24_hours >= 0 ? 'text-green-300' : 'text-red-300'}`}>
                  ${crypto.market_data.price_usd.toFixed(2)}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className={`text-sm font-medium ${crypto.market_data.percent_change_btc_last_24_hours >= 0 ? 'text-green-300' : 'text-red-300'}`}>
                  {crypto.market_data.price_btc.toFixed(8)}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-200 text-center">${crypto.market_data.volume_last_24_hours.toFixed(2)}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs text-center leading-5 font-semibold rounded-full ${crypto.market_data.percent_change_usd_last_1_hour >= 0 ? 'bg-green-500 text-green-100' : 'bg-red-500 text-red-100'}`}>
                  {crypto.market_data.percent_change_usd_last_1_hour.toFixed(2)}%
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs text-center leading-5 font-semibold rounded-full ${crypto.market_data.percent_change_usd_last_24_hours >= 0 ? 'bg-green-500 text-green-100' : 'bg-red-500 text-red-100'}`}>
                  {crypto.market_data.percent_change_usd_last_24_hours.toFixed(2)}%
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-200 text-center">${crypto.marketcap.current_marketcap_usd.toLocaleString()}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-200 text-center">{crypto.supply.circulating.toLocaleString()}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-200 text-center">{crypto.blockchain_stats_24_hours.count_of_blocks_added.toLocaleString()}</div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex mt-4">
        <button className="btn btn-primary text-white hover:text-white mr-2" onClick={handleJSONExport}>Export JSON</button>
        <button className="btn btn-primary" >
          {csvData && <CSVLink className="text-white hover:text-white mr-2" data={csvData} headers={headers}>
            Download CSV
          </CSVLink>
          }</button>
      </div>
    </>
  );
};

export default CryptoTable