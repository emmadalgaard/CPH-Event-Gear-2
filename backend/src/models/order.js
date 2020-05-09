// order model definerer, hvilke felter af data vores ordrer består af
const mongoose = require("mongoose");
const OrderSchema = new mongoose.Schema({
    phone: {
        type: String,
        required: true,
    },
    amount1: {
        type: Number,
    },
    amount2: {
        type: Number,
    },
    amount3: {
        type: Number,
    },
    orderDay: {
        type: Number,
        required: true,
    },
    orderMonth: {
        type: Number,
        required: true,
    },
    orderYear: {
        type: Number,
        required: true,
    },
    orderPrice: {
        type: Number,
        required: true,
    },
});

const model = mongoose.model("Order", OrderSchema);
// "The first argument is the singular name of the collection your model is for. Mongoose automatically looks for the plural, lowercased version of your model name"
// https://mongoosejs.com/docs/models.html

module.exports = {
    model: model,
};
