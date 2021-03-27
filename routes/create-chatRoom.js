const express = require('express')
const router = express.Router()
const ChatRoom = require('../models/chatRoom')
const User = require('../models/user')
const mongoose = require('mongoose')

router
    .get('/:id', (req, res)=>{
        const userID = req.user._id
        const friendID = mongoose.Types.ObjectId(req.params.id)

        ChatRoom.findOne(
            {participant: {$all:[userID, friendID] } }
            )
        .then(room=>{
            res.redirect(`/chat/${room._id}`)
        })
        .catch(async ()=>{
            const newChatRoom = new ChatRoom({
                participant: [userID, mongoose.Types.ObjectId(friendID)]
            })

            await newChatRoom.save()

            res.redirect(`/chat/${newChatRoom._id}`)
        })
    })


module.exports = router