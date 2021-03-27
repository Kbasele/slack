const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChannelSchema = new Schema({
    channelName: {
        type: String,
        required: true,  
    },
    channelPosts:{
        type: Array
    },
    admin:{
        type: Array
    },
    pertinence:{
        type: Array   
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Channel', ChannelSchema);