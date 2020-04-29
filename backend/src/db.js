const mongoose = require("mongoose");

let connection;

module.exports = {
    //exporter, så andre filer kan tilgå den
    getConnection: async () => {
        if (!connection) {
            connection = await mongoose.connect("mongodb://localhost/CphEventGear", {
                useNewUrlParser: true,
                useCreateIndex: true,
            });
        }
        return connection;
    },
};
