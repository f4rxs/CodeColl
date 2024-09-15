const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema({
  session_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CollaborationSession',
    required: true
  },
  user_id: {
    type: String,  
    required: true
  },
  message: {
    type: String,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

const Chat = mongoose.model('Chat', ChatSchema);
module.exports = Chat;
