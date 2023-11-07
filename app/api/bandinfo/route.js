import { connectMongoDB } from '@/lib/mongodb'; // Adjust the import as needed
import freqBand from '@/models/freqband'; // Adjust the import as needed
import { NextResponse } from "next/server";
import mongoose from 'mongoose';

export async function GET(req) {
  try {
    const url = new URL(req.url);
    const searchParams = url.searchParams;
    const bandId = searchParams.get('bandId');
    // console.log(bandId);
    await connectMongoDB();

    const objectId = new mongoose.Types.ObjectId(bandId);

    // console.log('checking bandId obtained from frontend');
    // console.log(bandId);

    const frequencyBands = await freqBand.findOne({ _id: objectId });
    return NextResponse.json(frequencyBands, { status: 200 });

  }
  catch (error) {
    console.error('An error occurred while fetching frequency bands:', error);
    return NextResponse.json(
      { message: "An error occurred while fetching frequency bands." },
      { status: 500 }
    );
  }
}