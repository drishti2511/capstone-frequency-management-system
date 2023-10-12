import mongoose, { Schema, models } from "mongoose";

const userProfileSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        contactNumber: {
            type: String,
            required: true,
        },
        designation: {
            type: String,
            required: true,
        },
        radioDetails: {
            type: String,
            required: true,
        },
        radioSetDetails: {
            type: String,
            required: true,
        },
        location: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const UserProfile = models.UserProfile || mongoose.model("UserProfile", userProfileSchema);

export default UserProfile;