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
    },
    /* argumenter for dette i rapporten, det ville have været smartere at implementere en userType som user.js, men fordi vi har gjort det
    i en anden rækkefølge ved først at implementere customer og lave funktionaliteter for denne, er det her en nemmere løsning */
    userType: {
        type: String, enum: ["admin", "customer"],
        required: true
    }
});

const model = mongoose.model("Customer", CustomerSchema);

module.exports = {
    model: model
};
