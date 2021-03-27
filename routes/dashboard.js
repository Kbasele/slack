const express = require('express')
const router = express.Router()
const {ensureAuthenticated} = require('../config/auth')
const Channel = require('../models/channels')
const User = require('../models/user')
const Notes = require('../models/notes')

router
    .route('/')
    .get(ensureAuthenticated, (req, res)=>{

        const user = req.user
        Channel.find({_id: user.channels})
        .populate("users")
        .then(channels => {
            User.find({is_online: true})
            .then((onLineUser)=>{
                Notes.find(()=>{
                }).then((allNotes)=>{
                    console.log(allNotes)
                    res.render( 'dashboard', {user: req.user, channels,onLineUser, allNotes })
                })

            })
         });
        
        
    })

module.exports = router
    