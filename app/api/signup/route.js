import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const { email, password,repassword } = await req.json();
    console.log('user email is : ', email);
    const hashedPassword = await bcrypt.hash(password, 10);
    const hashedRePassword = await bcrypt.hash(repassword, 10);
    await connectMongoDB();
    console.log(email, password, hashedPassword);
    console.log(email, repassword, hashedRePassword);
    await User.create({email, password: hashedPassword, repassword: hashedRePassword});
   

    return NextResponse.json({ message: "User registered." }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "An error occurred while registering the user." },
      { status: 500 }
    );
  }
}
