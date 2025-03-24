import { Position, SelectValueProps } from '@/types/';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { z } from 'zod';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const positionsList: SelectValueProps<Position>[] = [
  { value: Position.PG, label: 'Point Guard' },
  { value: Position.SG, label: 'Shooting Guard' },
  { value: Position.SF, label: 'Small Forward' },
  { value: Position.PF, label: 'Power Forward' },
  { value: Position.C, label: 'Center' },
];

export const getAuthFormSchema = (isSignIn: boolean) => {
  return z.object({
    fullName: !isSignIn ? z.string().min(2).max(100) : z.string().optional(),
    userName: !isSignIn ? z.string().min(4).max(15) : z.string().optional(),
    email: z.string().email(),
    password: z
      .string()
      .min(8)
      .max(20)
      .regex(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
      ),
    position: z.enum([
      Position.PG,
      Position.SG,
      Position.SF,
      Position.PF,
      Position.C,
    ]),
  });
};

export const toastMessages = {
  loggedIn: 'Successfully signed in!',
  loadingClient: 'Loading authentication client. Please wait!',
};
