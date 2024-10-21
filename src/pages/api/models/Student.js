const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { 
        type: String, 
        required: true, 
        unique: true, 
        match: [/^[a-zA-Z0-9._%+-]+@pccoepune\.org$/, 'Please enter a valid PCCOE email address'] 
    },
    department: { type: String, required: true }, 
    year: { type: Number, required: true }, 
    roll_no: { type: String, required: true, unique: true }, 

    event_participation: [
        {
            event_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' }, // Reference to Event schema
            status: { type: String, enum: ['registered', 'attended', 'not_attended'], default: 'registered' },
            feedback: { type: String }, // Feedback for the event
            rating: { type: Number, min: 1, max: 5 }, // Event rating out of 5
            certificate_url: { type: String } // URL to certificate if awarded
        }
    ],

    attendance: {
        total_events: { type: Number, default: 0 }, 
        events_attended: { type: Number, default: 0 }, 
        attendance_percentage: { type: Number, default: 0 } 
    },

    points: {
        total_points: { type: Number, default: 0 }, 
        events_contributed: { type: Number, default: 0 }, 
    },

    certificates: [
        {
            event_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' }, 
            certificate_url: { type: String }, 
            issue_date: { type: Date, default: Date.now }
        }
    ],

    analytics: {
        average_rating: { type: Number, default: 0 }, 
        total_feedbacks_given: { type: Number, default: 0 },
        top_rated_events: [
            {
                event_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' },
                rating: { type: Number }
            }
        ] 
    },

    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

// Middleware to calculate attendance percentage before saving the student
studentSchema.pre('save', function(next) {
    if (this.attendance.total_events > 0) {
        this.attendance.attendance_percentage = (this.attendance.events_attended / this.attendance.total_events) * 100;
    }
    next();
});

// Middleware to update analytics (e.g., average rating) after each feedback is given
studentSchema.methods.updateAnalytics = async function() {
    const totalFeedbacks = this.event_participation.filter(participation => participation.rating).length;
    const totalRatingSum = this.event_participation.reduce((acc, participation) => acc + (participation.rating || 0), 0);

    this.analytics.average_rating = totalFeedbacks > 0 ? (totalRatingSum / totalFeedbacks) : 0;
    this.analytics.total_feedbacks_given = totalFeedbacks;
    this.analytics.top_rated_events = this.event_participation
        .filter(participation => participation.rating >= 4)
        .map(participation => ({
            event_id: participation.event_id,
            rating: participation.rating
        }));

    await this.save();
};

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
