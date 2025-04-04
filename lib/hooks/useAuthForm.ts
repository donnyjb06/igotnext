import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { getAuthFormSchema, toastMessages } from '@/lib/utils';
import { useSignUp, useSignIn } from '@clerk/nextjs';
import { saveNewUserToDb } from '@/lib/actions/server-actions';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { Position } from '@prisma/client';
import { signUpUserData } from '@/types';

export const useAuthForm = (type: 'sign-in' | 'sign-up') => {
  const router = useRouter();
  const { signUp, isLoaded: isSignUpLoaded, setActive: setSignUpActive } = useSignUp();
  const { signIn, isLoaded: isSignInLoaded, setActive: setSignInActive } = useSignIn();
  const isSignIn = type === 'sign-in';

  const formSchema = getAuthFormSchema(isSignIn);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: '',
      userName: '',
      email: '',
      password: '',
      position: Position.PG,
    },
  });

  const signUphandler = async (values: z.infer<typeof formSchema>) => {
    if (!isSignUpLoaded) {
      toast.warning(toastMessages.loadingClient);
      return;
    }

    try {
        const clerkResult = await signUp.create({
          emailAddress: values.email,
          password: values.password,
        });

        const clerkId = clerkResult.createdUserId;
        if (!clerkId) {
          toast.error(
            'Something went wrong when trying to create your account!',
          );
          return;
        }

        const userData: signUpUserData = {
          clerkId,
          email: values.email,
          fullName: values.fullName,
          userName: values.userName,
          position: values.position,
        };

        const response = await saveNewUserToDb(userData);
        if (!response) {
          console.error("An error has occured: User details not returned from saveNewUserToDb server action!")
          toast.error('An error has occurred! Please try again!');
          return;
        }

        const userSessionId = clerkResult.createdSessionId;

        if (!userSessionId) {
          console.error("An error has occured: Could not find session id when creating user!")
          toast.error("No session found. Please try again!")
        }

        await setSignUpActive({
          session: userSessionId,
        });


        toast.success('Account created successfully!');
        
    } catch (error) {
      console.error('An error occurred:', error);
      toast.error(
        error instanceof Error ? error.message : 'An unknown error occurred!',
      );
    }
  };

  const signInhandler = async (values: z.infer<typeof formSchema>) => {
    if (!isSignInLoaded) {
      toast.warning(toastMessages.loadingClient);
      return;
    }

    try {
      const clerkResult = await signIn.create({
        strategy: "password",
        identifier: values.email,
        password: values.password,
      })

    const userSessionId = clerkResult.createdSessionId;

    if (!userSessionId) {
      toast.error("Sign-in failed! Try again")
    }

    setSignInActive({
      session: userSessionId
    })

    toast.success(toastMessages.loggedIn)
    router.push("/home")
    } catch (error) {
      console.error('An error occurred:', error);
      toast.error(
        error instanceof Error ? error.message : 'An unknown error occurred!',
      );
    }
  }

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (isSignIn) {
      signInhandler(values)
    } else {
      signUphandler(values)
    }
  }

  return { form, onSubmit, isSignIn };
};
