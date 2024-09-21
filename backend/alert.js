const mongoose = require('mongoose');

// Define the alert schema
const alertSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true,
    },
    alert_type: {
        type: String,
        required: true,
        enum: ['LowCharge', 'Offline', 'DeepDischarge', 'InsuranceReminder'],
    },
    vehicle_id: {
        type: String,
        required: true,
        trim: true,
    },
    message: {
        type: String,
        required: true,
    },
    value: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: ['resolved', 'unresolved'],
    },
    created_at: {
        type: Date,
        default: Date.now,
        required: true,
    },
    updated_at: {
        type: Date,
        default: Date.now,
        required: true,
    },
    isCritical: {
        type: Boolean,
        required: true,
    },
});

// Create a model based on the schema
const Alert = mongoose.model('Alerts', alertSchema);

module.exports = Alert;