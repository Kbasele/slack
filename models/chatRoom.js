const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChannelSchema = new Schema({
    messages:{
        type: Array
    },
    participant:{
        type: Array,
        require: true   
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('ChatRoom', ChannelSchema);