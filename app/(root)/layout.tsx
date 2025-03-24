import { LayoutProps } from '@/types';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import React from 'react';

const RootLayout: React.FC<LayoutProps> = async ({ children }) => {
  const { userId } = await auth();

  if (!userId) {
    redirect('/sign-in');
  }

  return children;
};

export default RootLayout;
