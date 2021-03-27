const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notes = new Schema({
    userId: {
        type: String,
        required: true,  
    },
    text:{
        type: String,
        required: true,  

    },
})

module.exports = mongoose.model('notes', notes);