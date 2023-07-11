const pricing = require("../pricing");
const database = require("../database/db");
const Price = require("../models/Price");
const util = require("util");

const setTimeoutPromise = util.promisify(setTimeout);

const main = async () => {
  const time = 10 * 1000;

  try {
    const buyPrice = await pricing.getBuyPrice();
    const buyEthPrice = await pricing.getEthBuyPrice();
    console.log(`-------------------------------------------`);
    console.log(`buy BTC: ${buyPrice}`);
    console.log(`buy ETH: ${buyEthPrice}`);

    const sellPrice = await pricing.getSellPrice();
    const sellEthPrice = await pricing.getEthSellPrice();
    console.log(`sell BTC: ${sellPrice}`);
    console.log(`sell ETH: ${sellEthPrice}`);

    const spotPrice = await pricing.getSpotPrice();
    const spotEthPrice = await pricing.getEthSpotPrice();

    console.log(`spot BTC: ${spotPrice}`);
    console.log(`spot ETH: ${spotEthPrice}`);
    console.log(`-------------------------------------------`);

    const allPrices = await pricing.getAllPrices();
    console.log(`all prices: ${JSON.stringify(allPrices)}`);

    // create new entry in db
    const price = await Price.create({});
  } catch (err) {
    console.error(err);
  }
  await setTimeoutPromise(time);
  main();
};

module.exports = {
  start: async () => {
    await database.connect();
    main();
  },
};
