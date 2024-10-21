const mongoose = require('mongoose');

const permissionRequestSchema = new mongoose.Schema({
    requester_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    event_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending'
    },
    stages: {
      type: String,
      enum: ['not requested', 'under the faculty', 'under the admin', 'under the department', 'checking inventories & resources', 'approved'],
    },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
  });

const PermissionRequest = mongoose.model('PermissionRequest', permissionRequestSchema);

module.exports = PermissionRequest;