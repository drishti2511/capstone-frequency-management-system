import mongoose, { Schema, models } from "mongoose";

const freqBandSchema = new mongoose.Schema(
    {
        frequency_type: {
            type: String,
            required: true,
        },
        frequency_channel: {
            type: String,
            required: true,
        },
        user_email :{
            type: String,
            required: false,
        },
        user_latitude :{
            type: String,
            required: false, 
        },
        user_longitude :{
            type: String,
            required: false, 
        },
        power : {
            type: String,
            required: true,
        }
    },
    { timestamps: true }
);

const freqBand = mongoose.models.freqband || mongoose.model('freqband', freqBandSchema);

export default freqBand;
