const mongoose = require("mongoose");
const colors = require("colors");
const connectDb = async () => {
  try {
    console.log(process.env.MONGO_URL);
    await mongoose.connect(process.env.MONGO_URL);
    console.log(`Server Running On ${mongoose.connection.host}`.bgCyan.white);
  } catch (error) {
    console.log(`hey+${error}`.bgRed);
  }
};

module.exports = connectDb;
