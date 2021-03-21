const express = require('express');
const router = express.Router();
const PlantCondition = require('../models/plantcondition');
const passport = require('passport');

router.post('/addPlantCondition', (req, res, next) => {
    let newPlantCondition = new PlantCondition({
        plantType: req.body.plantType,
        minHumidity: req.body.minHumidity,
        maxHumidity: req.body.maxHumidity,
        minTemperature: req.body.minTemperature,
        maxTemperature: req.body.maxTemperature
    });

    PlantCondition.addPlantCondition(newPlantCondition, (err, plantCondition) => {
        if(err){
            res.json({success: false, msg:'failed to register'});
        } else {
            res.json({success: true, msg:'registered PlantCondition'});
        }
    });
});

router.get('/getPlantConditionByName', (req, res, next) => {
    PlantCondition.getPlantConditionByName(req.body.name, (err, plantCondition) => {
        if(err){
            res.json({success: false, msg:'failed get'});
        } else {
            res.json(plantCondition);
        }
    })
})

router.get('/getAll', (req, res, next) => {
    PlantCondition.getAll((err, plantconditions) => {
        if(err){
            res.json({success: false, msg:'failed get'});
        } else {
            res.json(plantconditions);
        }
    })
})

router.get('/deletePlantCondition', (req, res, next) => {
    let plantName = req.body.plantName;
    PlantCondition.deletePlant(plantName, (err) => {
        if(err){
            res.json({success: false, msg:'deletion failed'});
        } else {
            res.json({seccuss: true, msg:'deletion successful'});
        }
    })
})

module.exports = router;