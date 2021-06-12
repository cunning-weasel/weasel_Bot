const pricing = require("../pricing");
const database = require("../database");
// for running the mainLoop every whatever
// https://nodejs.org/api/timers.html#timers_settimeout_callback_delay_args
const util = require("util");
const setTimeoutPromise = util.promisify(setTimeout);

const mainLoop = async () => {
  const buyPrice = await pricing.getBuyPrice();
  console.log(`-------------------------------------------`);
  console.log(`buy: ${buyPrice}`);

  const sellPrice = await pricing.getSellPrice();
  console.log(`sell: ${sellPrice}`);

  const spotPrice = (getAllPrice = await pricing.getSpotPrice());
  console.log(`spot: ${spotPrice}`);
  console.log(`-------------------------------------------`);

  const time = 10 * 1000;
  await setTimeoutPromise(time);
  mainLoop();
};

module.exports = {
  start: async () => {
    await database.connect();
    mainLoop();
  },
};

