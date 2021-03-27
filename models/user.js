const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,  
    },
    email: {
        type: String,
        required: true,  
    },
    password: {
        type: String,
        required: true
      },
    is_online: {
      type: Boolean,
      default: false
    },
    date: {
      type: Date,
      default: Date.now
    },
    channels: {
      type: Array
    },
    channelPosts: {
      type: Array
    },
    profilePic:{
      type: String
    },
    notes:{
      type: String
    }
})

module.exports = mongoose.model('User', UserSchema);