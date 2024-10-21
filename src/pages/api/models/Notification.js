const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    message: { type: String, required: true },
    type: {
      type: String,
      enum: ['info', 'warning', 'success'],
      required: true
    },
    is_read: { type: Boolean, default: false },
    created_at: { type: Date, default: Date.now }
  });

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;