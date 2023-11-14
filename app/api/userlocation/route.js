import { connectMongoDB } from "@/lib/mongodb";
import UserLocation from "@/models/loc";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function PUT(req) {
    try {
        const { email, latitude, longitude } = await req.json();
        await connectMongoDB();
        const existingUser = await UserLocation.findOne({ email: email });
        if (existingUser) {
            existingUser.latitude = latitude;
            existingUser.longitude = longitude;
            const updatedFreqBand = await existingUser.save();
            return NextResponse.json(updatedFreqBand, { status: 200 });
        }
        else {
            // Create a new user object
            const newUser = new UserLocation({
                email: email,
                latitude: latitude,
                longitude: longitude,
            });

            // Save the new user
            const savedUser = await newUser.save();
            return NextResponse.json(savedUser, { status: 201 }); // Status 201 for resource created
        }

    } catch (error) {
        return NextResponse.json(
            { message: "An error occurred while creating user profile." },
            { status: 500 }
        );
    }
}



export async function GET(req) {
    try {
      
      console.log('inside try catch block');
    //   console.log(req);
   
    const url = new URL(req.url);
    const searchParams = url.searchParams;
    const email = searchParams.get('email');
   console.log(email);
    await connectMongoDB();
    
      
      if (!email) {
        return NextResponse.json({ error: 'Email is missing' }, { status: 400 });
      }
      // console.log(email);
      const userData = await UserLocation.findOne({ email:email });
  
      if (!userData) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
      }
      console.log(userData);
      return NextResponse.json({ userData });

    } catch (error) {
      console.error('Error fetching user data:', error);
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
  }
  