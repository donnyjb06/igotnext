import { verifyIsOnboardingComplete } from '@/lib/actions/db.actions';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import React from 'react';

const Onboarding = async () => {
  const { userId } = await auth();

  if (!userId) {
    redirect('/sign-in');
  }

  const isOnboardingComplete = await verifyIsOnboardingComplete(userId)
  if (isOnboardingComplete) {
    redirect("/home")
  }

  return <div>Onboarding</div>;
};

export default Onboarding;
