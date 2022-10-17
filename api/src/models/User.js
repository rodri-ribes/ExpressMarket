const mongoose = require('mongoose');
const { Schema } = mongoose;


const UserSchema = new Schema({
    username: {
        type: String,
    },
    firstname: {
        type: String,
    },
    lastname: {
        type: String,
    },
    image: {
        type: String,
        default: ``
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
    },
    password: {
        type: String,
        required: true
    },
    cash: {
        type: Number,
        default: 0
    },
    buy: [{
        type: Schema.Types.ObjectId,
        ref: "Product"
    }],
    products: [{
        type: Schema.Types.ObjectId,
        ref: "Product"
    }],
    ban: {
        type: Boolean,
        default: false,
    },
    rol: {
        type: String,
        default: "user",
    },
})

module.exports = mongoose.model('User', UserSchema)