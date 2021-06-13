const mongoose = require("mongoose");
require("dotenv").config();

// connect to db
const mongoURI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_URL}`;

module.exports = {
  connect: () => {
    mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const db = mongoose.connection;

    db.on("error", console.error.bind(console, "DB connection error:"));
    db.once("open", function () {
      console.log(`🦾 weasel_Bot's connected to DB 🤖`);
    });
  },
};
