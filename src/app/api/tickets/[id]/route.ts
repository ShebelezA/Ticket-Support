import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

// ✅ Schema validation for PATCH input
const updateSchema = z.object({
  status: z.enum(['pending', 'resolved']),
});

// 🔄 PATCH: update ticket status
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const validatedData = updateSchema.parse(body);

    const ticket = await prisma.ticket.update({
      where: { id: params.id },
      data: { status: validatedData.status },
    });

    return NextResponse.json({
      success: true,
      ticket,
      message: 'Ticket status updated successfully!',
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, errors: error.errors },
        { status: 400 }
      );
    }

    console.error('Error updating ticket:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}

// 🔍 GET: fetch ticket by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const ticket = await prisma.ticket.findUnique({
      where: { id: params.id },
    });

    if (!ticket) {
      return NextResponse.json(
        { success: false, message: 'Ticket not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, ticket }, { status: 200 });
  } catch (error) {
    console.error('Error fetching ticket:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
