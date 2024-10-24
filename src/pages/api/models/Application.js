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
    // Event-related request (optional)
    event_id: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }],
    
    // Inventory-related request (optional)
    inventory_id: [{
        type: String
    }],
    
    // Venue-related request (optional)
    venue_id: { 
        type: String
     },
    
    approvalToken: { type: String },  // Unique token for approval link
    tokenExpiry: { type: Date },  // Optional: Add expiry to approvalToken
    
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    },
    
    approval_chain: {
        admin: {
            is_approved: { type: Boolean, default: false },
            approved_at: { type: Date },
            approver: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }  // Track the admin approver
        },
        HOD: {
            is_approved: { type: Boolean, default: false },
            approved_at: { type: Date },
            approver: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }  // Track the HOD approver
        },
        department: {
            is_approved: { type: Boolean, default: false },
            approved_at: { type: Date },
            approver: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }  // Track the department approver
        }
    },
    
    additional_details: { type: String },  // Extra details for the request
    
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

// Middleware to automatically update the updated_at field before saving
applicationSchema.pre('save', function(next) {
    this.updated_at = Date.now();
    next();
});

// Optional: Middleware to enforce approval sequence
applicationSchema.pre('save', function(next) {
    if (this.approval_chain.HOD.is_approved && !this.approval_chain.admin.is_approved) {
        return next(new Error('Admin must approve before HOD'));
    }
    if (this.approval_chain.department.is_approved && !this.approval_chain.HOD.is_approved) {
        return next(new Error('HOD must approve before Department'));
    }
    next();
});

const Application = mongoose.models.Application || mongoose.model('Application', applicationSchema);

module.exports = Application;
