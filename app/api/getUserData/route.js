import { connectMongoDB } from "@/lib/mongodb";
import UserProfile from "@/models/userProfile";
import { NextResponse } from "next/server";

export async function GET(req) {
    try {
      await connectMongoDB();
      console.log('inside try catch block');
    //   console.log(req.query.email);
  
      // Get the user's email from the query string
      // const email = req.query.email;
  
      // Find the user's data in the database
      // const userData = await UserProfile.findOne({ email: email }
    //   const { email } = req.query.email;
    const email = 'drishtiolf@gmail.com';
      console.log(email);
      
      if (!email) {
        return NextResponse.json({ error: 'Email is missing' }, { status: 400 });
      }
      console.log(email);
      const userData = await UserProfile.findOne({ email:email });
  
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
  