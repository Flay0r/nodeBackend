const express = require('express');
const router = express.Router();
const Log = require('../models/log');
const passport = require('passport');

router.post('/addLog', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    let newLog = new Log({
        plantTitle: req.body.plantTitle,
        loggedBy: req.body.loggedBy,
        timestamp: req.body.timestamp,
        temperature: req.body.temperature,
        humidity: req.body.humidity
    });

    Log.addLog(newLog, (err, newLog) => {
        if(err){
            res.json({success: false, msg:'failed to register'});
        } else {
            res.json({success: true, newLog});
        }
    });
});

router.get('/getLogsByPlantTitle', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    Log.getLogByPlantName(req.body.plantTitle, (err, Log) => {
        if(err){
            res.json({success: false, msg:'failed get'});
        } else {
            res.json(Log);
        }
    })
})

router.get('/getAll', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    Log.getAll((err, Log) => {
        if(err){
            res.json({success: false, msg:'failed get'});
        } else {
            res.json(Log);
        }
    })
})

router.get('/deleteLog', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    let plantName = req.body.plantName;
    Log.deleteLog(Log, (err) => {
        if(err){
            res.json({success: false, msg:'deletion failed'});
        } else {
            res.json({seccuss: true, msg:'deletion successful'});
        }
    })
})

module.exports = router;