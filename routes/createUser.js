const express = require('express')
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');


router
    .route('/')
    .get((req, res)=>{
        res.render('createUser')
    })
    .post ((req, res)=>{
        const userInfo = req.body
        const {name, password, email} = req.body
        const errors = []
        
        if (!name || !email || !password) {
            errors.push({ msg: 'Please fill in all fields' });
        }
        
        if (password.length < 6) {
            errors.push({ msg: 'password must be longer then 6 characters' });
        }
        
        else{
            //Skapar ny user
            const newUser = new User({
                name: name, 
                email: email,
                password: password
            });
            
            //krypterar user password
            bcrypt.genSalt(10, (err, salt) => {
                return bcrypt.hash(newUser.password, salt,
                    (err, hash) => {
                        if (err) throw err; 
                       
                        newUser.password = hash; 
                        
                        newUser
                        .save()
                        .then((value) =>{
                            req.flash('success_msg', 'You have now registered');
                            res.redirect('/login');
                            console.log("USER SKAPAD")
                        })
                        .catch(value => console.log(value));
                    }
                    );
                });
                
            }
            
     })
    

module.exports = router