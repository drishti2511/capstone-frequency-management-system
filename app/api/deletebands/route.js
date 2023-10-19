import { connectDB } from '@/lib/mongodb'; // Adjust the import as needed
import UserBand from '@/models/userbandassoc'; // Adjust the import as needed
import freqBand from '@/models/freqband';

export default async function handler(req, res) {
if (req.method === 'DELETE') {
    const { bandId } = req.body;

    try {
        // Delete all user-band associations with the specified bandId
        const deletedAssociations = await UserBand.deleteMany({ bandId });

        if (deletedAssociations.deletedCount === 0) {
            return res.status(404).json({ message: 'No associations found for the band.' });
        }
        return res.status(200).json({ message: 'Band and associated user selections deleted successfully.' });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'An error occurred while deleting the band and associated user selections.' });
    }
} 

else if (req.method === 'GET') {
    try {
        // Retrieve all available bands
        const availableBands = await freqBand.find({});
        const bandIds = availableBands.map((band) => band._id);

        // Find the bands associated with the given user
        const userAssociations = await UserBand.find({ userId });

        // Create a set of band IDs associated with the user
        const userBandIds = new Set(userAssociations.map((association) => association.bandId));

        // Filter available bands based on user associations
        const filteredBands = availableBands.filter((band) => !userBandIds.has(band._id));

        return res.status(200).json(filteredBands);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'An error occurred while fetching available bands.' });
    }
} else {
    return res.status(405).end(); // Method Not Allowed
}
}