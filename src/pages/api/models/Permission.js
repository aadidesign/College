const mongoose = require('mongoose');

const permissionRequestSchema = new mongoose.Schema({
    requester_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    event_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending'
    },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
  });

const PermissionRequest = mongoose.model('PermissionRequest', permissionRequestSchema);

module.exports = PermissionRequest;