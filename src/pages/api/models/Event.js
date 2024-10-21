const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    banner_url: { type: String },
    date: { type: Date, required: true },
    time: { type: Date, required: true },
    venue_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Venue', required: true },
    organizer_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    registration_form: {
      form_url: { type: String },
      is_open: { type: Boolean, default: true }
    },
    attendance: [
      {
        student_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        status: {
          type: String,
          enum: ['registered', 'attended', 'not_attended'],
          default: 'registered'
        },
        proof_upload: { type: String } // URL to uploaded proof
      }
    ],
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
  });

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;