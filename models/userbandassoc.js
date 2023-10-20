import mongoose from 'mongoose';

const userBandSchema = new mongoose.Schema({
    userId: {
        type: String,
        // ref: 'User',
        required: true,
    },
    bandId: {
        type: String,
        // type: text,
        // ref: 'freqBand',
        required: true,
    },
});

const UserBand= mongoose.models.UserBand || mongoose.model('UserBand', userBandSchema);

export default UserBand;