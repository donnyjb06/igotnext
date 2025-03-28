import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { verifyIsOnboardingComplete } from './lib/actions/db.actions';
import { NextResponse } from 'next/server';

const isPublicRoute = createRouteMatcher(['/', '/sign-in(.*)', '/sign-up(.*)', '/onboarding'])
const isOnboardingRoute = createRouteMatcher(['/onboarding'])


export default clerkMiddleware(async (auth, req) => {
  const userId = await auth();

  // For users visiting /onboarding dont redirect (redirect is done within the onboarding page)
  if (userId && isOnboardingRoute(req)) {
    return NextResponse.next()
  }

  // For users visiting /sign-in or /sign-up dont redirect (redirect is done within the sign-in and sign-up pages)
  if (userId && (isPublicRoute(req))) {
    return NextResponse.next()
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
