import { FormType } from '@/types';
import { useSignIn, useSignUp } from '@clerk/nextjs';
import { toast } from 'sonner';
import { toastMessages } from '../utils';

export const useGoogleAuth = (type: FormType) => {
  const {
    signIn,
    isLoaded: isSignInLoaded,
  } = useSignIn();
  const {
    signUp,
    isLoaded: isSignUpLoaded,
  } = useSignUp();

  const handleSignIn = async () => {
    if (!isSignInLoaded) {
      toast.error(toastMessages.loadingClient);
      return;
    }

    try {
      await signIn.authenticateWithRedirect({
        strategy: 'oauth_google',
        redirectUrl: '/home',
        redirectUrlComplete: '/home'
      });
    } catch (error) {
      console.error('An error has occured!', error);
      toast.error(
        error instanceof Error ? error.message : 'An unknown error has occured',
      );
    }
  };

  const handleSignUp = async () => {
    if (!isSignUpLoaded) {
      toast.error(toastMessages.loadingClient);
      return;
    }

    try {
      await signUp.authenticateWithRedirect({
        strategy: 'oauth_google',
        redirectUrl: '/onboarding',
        redirectUrlComplete: '/onboarding',
      });
    } catch (error) {
      console.error('An error has occured!', error);
      toast.error(
        error instanceof Error ? error.message : 'An unknown error has occured',
      );
    }
  };

  const handleClick = async () => {
    if (type === "sign-in") {
      await handleSignIn()
    } else {
      await handleSignUp()
    }

    
  }

  return handleClick
};
