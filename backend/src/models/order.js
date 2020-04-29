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

module.exports = {
    model: model,
};
