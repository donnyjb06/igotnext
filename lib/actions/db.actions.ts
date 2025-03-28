"use server";

import { signUpUserData } from "@/types";
import prisma from "../prisma";
import { Position } from "@prisma/client";

export const saveNewUser = async (userData: signUpUserData) => {
  const { clerkId, fullName, email, position, userName } = userData;

  try {
    await prisma.user.create({
      data: {
        fullname: fullName,
        clerkId,
        email,
        position: position as Position,
        username: userName
      }
    })

    return {
      fullName,
      email,
      position,
      userName,
    };
  } catch (error) {
    console.error("An error has occured when attempting to save the user!");
    throw new Error("User details could not be saved to database!");
  }
}

export const verifyIsOnboardingComplete = async (userId: string | null) => {
  if (!userId) {
    console.error("An error has occured: No user ID provided when attempting to verify onboarding completion!")
    return false
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        clerkId: userId
      }
    })

    if (!user) {
      console.error("An error has occured: User not found when verifying onboarding completion!")
      return false
    }
    
  } catch (error) {
    console.error("An error has occured when attempting to verify onboarding completion!")
    throw new Error("User onboarding completion could not be verified!")
  }
}