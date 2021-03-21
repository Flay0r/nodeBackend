const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/db');

router.post('/register', (req, res, next) => {
    let newUser = new User({
        name: req.body.name,
        password: req.body.password
    });

    User.addUser(newUser, (err, user) => {
        if(err){
            res.json({success: false, msg:'failed to register'});
        } else {
            res.json({success: true, msg:'registered User'});
        }
    });
});

router.post('/authenticate', (req, res, next) => {
    const name = req.body.name;
    const password = req.body.password;

    User.getUserByName(name, (err, user) => {
        if(err) throw err;
        if(!user) {
            return res.json({success: false, msg: 'user not found'});
        }

        User.comparePassword(password, user.password, (err, isMatch) => {
            if(err) throw err;
            if(isMatch){
                const token = jwt.sign(user.toJSON(), config.secret, {
                    expiresIn: 604800
                });
            
                res.json({
                    success: true,
                    token: 'JWT ' + token,
                    user: {
                        name: user.name
                    }
                })
            } else {
                return res.json({success: false, msg: 'wrong password'});
            }
        })
    })
});

router.get('/profile', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    res.json({user: req.user});
});

router.get('/validate', (req, res, next) => {
    res.send('validate menu')
});

module.exports = router;