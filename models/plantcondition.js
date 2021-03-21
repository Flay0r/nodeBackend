const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/db');

const PlantConditionSchema = mongoose.Schema({
    plantType: {
        type: String,
        required: true
    },
    minHumidity: {
        type: String,
        required: true
    },
    maxHumidity: {
        type: String,
        required: true
    },
    minTemperature: {
        type: String,
        required: true
    },
    maxTemperature: {
        type: String,
        required: true
    }
});

const PlantCondition = module.exports = mongoose.model('PlantCondition', PlantConditionSchema);

module.exports.getPlantConditionByName = function(name, callback) {
    const query = {name: name};
    PlantCondition.findOne(query, callback);
}

module.exports.getPlantConditionById = function(id, callback) {
    PlantCondition.findById(id, callback);
}

module.exports.getAll = function(){
    PlantCondition.find(callback);
}

module.exports.addPlantCondition = function(newPlantCondition, callback) {
    newPlantCondition.save(callback);
}

module.exports.deletePlantCondition = function(plantCondition, callback) {
    const query = {plantCondition: plantCondition.name};
    PlantCondition.deleteOne(query, callback);
}