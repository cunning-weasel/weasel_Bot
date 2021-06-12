const pricing = require("../pricing");

module.exports = {
  start: async () => {
    const buyPrice = await pricing.getBuyPrice();
    console.log(`buy: ${buyPrice}`)
    const sellPrice = await pricing.getSellPrice();
    console.log(`sell: ${sellPrice}`)
  },
};

