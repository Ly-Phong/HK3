const express = require("express");
const connectDb = require("./database/database");
const router = require('./router');

const app = express();
connectDb();
app.use(express.json());
app.use(router);


app.listen("8080", () => {
    console.log("server is running!");
})