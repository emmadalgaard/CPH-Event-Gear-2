const mongoose = require("mongoose");

let connection;

module.exports = {
    //exporter, så andre filer kan tilgå den
    getConnection: async () => {
        if (!connection) {
            connection = await mongoose.connect("mongodb+srv://cpheventgear:cpheventgear123@cluster0-no0xc.mongodb.net/cpheventgear", {
                useNewUrlParser: true,
                useCreateIndex: true,
            });
        }
        return connection;
    },
};
