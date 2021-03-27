const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChatRoomMessage = new Schema({
    chatRoomId: {
        type: String,
        required: true,  
    },
    text:{
        type: String
    },
    username:{
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('ChatRoomMessage', ChatRoomMessage);