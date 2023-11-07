import { connectMongoDB } from '@/lib/mongodb'; // Adjust the import as needed
import UserBand from '@/models/userbandassoc'; // Adjust the import as needed
import { NextResponse } from "next/server";
import freqBand from "@/models/freqband";

export async function PUT(req) {

    try {
        // Delete all user-band associations with the specified bandId
        const url = new URL(req.url);
    const searchParams = url.searchParams;
    const bandIds = searchParams.get('bandIds');
        // console.log('bandIds:', bandIds);
        await connectMongoDB();

        for (const bandId of bandIds){
          const bandIdObjectId = new mongoose.Types.ObjectId(bandId);
          const existingFreqBand = await freqBand.findOne({_id: bandIdObjectId });
          existingFreqBand.user_email = null;
          existingFreqBand.user_location = null;
        }
       return NextResponse.json({ message: 'User deleted the band successfully.' }, { status: 200 });
    
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'An error occurred while unselecting the band.' }, { status: 500 });
    }

}


export async function GET(req) {
  try {
    await connectMongoDB();
    const userBands = await freqBand.find({ user_email: { $ne: null } });
    console.log('user Bands to delete ',userBands);
    return NextResponse.json(userBands, { status: 200 });

  } catch (error) {
    console.error('An error occurred while fetching frequency bands:', error);
    return NextResponse.json(
      { message: "An error occurred while fetching frequency bands." },
      { status: 500 }
    );
  }
  }
