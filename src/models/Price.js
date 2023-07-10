const mongoose = require("mongoose");
const { Schema } = require("mongoose");
// possible fixes for depracation warning below
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

const PriceSchema = new Schema({
  base: {
    type: String,
    enum: ["BTC"],
  },
  currency: {
    type: String,
    enum: ["USD", "EUR", "GBP"],
  },
  buy: {
    type: Number,
  },
  sell: {
    type: Number,
  },
  spot: {
    tytpe: Number,
  },
  time: {
    type: Date,
    default: Date.now,
    index: true,
  },
});

const Price = mongoose.model("Price", PriceSchema);

module.exports = Price;
