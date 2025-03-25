import { verifyUserId } from '@/lib/actions/server-actions'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import React from 'react'

const Onboarding = async () => {
  const { userId: currentUserId } = await auth()
  if (!currentUserId) {
    redirect("/sign-in")
  }

  const isSignUpCompleted = await verifyUserId(currentUserId)
  if (isSignUpCompleted) {
    redirect("/")
  }

  return (
    <div>Onboarding</div>
  )
}

export default Onboarding