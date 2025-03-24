'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import Image from 'next/image';
import { FaGoogle } from 'react-icons/fa';
import FormField from '@/components/FormField';
import PositionSelect from './FormSelectField';
import { positionsList } from '@/lib/utils';
import { FormType } from '@/types';
import { useAuthForm } from '@/lib/hooks/useAuthForm';

const AuthForm = ({ type }: { type: FormType }) => {
  const { form, onSubmit, isSignIn } = useAuthForm(type);

  return (
    <div className='min-h-screen flex items-center justify-center my-5'>
      <div>
        <div className='flex flex-col gap-8 px-6 py-8 items-stretch'>
          <Image
            src='/logo.svg'
            alt='iGotNEXT! logo'
            height={70}
            width={70}
            className='self-center'
          />
          <div className='flex flex-col gap-[8px] items-center'>
            <h2 className='text-center'>
              {isSignIn ? 'Welcome Back' : 'Create an Account'}
            </h2>
            <p className='body-text'>
              {isSignIn ? 'Please sign in to continue' : 'Join our community'}
            </p>
          </div>

          <div className='flex flex-col gap-4 items-stretch'>
            <form action={async () => {
              
            }} className='flex justify-center'>
              <Button
                type='submit'
                className='rounded-btn bg-off-white text-background-blue self-stretch
                hover:bg-accent flex items-center transition-colors
                duration-300 ease-out hover:text-off-white active:bg-accent active:text-off-white'>
                <FaGoogle className='h-5 w-5 ' />
                Continue with Google
              </Button>
            </form>

            <hr />
            <p className='body-text relative text-center w-auto'>
              <span className='p-2 bg-background-blue'>
                or
                {isSignIn ? ' continue ' : ' sign up '}
                with email
              </span>
            </p>
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className='space-y-8 flex flex-col gap-6'>
              {!isSignIn && (
                <FormField
                  control={form.control}
                  name='fullName'
                  label='Full Name'
                />
              )}

              {!isSignIn && (
                <FormField
                  control={form.control}
                  name='userName'
                  label='Username'
                />
              )}

              <FormField
                control={form.control}
                name='email'
                label='Email'
                type='email'
              />

              <FormField
                control={form.control}
                name='password'
                label='Password'
                type='password'
              />

              {!isSignIn && (
                <PositionSelect
                  control={form.control}
                  name='position'
                  placeholder='Select a Position'
                  label='Position'
                  values={positionsList}
                />
              )}

              <button
                type='submit'
                className='rounded-btn primary-btn w- w-full'>
                {isSignIn ? 'Sign in' : 'Create Account'}
              </button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
