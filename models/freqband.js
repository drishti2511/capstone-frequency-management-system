import mongoose, { Schema, models } from "mongoose";

const freqBandSchema = new mongoose.Schema(
    {
        frequency_type: {
            type: String,
            required: true,
        },
        frequency_to: {
            type: String,
            required: true,
        },
        frequency_fm: {
            type: String,
            required: true,
        },
        channel_spacing: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const freqBand = mongoose.models.freqband || mongoose.model('freqband', freqBandSchema);

export default freqBand;