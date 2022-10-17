const mongoose = require('mongoose');
const { Schema } = mongoose;


const CommentSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    reply: {
        content: {
            type: String
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    }
})

module.exports = mongoose.model('Comment', CommentSchema)