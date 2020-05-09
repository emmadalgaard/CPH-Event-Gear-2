//produktmodel definerer, hvad produkterne indeholder
const mongoose = require("mongoose");
const EventPackageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    // packagerType er lavet som en enum, hvilket handler om at afgrænse mulighederne - strengen kan kun være pakke1, pakke2 eller pakke3
    packageType: {
        type: String, enum: ["pakke1", "pakke2", "pakke3"],
        required: true
    }
});

const model = mongoose.model("EventPackage", EventPackageSchema);

module.exports = {
    model: model
};
