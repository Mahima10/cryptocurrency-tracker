export const CoinList = (currency) => `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}`

export const GetCoinData = (coinId) => `https://api.coingecko.com/api/v3/coins/${coinId}`

export const HistoricalChartData = (coinId, days = 365, currency) => `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency}&days=${days}`