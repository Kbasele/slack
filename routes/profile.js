const express = require('express')
const router = express.Router()
const Channel = require('../models/channels')
const multer = require('multer')
const uploadPath = './public/uploads/'
const path = require('path')
const User = require('../models/user')

const storage = multer.diskStorage({
    destination: (req, file, callback) =>{
        callback(null, uploadPath) 
        
      },
    filename: (req, file, callback) => {
        callback(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    limits: {
        files: 1,
        fieldSize: 5 * 1024 * 1024
    },
    storage: storage,
    fileFilter: (req, file, callback) => {
        if (!file.originalname.match(/\.(jpg|webp|png|gif)$/)) {
            callback(new Error('Only images allowed.'), false)
        }
        callback(null, true)
    }
})

router
.route('/')
.get((req, res)=>{
    const user = req.user

    Channel.find({_id: user.channels})
        .populate("users")
        .then(channels => {
            res.render( 'profile', {user: req.user, channels })
            });

})
.post(upload.single('picture'), (req, res) => {

    const user = req.user
    const image = false

    Channel.find({_id: user.channels})
        .populate("users")
        .then(channels => {
            try {
                const profile_pic = uploadPath + req.file.filename
        
                if (profile_pic) {
                    const query = { _id: req.user._id }
                    const update = { $set: { profilePic: profile_pic }}
                    const options = { returnNewDocument: true }

                    User.findOneAndUpdate(query, update, options)
                        .then((updatedUser)=> {
                            console.log('updatedUser', updatedUser)
                            res.redirect('/profile')
                        })
                } else {
                    res.end('<h1>File not uploaded</h1>')
                }
            } catch (error) {
                console.log(error)
            }
        });
       
})

module.exports = router