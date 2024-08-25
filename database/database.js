const mongoose = require("mongoose");
const config = require("dotenv").config({ path: ".env" });
const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connect DB successfull");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDb;