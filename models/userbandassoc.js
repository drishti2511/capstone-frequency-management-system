import mongoose from 'mongoose';

const userBandSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    bandId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'freqBand',
        required: true,
    },
});

const UserBand= mongoose.models.UserBand || mongoose.model('UserBand', userBandSchema);

export default UserBand;