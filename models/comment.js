const mongoose = require('mongoose')

const { Schema, model } = mongoose

const commentSchema = new Schema({
    note: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
})


const Comment = model('Comment', commentSchema)

module.exports = Comment