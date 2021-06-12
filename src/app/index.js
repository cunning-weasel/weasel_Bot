const pricing = require("../pricing");

module.exports = {
  start: async () => {
    const price = await pricing.getBuyPrice();
  },
};

