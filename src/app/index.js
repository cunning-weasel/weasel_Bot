const pricing = require("../pricing");
const database = require("../database/db");
const Price = require("../models/Price");
// run mainLoop every x
// https://nodejs.org/api/timers.html#timers_settimeout_callback_delay_args
const util = require("util");

const setTimeoutPromise = util.promisify(setTimeout);

const main = async () => {
  const time = 10 * 1000;

  try {
    const buyPrice = await pricing.getBuyPrice();
    console.log(`-------------------------------------------`);
    console.log(`buy: ${buyPrice}`);

    const sellPrice = await pricing.getSellPrice();
    console.log(`sell: ${sellPrice}`);

    const spotPrice = await pricing.getSpotPrice();
    console.log(`spot: ${spotPrice}`);
    console.log(`-------------------------------------------`);

    const allPrices = await pricing.getAllPrices();
    console.log(`all prices: ${JSON.stringify(allPrices)}`);

    // creating new entry in db
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
