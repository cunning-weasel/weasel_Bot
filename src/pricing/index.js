require("dotenv").config();
const coinbase = require("coinbase");

// client instance for interacting with the coinbase API, docs:
// https://developers.coinbase.com/api/v2#get-buy-price

const client = new coinbase.Client({
  "apiKey": process.env.COINBASE_API_KEY,
  "apiSecret": process.env.COINBASE_API_SECRET,
});

module.exports = {
  getBuyPrice: async () => {
    // try {
      client.getBuyPrice({ "currencyPair": "BTC-EUR" }, function (err, price) {
        console.log("price:", price);
        // console.log("file import and exports with obj orientated apporach works!!! :)")
      });
    // } catch (err) {
      // console.error(err);
    // }
  },
};

