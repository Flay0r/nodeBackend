const express = require('express');
const router = express.Router();
const Plant = require('../models/plant');
const passport = require('passport');

router.post('/addPlant', (req, res, next) => {
    let newPlant = new Plant({
        name: req.body.name,
        type: req.body.type,
        description: req.body.description,
        picture: req.body.picture,
        status: req.body.status
    });

    Plant.addPlant(newPlant, (err, plant) => {
        if(err){
            res.json({success: false, msg:'failed to register'});
        } else {
            res.json({success: true, msg:'registered Plant'});
        }
    });
});

router.get('/getPlantByName', (req, res, next) => {
    Plant.getPlantByName(req.body.name, (err, plant) => {
        if(err){
            res.json({success: false, msg:'failed get'});
        } else {
            res.json(plant);
        }
    })
})

router.get('/getAll', (req, res, next) => {
    Plant.getAll((err, plants) => {
        if(err){
            res.json({success: false, msg:'failed get'});
        } else {
            res.json(plants);
        }
    })
})

router.post('/changeStatus', (req, res, next) => {
    let update = {
        newStatus: req.body.newStatus,
        plantName: req.body.plantName
    }
    Plant.changePlantStatus(update, (err, plant) => {
        if(err) {
            res.json({success: false, msg:'failed to change status'});
        } else {
            res.json({success: true, msg:'update successful'});
        }
    });
})

router.get('/deletePlant', (req, res, next) => {
    let plantName = req.body.plantName;
    Plant.deletePlant(plantName, (err) => {
        if(err){
            res.json({success: false, msg:'deletion failed'});
        } else {
            res.json({seccuss: true, msg:'deletion successful'});
        }
    })
})

module.exports = router;