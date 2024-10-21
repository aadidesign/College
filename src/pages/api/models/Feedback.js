const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
    event_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
    student_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    rating: { type: Number, min: 1, max: 5 },
    comments: { type: String },
    created_at: { type: Date, default: Date.now }
  });

const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;