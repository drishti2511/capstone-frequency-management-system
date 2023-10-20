// app/api/bandselection/route.js
const express = require('express');
const app = express();

// Use the built-in express.json() middleware to parse JSON data
app.use(express.json());


import { connectMongoDB } from '@/lib/mongodb';
import UserBand from '@/models/userbandassoc';
import { NextResponse } from "next/server";

// POST request handler
export async function POST(req) {

        try {
           console.log('obtainig body of request');
            const { userId, bandId } = await req.json();

            // const { userId, bandId } = await req.json();
            
            console.log('user and band id');
            console.log(userId, bandId );
            await connectMongoDB();
            const isBandOccupied = await UserBand.exists({ bandId });

            if (isBandOccupied) {
                return NextResponse.json({ message: 'Band is already occupied by another user.' }, { status: 400 });
            } else {
                // Create a new user-band association
                // const userBand = new UserBand({ userId, bandId });
                // await userBand.save();
                await UserBand.create({userId, bandId});
                return NextResponse.json({ message: 'User selected the band successfully.' }, { status: 201 });
            }
        } catch (error) {
            console.error(error);
            return NextResponse.json({ message: 'An error occurred while selecting the band.' }, { status: 500});
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
                res.status(404).json({ message: 'User-band association not found.' });
            } else {
                res.status(200).json({ message: 'User unselected the band successfully.' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'An error occurred while unselecting the band.' });
        }
    }
}
