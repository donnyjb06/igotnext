'use server'

import { signUpUserData } from '@/types';
import { auth, clerkClient } from '@clerk/nextjs/server';
import { saveNewUser } from './db.actions';

export const saveNewUserToDb = async (userData: signUpUserData) => {
  try {
    const user = await saveNewUser(userData);

    const client = await clerkClient();

    if (!user) {
      await client.users.deleteUser(userData.clerkId);
      console.error('Error has occured: ');
      throw new Error('User details could not be saved! Try again!');
    }

    return user;
  } catch (error) {
    throw new Error('User details could not be saved! Try again!');
  }
};
