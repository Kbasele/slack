const express = require('express')
const router = express.Router()
const Channel = require('../models/channels')
const ChatRoom = require('../models/chatRoom')
const ChatRoomMessage = require('../models/chatRoomMessage')
const ChannelPost = require('../models/channelPost')
const User = require('../models/user')


router
    .route('/:id')
    .get((req, res)=>{
        const user = req.user
        const chatRoomId = req.params.id

        Channel.find({_id: user.channels})
        .populate("users")
        .then(channels => {
                ChatRoomMessage.find({chatRoomId: chatRoomId})
                    .then(messages =>{
                        User.find({is_online: true})
                        .then((onLineUser)=>{           
                            res.render( 'chatRoom', {user: req.user, channels, channelId: chatRoomId, messages, onLineUser})
                        })
                    })
            });
    })

module.exports = router