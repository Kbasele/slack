const express = require('express');
const router = express.Router();

const User = require('../models/user')
const bcrypt = require('bcrypt')
const passport = require('passport')


router
    .route('/')
    .get((req, res)=>{
        console.log("Hej")
        req.logout()
        req.flash('success_msg', 'You have logged out')
        res.redirect('/login')
    })


module.exports = router