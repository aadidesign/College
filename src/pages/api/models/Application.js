const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    date: { type: Date, required: true },
    applicant: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    application_type: {
        type: String,
        enum: ['venue_booking', 'event_permission', 'inventory_request'],
        required: true
    },
    // event_id: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }], // Event-related request (optional)
    inventory_id: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Inventory' }], // Inventory-related request (optional)
    venue_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Venue' }, // Venue-related request (optional)
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    },
    approval_chain: {
        admin: {
            is_approved: { type: Boolean, default: false },
            approved_at: { type: Date }
        },
        HOD: {
            is_approved: { type: Boolean, default: false },
            approved_at: { type: Date }
        },
        department: {
            is_approved: { type: Boolean, default: false },
            approved_at: { type: Date }
        }
    },
    additional_details: { type: String }, // Extra details for the request
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

const Application = mongoose.model('Application', applicationSchema);

module.exports = Application;