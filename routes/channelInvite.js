const express = require('express')
const router = express.Router()

const Channel = require('../models/channels')
const User = require('../models/user')

router
    .route('/')
    .get((req, res)=>{
        console.log("hej")
    })
    
    .post((req, res)=>{
        const {inviteInput, channelID} = req.body
        const user = req.user
        
        User.findOne({email: inviteInput})
        .then(userrr => console.log(userrr))

        Channel.findOne({_id: channelID})
        .then(channel1 =>{
            User.updateOne(
                {email: inviteInput}, 
                {$push: {
                    channels: [channel1._id]
                }}
            ).then()
            console.log("hej")
        })
        res.redirect( `/channel/${channelID}`)


    })

module.exports = router