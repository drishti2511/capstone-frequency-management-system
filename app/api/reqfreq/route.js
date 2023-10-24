import { connectMongoDB } from "@/lib/mongodb";
import freqBand from "@/models/freqband";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await connectMongoDB();
    const frequencyBands = await freqBand.find();

    return NextResponse.json(frequencyBands, { status: 200 });
  } catch (error) {
    console.error('An error occurred while fetching frequency bands:', error);
    return NextResponse.json(
      { message: "An error occurred while fetching frequency bands." },
      { status: 500 }
    );
  }
}

