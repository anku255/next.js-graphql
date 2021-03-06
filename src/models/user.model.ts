import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcryptjs';


const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

userSchema.methods.comparePassword = function (password: string): boolean {
  // @ts-expect-error
  return bcrypt.compareSync(password, this.password)
}

export default mongoose.models.User || mongoose.model('User', userSchema);