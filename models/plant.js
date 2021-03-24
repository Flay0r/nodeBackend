const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/db');

const PlantSchema = mongoose.Schema({
    plantTitle: {
        type: String,
        required: true,
        unique: true
    },
    plantType: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    picture: {
        type: String
    },
    status: {
        type: String,
        required: true
    }
});

const Plant = module.exports = mongoose.model('Plant', PlantSchema);

module.exports.getPlantByName = function(plantTitle, callback) {
    const query = {plantTitle: plantTitle};
    Plant.findOne(query, callback);
}

module.exports.getPlantById = function(id, callback) {
    Plant.findById(id, callback);
}

module.exports.getAll = function(){
    Plant.find(callback);
}

module.exports.addPlant = function(newPlant, callback) {
    newPlant.save(callback);
}

module.exports.deletePlant = function(plant, callback) {
    const query = {plant: plant.name};
    Plant.deleteOne(query, callback);
}

module.exports.changePlantStatus = function(update, callback) {
    Plant.updateOne({plantTitle: update.plantTitle}, {$set: {status: update.status}}, callback);
}