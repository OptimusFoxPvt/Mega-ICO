const axios = require("axios");
const config = require("../config/configBasic");

exports.livePrice = async (coin) => {
  try {
    const api = await axios.get(
      `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${coin}&tsyms=USD&api_key=${config.coinmarket.API_KEY}`
    );

    if (api) {
      const price = api.data[coin].USD;
      return price;
    }
  } catch (error) {
    return error.message;
  }
};
