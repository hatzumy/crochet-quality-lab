import mongoose from 'mongoose';

const tokenSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    ref: 'User', 
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 86400 
  }
});

export default mongoose.model('Token', tokenSchema);