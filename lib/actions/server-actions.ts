'use server';

import { signUpUserData } from '@/types';
import { auth, clerkClient } from '@clerk/nextjs/server';

export const signUpNewUser = async (userData: signUpUserData) => {
  try {
    const baseUrl =
      process.env.NODE_ENV === 'production'
        ? process.env.NEXT_PUBLIC_API_BASE_URL
        : 'http://localhost:3000';

    const response = await fetch(`${baseUrl}/api/auth/save-user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.API_SECRET_KEY}`,
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to sign up user');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error has occured when trying to ');
    throw error;
  }
};

export const verifyUserId = async (currentUserId: string | null) => {
  if (!currentUserId) {
    return false;
  }

  const baseUrl =
    process.env.NODE_ENV === 'production'
      ? process.env.NEXT_PUBLIC_API_URL
      : 'http://localhost:3000';

  try {
    const response = await fetch(
      `${baseUrl}/api/auth/verify-user-id/${currentUserId}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${process.env.API_SECRET_KEY}`,
        },
      },
    );

    const data = await response.json();

    if (!data.success) {
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error has occured when trying to verify your user ID!');
    return false;
  }
};

export const completeOnboarding = async () => {
  const { userId } = await auth();

  if (!userId) {
    return { error: "User is not logged in! Please log in!" }
  }

  const client = await clerkClient();

  try {
    const res = await client.users.updateUser(userId, {
      publicMetadata: {
        onboardingComplete: true,
      }
    })

    return { message: res.publicMetadata }
  } catch (err) {
    return { error: "There was an error updating the metadata" }
  }
}
