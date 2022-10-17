const API_BASE_URL = 'https://economia.awesomeapi.com.br/json/all';

const getCurrencyInfo = async () => {
  const response = await fetch(API_BASE_URL);
  const data = await response.json();
  return data;
};

export default getCurrencyInfo;
