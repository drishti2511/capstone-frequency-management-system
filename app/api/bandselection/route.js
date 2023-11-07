// app/api/bandselection/route.js
const express = require('express');
const app = express();
import freqBand from "@/models/freqband";
const mongoose = require('mongoose');

// Use the built-in express.json() middleware to parse JSON data
app.use(express.json());


import { connectMongoDB } from '@/lib/mongodb';
import UserBand from '@/models/userbandassoc';
import { NextResponse } from "next/server";

// PUT request handler
export async function PUT(req) {

    try {
        const { bandId, userId, location} = await req.json();
        const bandIdObjectId = new mongoose.Types.ObjectId(bandId);
        await connectMongoDB();
        const existingFreqBand = await freqBand.findOne({_id: bandIdObjectId });
        // console.log(userId,location);
        existingFreqBand.user_email = userId;
        existingFreqBand.user_location = location;
        console.log('updated user location is : ',existingFreqBand.user_loaction );
        const updatedFreqBand = await existingFreqBand.save();
        return NextResponse.json(updatedFreqBand, { status: 200 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'An error occurred while selecting the band.' }, { status: 500 });
    }

}

// DELETE request handler
// export async function DELETE(req) {

//     try {
//         // Delete all user-band associations with the specified bandId
//         const { userId, bandId } = await req.json();
//         console.log('user and band id and inside delete function');
//         console.log(userId, bandId);
//         await connectMongoDB();
//         const deletedAssociation = await UserBand.findOneAndDelete({ userId, bandId });

//         if (!deletedAssociation) {
//             return NextResponse.json({ message: 'User-band association not found.' }, { status: 404 });
//         } else {
//             return NextResponse.json({ message: 'User unselected the band successfully.' }, { status: 200 });
//         }
//     } catch (error) {
//         console.error(error);
//         return NextResponse.json({ message: 'An error occurred while unselecting the band.' }, { status: 500 });
//     }

// }



export async function GET(req) {
    try {
      await connectMongoDB();
      const userBands = await freqBand.find({ user_email: { $ne: null } }).select('_id');
      const userBandIds = userBands.map((userBand) => userBand._id.toString());
      // console.log('userbands which are occupied : ', userBandIds);
      return NextResponse.json(userBandIds, { status: 200 });

    } catch (error) {
      console.error('An error occurred while fetching frequency bands:', error);
      return NextResponse.json(
        { message: "An error occurred while fetching frequency bands." },
        { status: 500 }
      );
    }
  }