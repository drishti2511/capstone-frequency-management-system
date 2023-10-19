// app/api/bandselection/route.js

import { connectMongoDB } from '@/lib/mongodb';
import UserBand from '@/models/userbandassoc';

// POST request handler
export async function postHandler(req, res) {
    if (req.method === 'POST') {
        const { userId, bandId } = req.body;

        try {
            // Check if the band is already occupied by any user
            await connectMongoDB();
            const isBandOccupied = await UserBand.exists({ bandId });

            if (isBandOccupied) {
                return res.status(400).json({ message: 'Band is already occupied by another user.' });
            }

            // Create a new user-band association
            const userBand = new UserBand({ userId, bandId });
            await userBand.save();
            return res.status(201).json({ message: 'User selected the band successfully.' });

        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'An error occurred while selecting the band.' });
        }
    }
}

// DELETE request handler
export async function deleteHandler(req, res) {
    if (req.method === 'DELETE') {
        const { userId, bandId } = req.body;

        try {
            // Delete all user-band associations with the specified bandId
            await connectMongoDB();
            const deletedAssociation = await UserBand.findOneAndDelete({ userId, bandId });

            if (!deletedAssociation) {
                return res.status(404).json({ message: 'User-band association not found.' });
            }

            return res.status(200).json({ message: 'User unselected the band successfully.' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'An error occurred while unselecting the band.' });
        }
    }
}
