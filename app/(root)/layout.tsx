import { verifyUserId } from '@/lib/actions/server-actions';
import { LayoutProps } from '@/types';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import React from 'react';


const RootLayout: React.FC<LayoutProps> = async ({ children }) => {
  const { userId: currentUserId } = await auth()
  if (!currentUserId) {
    redirect("/sign-in")
  }

  const isSignUpCompleted = await verifyUserId(currentUserId)
  if (!isSignUpCompleted) {
    redirect("/onboarding")
  }

  return children;
};

export default RootLayout;
