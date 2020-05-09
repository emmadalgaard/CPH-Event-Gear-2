// i denne fil connectes til databasen, og dette eksporteres så andre filer kan tilgå det
const mongoose = require("mongoose");

let connection;

module.exports = {
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
