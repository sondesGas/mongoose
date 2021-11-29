const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");

const connectDB = async () => {
  try {
    await mongoose.connect(db);
    console.log("you are connected to DB");
  } catch (err) {
    console.error("could not connect to DB", err.message);
  }
};
module.exports = connectDB;
