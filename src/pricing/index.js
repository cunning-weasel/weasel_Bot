require("dotenv").config();
const crypto = require("crypto");
const axios = require("axios");

const apiKey = process.env.COINBASE_API_KEY;
const apiSecret = process.env.COINBASE_API_SECRET;

const createRequest = (method, path, body) => {
  const timestamp = Math.floor(Date.now() / 1000);

  const message = `${timestamp}${method}${path}${body}`;
  const signature = crypto
    .createHmac("sha256", apiSecret)
    .update(message)
    .digest("hex");

  return {
    method,
    url: path,
    baseURL: "https://api.coinbase.com",
    headers: {
      "CB-ACCESS-SIGN": signature,
      "CB-ACCESS-TIMESTAMP": timestamp,
      "CB-ACCESS-KEY": apiKey,
    },
  };
};

module.exports = {
  getAllPrices: async function () {
    const actions = [
      this.getPrice("BTC-EUR", "spot"),
      this.getPrice("BTC-EUR", "buy"),
      this.getPrice("BTC-EUR", "sell"),
      this.getPrice("ETH-EUR", "spot"),
      this.getPrice("ETH-EUR", "buy"),
      this.getPrice("ETH-EUR", "sell"),
    ];

    try {
      const results = await Promise.all(actions);

      const ordering = [
        "btc_spot",
        "btc_buy",
        "btc_sell",
        "eth_spot",
        "eth_buy",
        "eth_sell",
      ];
      const data = {};

      for (let i = 0; i < ordering.length; i++) {
        const order = ordering[i];
        const result = results[i];
        data[order] = result;
      }

      const formattedData = {
        btc: {
          base: "BTC",
          currency: "EUR",
          spot: data["btc_spot"],
          buy: data["btc_buy"],
          sell: data["btc_sell"],
        },
        eth: {
          base: "ETH",
          currency: "EUR",
          spot: data["eth_spot"],
          buy: data["eth_buy"],
          sell: data["eth_sell"],
        },
        time: new Date().toISOString(),
      };

      return formattedData;
    } catch (err) {
      console.error(err);
    }
  },

  getPrice: async function (currencyPair, type) {
    const path = `/v2/prices/${currencyPair}/${type}`;
    const request = createRequest("GET", path, "");

    try {
      const response = await axios(request);
      return response.data.data.amount;
    } catch (err) {
      console.error(err);
    }
  },

  getBuyPrice: async function () {
    return this.getPrice("BTC-EUR", "buy");
  },

  getSellPrice: async function () {
    return this.getPrice("BTC-EUR", "sell");
  },

  getSpotPrice: async function () {
    return this.getPrice("BTC-EUR", "spot");
  },

  getEthBuyPrice: async function () {
    return this.getPrice("ETH-EUR", "buy");
  },

  getEthSellPrice: async function () {
    return this.getPrice("ETH-EUR", "sell");
  },

  getEthSpotPrice: async function () {
    return this.getPrice("ETH-EUR", "spot");
  },
};
