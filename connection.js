const mongoose = require("mongoose");

async function dbconnection(url) {
    return mongoose.connect(url);

}

module.exports = { dbconnection };