const mongoose = require("mongoose");
const config = require("./credentials");
const connection = async () => {
    const conn = await mongoose.connect(
        `mongodb+srv://${config.db_username}:${config.db_password}@${config.db_host}/${config.db_name}`
    );
    console.log("Mongo DB connected", conn.connection.host);
};

module.exports = { connection, mongoose };
