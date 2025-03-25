import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const GET = async (
  req: NextRequest,
  { params }: { params: Promise<{ currentUserId: string }> },
) => {
  try {
    const { currentUserId } = await params;

    if (!currentUserId) {
      return NextResponse.json({ success: false }, { status: 400 });
    }
    const user = await prisma.user.findUnique({
      where: {
        clerkId: currentUserId,
      },
    });

    if (!user) {
      return NextResponse.json({ success: false }, { status: 401 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Error getting clerk id:', error);
    return NextResponse.json(
      { error: 'Failed to verify user' },
      { status: 500 },
    );
  }
};
