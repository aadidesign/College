// src/models/Event.js
import mongoose from 'mongoose';

const EventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    clubLead: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    faculty: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    department: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    admin: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    hod: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    resources: [{ type: String }], // Requested resources
    status: {
        type: String,
        enum: ['pending', 'approved_by_faculty', 'approved_by_department', 'approved_by_admin', 'approved_by_hod', 'rejected'],
        default: 'pending',
    },
    rejectionReason: { type: String },
}, { timestamps: true });

export default mongoose.models.Event || mongoose.model('Event', EventSchema);
