import { ReactNode } from 'react';
import { Position } from '@prisma/client';

type FormType = 'sign-in' | 'sign-up';

type SelectValueProps<T> = {
  value: T;
  label: string;
};

interface signUpUserData {
  clerkId: string;
  email: string;
  userName?: string;
  fullName?: string;
  position?: Position;
}

interface LayoutProps {
  children: ReactNode;
}
