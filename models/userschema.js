const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    featuredImage: {
        data: String,
        // contentType: String,
        required: false,
    },
    featuredImagePath: {
        type: String,
        required: false,
    },
    status: {
        type: String,
        enum: ['active', 'inactive']
    },
    priority: {
        type: String,
        enum: ['first', 'medium', 'last']
    },
    date: {
        type: Date,
        default: Date.now(),
    }
})
const User = new mongoose.model("dev", userSchema)
module.exports = User