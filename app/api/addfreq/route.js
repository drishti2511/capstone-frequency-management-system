import { connectMongoDB } from "@/lib/mongodb";
import freqBand from "@/models/freqband";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const {frequencyBands} = await req.json();
    console.log('the bands are calculated are: ',frequencyBands);
    await connectMongoDB();
    for (const frequencyBandData of frequencyBands) {
      const newFrequencyBand = new freqBand({
        ...frequencyBandData,
      });
      await newFrequencyBand.save(); // Save the frequency band to the database
    }
    return NextResponse.json({ message: "Frequency Band Added successfully." }, { status: 201 });
  } catch (error) {
    console.error('An error occurred while adding requency bands:', error);
    return NextResponse.json(
      { message: "An error occurred while adding requency bands." },
      { status: 500 }
    );
  }
}
