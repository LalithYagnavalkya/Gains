import mongoose, { Document, Model } from "mongoose";

interface IUser extends Document {
  username: string;
  email: string;
  isActive: boolean;
  refreshToken: string;
  profilePic: string;
  mobile: string;
  googleId: string,
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true },
    refreshToken: { type: String },
    profilePic: { type: String },
    isActive: { type: Boolean, default: true },
    mobile: { type: String },
    googleId: {type : String}
  },
  { timestamps: true }
);

const User: Model<IUser> = mongoose.model<IUser>("user", userSchema);

export default User;
