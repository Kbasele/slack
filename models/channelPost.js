const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChannelPostSchema = new Schema({
    channelId: {
        type: String,
        required: true,  
    },
    text:{
        type: String
    },
    author:{
        type: String
    },
    authorId:{
        type:String
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('ChannelPost', ChannelPostSchema);