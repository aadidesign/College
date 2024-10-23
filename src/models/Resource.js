// src/models/Resource.js
import mongoose from 'mongoose';

const ResourceSchema = new mongoose.Schema({
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    available: { type: Number, required: true }, // Available quantity
});

export default mongoose.models.Resource || mongoose.model('Resource', ResourceSchema);
