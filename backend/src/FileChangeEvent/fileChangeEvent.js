const mongoose = require('mongoose');

const FileChangeEventSchema = new mongoose.Schema({
  session_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CollaborationSession',
    required: true
  },
  file_id: {
    type: String,  
    required: true
  },
  user_id: {
    type: String, 
    required: true
  },
  change_type: {
    type: String,
    enum: ['insert', 'delete', 'update'],
    required: true
  },
  content: {
    type: String,  
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

const FileChangeEvent = mongoose.model('FileChangeEvent', FileChangeEventSchema);
module.exports = FileChangeEvent;