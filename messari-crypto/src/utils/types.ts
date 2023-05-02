type MarketData = {
  price_usd: number;
  price_btc: number;
  volume_last_24_hours: number;
  percent_change_usd_last_1_hour: number;
  percent_change_btc_last_1_hour: number;
  percent_change_usd_last_24_hours: number;
  percent_change_btc_last_24_hours: number;
  last_trade_at: string;
};

type MarketCap = {
  rank: number;
  current_marketcap_usd: number;
};

type Supply = {
  circulating: number;
};

type BlockchainStats = {
  count_of_active_addresses: number;
  transaction_volume: number;
  adjusted_transaction_volume: number;
  median_tx_value: number;
  median_tx_fee: number;
  count_of_tx: number;
  count_of_payments: number;
  count_of_blocks_added: number;
};

export type CryptoData = {
  status: {
    elapsed: number
    timestamp: Date
  }
  data: {
    id: string;
    symbol: string;
    name: string;
    market_data: MarketData;
    marketcap: MarketCap;
    supply: Supply;
    blockchain_stats_24_hours: BlockchainStats;
    all_time_high: {
      price: number;
      at: string;
      days_since: number;
      percent_down: number;
    };
  }
};