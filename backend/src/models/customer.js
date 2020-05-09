// customer model definerer, hvilke felter af data vores brugere består af
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
    // userType er lavet som en enum, hvilket handler om at afgrænse mulighederne - strengen kan kun være admin eller customer
    userType: {
        type: String, enum: ["admin", "customer"],
        required: true
    }
});

const model = mongoose.model("Customer", CustomerSchema);

module.exports = {
    model: model
};
