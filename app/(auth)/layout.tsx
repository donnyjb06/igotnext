import { LayoutProps } from '@/types';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

import React from 'react';

const AuthLayout: React.FC<LayoutProps> = async ({ children }) => {
  const { userId } = await auth();

  if (userId) {
    redirect('/');
  }
  
  return children;
};

export default AuthLayout;
