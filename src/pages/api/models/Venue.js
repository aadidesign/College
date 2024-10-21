const mongoose = require('mongoose');

const venueSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: {
      type: String,
      enum: ['hall', 'classroom', 'lab'],
      required: true
    },
    capacity: { type: Number, required: true },
    location: { type: String },
    bookings: [
      {
        event_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' },
        start_time: { type: Date, required: true },
        end_time: { type: Date, required: true }
      }
    ]
  });

const Venue = mongoose.model('Venue', venueSchema);

module.exports = Venue;