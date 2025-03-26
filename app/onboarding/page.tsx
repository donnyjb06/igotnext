import { verifyUserId } from '@/lib/actions/server-actions';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import React from 'react';

const Onboarding = async () => {
  return <div>Onboarding</div>;
};

export default Onboarding;
