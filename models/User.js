import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
  username: String,
  email: String,
  password: String,
  createdAt: String,
});

const User = mongoose.models.User
  ? mongoose.models.User
  : mongoose.model('User', userSchema);

console.log(mongoose.models.User);

export default User;
