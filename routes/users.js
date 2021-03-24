const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/db');

router.post('/register', passport.authenticate('jwt', { session: false }), (req, res, next) => {
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

router.post('/login', (req, res, next) => {
    User.getUserByName(req.body.name, (err, user) => {
        if(err) throw err;
        if(!user) {
            return res.json({success: false, msg: 'user not found'});
        }

        User.comparePassword(req.body.password, user.password, (err, isMatch) => {
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

router.get('/validate', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    res.json({msg: 'validation successful!', name: req.body.name});
});

router.get('/getAll', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    User.getAll((err, userNames) => {
        if(err){
            res.json({success: false, msg:'failed get'});
        } else {
            newArr = userNames.map(({name}) => name);
            res.json(newArr);
        }
    })
})

module.exports = router;