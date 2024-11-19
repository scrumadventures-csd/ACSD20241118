const express = require("express");
const cors = require("cors");
const app = express();
const mCache = require('memory-cache');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/mbc/",require("./routes/api/mbc"));

module.exports = app;