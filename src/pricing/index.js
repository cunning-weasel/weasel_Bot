require("dotenv").config();
const crypto = require("crypto");
const axios = require("axios");

const apiKey = process.env.COINBASE_API_KEY;
const apiSecret = process.env.COINBASE_API_SECRET;

// timestamp for req params
const timestamp = Math.floor(Date.now() / 1000);

// set params for message reqs - buy price reqs
const reqBuy = {
  path: "/v2/prices/BTC-EUR/buy",
  body: "",
};

// same for sell price reqs
const reqSell = {
  path: "/v2/prices/BTC-EUR/sell",
  body: "",
};

// same for spot price reqs
const reqSpot = {
  path: "/v2/prices/BTC-EUR/spot",
  body: "",
};

const messageSell = timestamp + reqSell.path + reqSell.body;
const messageBuy = timestamp + reqBuy.path + reqBuy.body;
const messageSpot = timestamp + reqSpot.path + reqSell.body;

// console.log(messageSell);

// create a hexedecimal encoded SHA256 signature of the message for reqBuy
const signatureBuy = crypto
  .createHmac("sha256", apiSecret)
  .update(messageBuy)
  .digest("hex");

// same for reqSell
const signatureSell = crypto
  .createHmac("sha256", apiSecret)
  .update(messageSell)
  .digest("hex");

// same for reqSpot
const signatureSpot = crypto
  .createHmac("sha256", apiSecret)
  .update(messageSpot)
  .digest("hex");

// reqBuy options object
const optionsBuy = {
  url: reqBuy.path,
  baseURL: `https://api.coinbase.com/`,
  headers: {
    "CB-ACCESS-SIGN": signatureBuy,
    "CB-ACCESS-timestamp": timestamp,
    "CB-ACCESS-KEY": apiKey,
  },
};

// reqSell options object
const optionsSell = {
  url: reqSell.path,
  baseURL: `https://api.coinbase.com/`,
  headers: {
    "CB-ACCESS-SIGN": signatureSell,
    "CB-ACCESS-timestamp": timestamp,
    "CB-ACCESS-KEY": apiKey,
  },
};

// reqSpot options object
const optionsSpot = {
  url: reqSpot.path,
  baseURL: `https://api.coinbase.com/`,
  headers: {
    "CB-ACCESS-SIGN": signatureSpot,
    "CB-ACCESS-timestamp": timestamp,
    "CB-ACCESS-KEY": apiKey,
  },
};

module.exports = {
  // refactor for spot price?
  getSpotPrice: async () => {
    try {
      let res = await axios(optionsSpot);
      return res.data.data.amount;
    } catch (err) {
      console.error(err);
    }
  },

  getBuyPrice: async () => {
    try {
      let res = await axios(optionsBuy);
      return res.data.data.amount;
    } catch (err) {
      console.error(err);
    }
  },

  getSellPrice: async () => {
    try {
      let res = await axios(optionsSell);
      return res.data.data.amount;
    } catch (err) {
      console.error(err);
    }
  },
};
