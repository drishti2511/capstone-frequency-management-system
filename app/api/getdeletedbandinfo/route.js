import { connectMongoDB } from '@/lib/mongodb'; // Adjust the import as needed
import UserBand from '@/models/userbandassoc'; // Adjust the import as needed
import { NextResponse } from "next/server";

export async function GET(req) {
    try {
      await connectMongoDB();

    //   const url = new URL(req.url);
    //   const searchParams = url.searchParams;
    //   const bandId = searchParams.get('id');
console.log(req);

      const objectId = mongoose.Types.ObjectId(bandId);

      console.log('checking bandId obtained from frontend');
      console.log(bandId);

      const frequencyBands = await UserBand.findOne({_id: objectId });


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