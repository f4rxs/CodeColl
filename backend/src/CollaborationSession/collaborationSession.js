const mongoose = require('mongoose');

const CollaborationSessionSchema = new mongoose.Schema({
  project_id: { type: String, required: true },
  active_users: [{ type: String, ref: 'User' }],
  started_at: { type: Date, default: Date.now },
  ended_at: { type: Date },
}, { timestamps: true });

const CollaborationSession = mongoose.model('CollaborationSession', CollaborationSessionSchema);

module.exports = CollaborationSession;
