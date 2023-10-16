import { connectMongoDB } from "@/lib/mongodb";
import freqBand from "@/models/freqband";
import { NextResponse } from "next/server";


export async function POST(req) {
  try {
    const { frequency_type,frequency_to,frequency_fm, channel_spacing} = await req.json();
    await connectMongoDB();
    await freqBand.create({frequency_type,frequency_to,frequency_fm, channel_spacing});
    console.log(frequency_type,frequency_to,frequency_fm, channel_spacing);

    return NextResponse.json({ message: "Frequency Band Added successfully." }, { status: 201 });
  } catch (error) {
    console.error('An error occurred while adding requency bands:', error);
    return NextResponse.json(
      { message: "An error occurred while adding requency bands." },
      { status: 500 }
    );
  }
}
