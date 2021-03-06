const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');
const config = require('../config/db');

module.exports = function(passport){
    let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
    opts.secretOrKey = config.secret;

    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        User.findOne({id: jwt_payload.sub}, (err, user) => {
            if(err){
                return done(err, false);
            } 
            if(user) {
                const userData = {
                    name: user.name
                }
                return done(null, userData);
            } else {
                return done(null, false);
            }
        })
    }));
}