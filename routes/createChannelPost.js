const express = require('express')
const router = express.Router()

const Channel = require('../models/channels')
const User = require('../models/user')

router
    .route('/')
    .get((req, res)=>{
        console.log("hej")

    })