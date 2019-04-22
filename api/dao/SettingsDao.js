"use strict";

var SettingsModel = require('../models/SettingsModel');

// Get Settings
/**
 * 
 * @param {Function} callback 
 */
function getSettings(callback) {
    SettingsModel.find((err, settings) => {
        callback(err, settings)
    });
}

/**
 * 
 * @param {Function} callback 
 */
function getActiveSettings(callback) {
    AccountsModel.find({"status":'A'}, (err, settings) => {
        callback(err, settings)
    });
}

/**
 * 
 * @param {Function} callback 
 */
function getInActiveSettings(callback) {
    AccountsModel.find({"status":'I'}, (err, settings) => {
        callback(err, settings)
    });
}

module.exports = {
    getSettings,
    getActiveSettings,
    getInActiveSettings
}