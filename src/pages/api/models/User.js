const mongoose = require('mongoose');

// User Schema
const userSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    match: /.+@pccoepune\.org$/, 
  },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ['clublead', 'admin', 'department', 'faculty', 'hod'],
    required: true
  },
  department_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' },
  points: { type: Number, default: 0 }
});

const User = mongoose.models.User || mongoose.model('User', userSchema);
module.exports = User;