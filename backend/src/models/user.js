const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
    phoneNumber: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
   userType: {
        type: String, enum: ["admin", "customer"],
       //lettere at arbejde med som string
       //enum handler om at afgrænse - strengen kan kun være admin eller customer
        required: true
    },
    // referer Customer til userType - laver en foreign key
    customer: {
        type: Schema.Types.ObjectId, ref: "Customer"
    }
});

const model = mongoose.model("User", UserSchema);

module.exports = {
    model: model
};