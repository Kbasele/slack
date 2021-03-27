const express = require('express')
const router = express.Router()

const Channel = require('../models/channels')
const User = require('../models/user')

router
    .route('/')
    .get((req, res)=>{
        res.redirect('/dashboard')
    })
    .post((req, res)=>{
        const {channelName} = req.body
        const { _id} = req.user
        const newChannel = new Channel({
            channelName: channelName,
            admin: _id,
            pertinence: _id
        });   

        
        newChannel.save()
        
        User.updateOne(
            {_id: _id}, 
            {$push: {
                channels: [newChannel._id]
            }}
        )
      
        .then()
        res.redirect('/dashboard')
    })


    module.exports = router