const mongoose = require('mongoose');

const { Schema } = mongoose

const userProfileSchema = new Schema({
    name: {
        required: true,
        type: String,
        maxlength: 200,
    },
    foh: {
        maxlength: 100,
        type: String,
        default: null
    },
    dob: {
        type: Date,
        default: null
    },
    gender: {
        maxlength: 10,
        type: String,
        default: null
    },
    primary_occupation: {
        maxlength: 50,
        type: String,
        default: null
    },
    current_address: {
        type: String,
        maxlength: 500,
        default: null
    },
    mobile_number: {
        type: String,
        maxlength: 15
    },
    uan: {
        type: String,
        maxlength: 15
    },
    profilePicPath: {
        type: String,
        default: null
    },
    created_at: {
        type: Date,
        default: Date.now
    }
})

const Profile = mongoose.model('profile', userProfileSchema);

module.exports = Profile