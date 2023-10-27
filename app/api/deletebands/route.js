import { connectMongoDB } from '@/lib/mongodb'; // Adjust the import as needed
import UserBand from '@/models/userbandassoc'; // Adjust the import as needed
import { NextResponse } from "next/server";

export async function DELETE(req) {

    try {
        // Delete all user-band associations with the specified bandId
        const url = new URL(req.url);
    const searchParams = url.searchParams;
    const bandIds = searchParams.get('bandIds');
        console.log('bandIds:', bandIds);
        await connectMongoDB();
        const deletedAssociation = await UserBand.deleteMany({ bandId: { $in: bandIds } });

        if (!deletedAssociation) {
            return NextResponse.json({ message: 'User-band not found.' }, { status: 404 });
        } else {
            return NextResponse.json({ message: 'User deleted the band successfully.' }, { status: 200 });
        }
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'An error occurred while unselecting the band.' }, { status: 500 });
    }

}


export async function GET(req) {
    try {
      await connectMongoDB();
      const frequencyBands = await UserBand.find();
      return NextResponse.json(frequencyBands, { status: 200 });
    } catch (error) {
      console.error('An error occurred while fetching frequency bands:', error);
      return NextResponse.json(
        { message: "An error occurred while fetching frequency bands." },
        { status: 500 }
      );
    }
  }
