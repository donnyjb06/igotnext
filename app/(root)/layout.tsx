import { LayoutProps } from '@/types';
import { auth } from '@clerk/nextjs/server';
import React from 'react';
import { verifyIsOnboardingComplete } from '@/lib/actions/db.actions';
import { redirect } from 'next/navigation';

const RootLayout: React.FC<LayoutProps> = async ({ children }) => {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in")
  }

  const isOnboardingComplete = await verifyIsOnboardingComplete(userId)
  if (!isOnboardingComplete) {
    redirect("/onboarding")
  }

  return (
    <>
      {children}
    </>
  );
};

export default RootLayout;
