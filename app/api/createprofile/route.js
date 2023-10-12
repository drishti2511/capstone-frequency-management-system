import { connectMongoDB } from "@/lib/mongodb";
import UserProfile from "@/models/userProfile";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const { name, email, contactNumber, designation, radioDetails,radioSetDetails,location } = await req.json();
    await connectMongoDB();
    await UserProfile.create({name, email, contactNumber, designation, radioDetails,radioSetDetails,location});
    console.log(name, email, contactNumber, designation, radioDetails,radioSetDetails,location);
    return NextResponse.json({ message: "User Profile Created Successfully." }, { status: 201 });


  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while creating user profile." },
      { status: 500 }
    );
  }
}
