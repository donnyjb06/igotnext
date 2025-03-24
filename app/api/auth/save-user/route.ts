import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";

export const POST = async (req: NextRequest) => {
    try {
      const { clerkId, email, userName, fullName, position } = await req.json();

      const authHeader = req.headers.get("Authorization");
      const serverSecret = process.env.API_SECRET_KEY;

      if (!authHeader || authHeader !== `Bearer ${serverSecret}`) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
      }

      const user = await prisma.user.create( {
        data: {
          clerkId,
          email,
          username: userName,
          fullname: fullName,
          position,
        }
      })

      return NextResponse.json(user, { status: 201 })
  } catch (error) {
    console.error("Error saving user:", error)
    return NextResponse.json(
      { error: "Failed to save user" },
      { status: 500 }
    )
  }
}