const express = require('express');
const router = express.Router();

const User = require('../models/user')
const bcrypt = require('bcrypt')
const passport = require('passport')




router
    .route('/')
    .get((req, res)=>{
        if(req.session.page_views){
            req.session.page_views++;
            console.log("You visited this page " + req.session.page_views + " times");
         } else {
            req.session.page_views = 1;
            console.log("Welcome to this page for the first time!");
         }
        res.render('loginPage')
    })
    .post((req, res, next)=>{
        passport.authenticate('local',{
            successRedirect: '/dashboard', 
            failureRedirect: '/login', 
            failureFlash: true
        })(req, res, next)
    })

module.exports = router