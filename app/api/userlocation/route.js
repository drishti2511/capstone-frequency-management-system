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
