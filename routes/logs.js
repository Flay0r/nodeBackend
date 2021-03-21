const express = require('express');
const router = express.Router();
const Log = require('../models/log');
const passport = require('passport');

router.post('/addLog', (req, res, next) => {
    let newLog = new Log({
        plantName: req.body.plantName,
        loggedBy: req.body.loggedBy,
        timestamp: req.body.timestamp,
        temperature: req.body.temprature,
        humidity: req.body.humidity
    });

    Log.addLog(newLog, (err, newLog) => {
        if(err){
            res.json({success: false, msg:'failed to register'});
        } else {
            res.json({success: true, msg:'registered Log'});
        }
    });
});

router.get('/getLogByPlantName', (req, res, next) => {
    Log.getLogByPlantName(req.body.name, (err, Log) => {
        if(err){
            res.json({success: false, msg:'failed get'});
        } else {
            res.json(Log);
        }
    })
})

router.get('/getAll', (req, res, next) => {
    Log.getAll((err, Log) => {
        if(err){
            res.json({success: false, msg:'failed get'});
        } else {
            res.json(Log);
        }
    })
})

router.get('/deleteLog', (req, res, next) => {
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