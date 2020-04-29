//customer model, som definerer, hvad der inde i min bruger - dette skal laves for alle objekter, vi har i databasen.
const mongoose = require("mongoose");
const CustomerSchema = new mongoose.Schema({
    customerName: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const model = mongoose.model("Customer", CustomerSchema);

module.exports = {
    model: model
};
