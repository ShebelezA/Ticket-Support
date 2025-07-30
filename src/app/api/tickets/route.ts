import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const ticketSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  reference: z.string().min(1, 'Booking reference is required'),
  category: z.enum(['Payment', 'Cancellation', 'Change Dates', 'Other']),
  description: z.string().min(10, 'Description must be at least 10 characters'),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = ticketSchema.parse(body)

    const ticket = await prisma.ticket.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        reference: validatedData.reference,
        category: validatedData.category,
        description: validatedData.description,
        status: 'pending',
      },
    })

    return NextResponse.json({ 
      success: true, 
      ticket,
      message: 'Ticket submitted successfully!' 
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, errors: error.errors },
        { status: 400 }
      )
    }
    
    console.error('Error creating ticket:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const tickets = await prisma.ticket.findMany({
      orderBy: { createdAt: 'desc' },
    })
    
    return NextResponse.json({ tickets })
  } catch (error) {
    console.error('Error fetching tickets:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
} 