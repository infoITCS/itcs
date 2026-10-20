import mongoose from 'mongoose'

mongoose.set('bufferTimeoutMS', 120000)

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: false },
  role: { type: String, default: 'user' },      
  isAdmin: { type: Boolean, default: false }, 
  resetPasswordToken: { type: String, required: false },
  resetPasswordExpires: { type: Date, required: false },
})

export default mongoose.model('User', userSchema)
