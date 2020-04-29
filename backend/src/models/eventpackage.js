//produktmodel, som definerer, hvad produkterne indeholder - dette skal laves for alle objekter, vi har i databasen.
const mongoose = require("mongoose");
const EventPackageSchema = new mongoose.Schema({
    name: { //Package 1, 2, 3
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    /*stock: {
        type: Boolean,
        required: true
    }*/
});

const model = mongoose.model("EventPackage", EventPackageSchema);

module.exports = {
    model: model
};
