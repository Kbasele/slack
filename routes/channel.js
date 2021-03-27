const express = require('express')
const router = express.Router()
const Channel = require('../models/channels')
const ChannelPost = require('../models/channelPost')
const User = require('../models/user')
const http = require('http')




router
    .route('/:id')
    .get((req, res)=>{
        const user = req.user
        const channelId = req.params.id
        Channel.find({_id: user.channels})
        .populate("users")
        .then(channels => {
            ChannelPost.find({channelId: channelId})
            .populate("channelPosts")
            .then(posts =>{
                res.render( 'channel', {user: req.user, channels, channelId, posts})
            })
        }) 
        ;
    })
    
    .post((req, res)=>{
        const {userInput, channelID} = req.body
        const user = req.user

        const newChannelPost = new ChannelPost({
            text: userInput, 
            author: user.name,
            authorId: user._id,
            channelId: channelID
        })

        newChannelPost.save()
        .then()

        Channel.updateOne(
            {_id: channelID}, 
            {$push: {
                channelPosts: [newChannelPost._id]
            }}
        )
        .then(() => {
            User.updateOne(
                {_id: user._id}, 
                {$push: {
                    channelPosts: [newChannelPost._id]
                }}
                ).then(user=>{})
            res.redirect( `/channel/${channelID}`)
         });
    })
    
module.exports = router