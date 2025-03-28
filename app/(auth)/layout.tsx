import { LayoutProps } from '@/types';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { verifyIsOnboardingComplete } from '@/lib/actions/db.actions';

import React from 'react';
import { toast } from 'sonner';

const AuthLayout: React.FC<LayoutProps> = async ({ children }) => {
  const { userId } = await auth()

  if (userId) {
    const isOnboardingComplete = await verifyIsOnboardingComplete(userId)
    if (isOnboardingComplete) {
      redirect("/home")
    } else {
      redirect("/onboarding")
    }
  }

  return (
    <>
      {children}    
    </>
  );
};

export default AuthLayout;
