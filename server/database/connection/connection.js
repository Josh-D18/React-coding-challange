let uri = process.env.DB_URI;
const mongoose = require("mongoose");
let mongodb = mongoose.connect(uri);

module.exports = mongodb;
