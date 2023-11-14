import mongoose, { Schema, models } from "mongoose";

const userLocationSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    latitude: {
      type: String,
      required: true,
    },
    longitude: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const UserLocation = models.UserLocation || mongoose.model("UserLocation", userLocationSchema);
export default UserLocation;