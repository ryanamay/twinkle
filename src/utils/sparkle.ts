const SPARKLE_BASE_URL = process.env.NEXT_PUBLIC_SPARKLE_BASE_URL;

export const fetchQuote = async (symbol: string) => {
  const url = `${SPARKLE_BASE_URL}/api/v1/quote?symbol=${symbol}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error('Error fetching quote');
  }
  return res.json();
};

export const fetchSymbols = async (symbol: string) => {
  const url = `${SPARKLE_BASE_URL}/api/v1/search?query=${symbol}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error('Error fetching symbols');
  }
  const data = await res.json();
  return {
    symbols: data.result,
    totalCount: data.totalCount,
  };
};

export const startWebSocket = async () => {
  const url = `${SPARKLE_BASE_URL}/ws/start-websocket`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error('Error starting WebSocket');
  }
  return res.json();
};

export const fetchNews = async () => {
  const url = `${SPARKLE_BASE_URL}/api/v1/marketnews`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error('Error fetching news');
  }
  return res.json();
}