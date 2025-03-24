import { ReactNode } from 'react';
import { Position } from './types/Position';

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

export enum Position {
  PG = "PG",
  SG = "SG",
  SF = "SF",
  PF = "PF",
  C = "C",
}