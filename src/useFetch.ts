export const getExchangeData = async (url: string) => {
  const data = await fetch(url);
  const exchangeData = data.json();
  return exchangeData;
};
