import { connectMongoDB } from "@/lib/mongodb";
import UserProfile from "@/models/userProfile";
import { NextResponse } from "next/server";

export async function GET(req) {
    try {
      
      console.log('inside try catch block');
    //   console.log(req);
   
    const url = new URL(req.url);
    const searchParams = url.searchParams;
    const email = searchParams.get('email');
   
    await connectMongoDB();
    
      
      if (!email) {
        return NextResponse.json({ error: 'Email is missing' }, { status: 400 });
      }
      // console.log(email);
      const userData = await UserProfile.findOne({ email:email });
  
      if (!userData) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
      }
      // console.log(userData);
      return NextResponse.json({ userData });

    } catch (error) {
      console.error('Error fetching user data:', error);
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
  }
  