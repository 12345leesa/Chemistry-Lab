// user.js (Model for User schema)

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// User Schema
const UserSchema = new mongoose.Schema({
  username: { 
    type: String, 
    required: true, 
    unique: true 
  },
  indexNo: { 
    type: String, 
    required: true 
  },
  password: { 
    type: String, 
    required: true 
  },
  userRole: { 
    type: String, 
    enum: ['student', 'teacher'], 
    required: true 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
