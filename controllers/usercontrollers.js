const userModel = require("../models/user");
const config = require("dotenv").config({ path: ".env" });
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const registUser = async (req, res) => {
  const userName = req.body.userName;
  const email = req.body.email;
  const password = req.body.password;
  const salt = bcrypt.genSaltSync();
  const hashPassword = bcrypt.hashSync(password, salt);
  const newUser = {
    userName: userName,
    email: email,
    password: hashPassword,
  };
  const isExist = await userModel.findOne({ email: email }).exec();
  console.log(isExist);
  if (isExist) {
    res.status(400).send({
      message: "Email is exists",
    });
  } else {
    await userModel.create(newUser);
    res.status(200).send({
      message: "Create user success",
      data: newUser,
    });
  }
};

const login = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const isExist = await userModel.findOne({ email: email }).exec();
  console.log(isExist);
  const correctPassword = bcrypt.compareSync(password, isExist.password);
  if (isExist && correctPassword) {
    const apiKey = `mern-$${isExist._id}$-$${isExist.email}$-$${uuidv4()}$`;
    res.status(200).send({
      message: "Login success",
      apiKey: apiKey,
    });
  } else {
    res.status(400).send({
      message: "Wrong user or password",
    });
  }
};

module.exports = {
  registUser,
  login,
};
