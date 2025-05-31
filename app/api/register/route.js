import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import User from "@/models/user";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {

    const {
      name,
      email,
      phone,
      residenceType,
      monthlyIncome,
      previousloan,
      martialStatus,
      numberOfDependents,
      city,
      state,
      password,
    } = await req.json();

    const hashedPassword = await bcrypt.hash(password, 15);

    await connectMongoDB();

    console.log(
      "Registering user:",
      name,
      email,
      phone,
      residenceType,
      monthlyIncome,
      previousloan,
      martialStatus,
      numberOfDependents,
      city,
      state,
      hashedPassword
    );

    await User.create({
      name,
      email,
      phone,
      residenceType,
      monthlyIncome,
      previousloan,
      martialStatus,
      numberOfDependents,
      city,
      state,
      password: hashedPassword
    });

    console.log(
      "User registered:",
      name,
      email,
      phone,
      residenceType,
      monthlyIncome,
      previousloan,
      martialStatus,
      numberOfDependents,
      city,
      state,
      hashedPassword
    );

    return NextResponse.json(
      {
        message: "User registered",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration failed:", error); 
    return NextResponse.json(
      {
        message: "Error occured while registering user",
      },
      { status: 500 }
    );
  }
}
