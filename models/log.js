const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/db');

const LogSchema = mongoose.Schema({
    plantTitle: {
        type: String,
        required: true
    },
    loggedBy: {
        type: String,
        required: true
    },
    timestamp: {
        type: String,
        required: true
    },
    temperature: {
        type: String,
        required: true
    },
    humidity: {
        type: String,
        required: true
    }
});

const Log = module.exports = mongoose.model('Log', LogSchema);

module.exports.getLogsByPlantName = function(name, callback) {
    const query = {plantTitle: name};
    Log.find(query, callback);
}

module.exports.getLogById = function(id, callback) {
    Log.findById(id, callback);
}

module.exports.getAll = function(callback){
    Log.find(callback);
}

module.exports.addLog = function(newLog, callback) {
    newLog.save(callback);
}

module.exports.deleteLog = function(Log, callback) {
    const query = {logName: Log.name};
    Log.deleteOne(query, callback);
}