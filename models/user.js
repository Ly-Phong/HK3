const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  userName: {
    type: String,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
});

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
