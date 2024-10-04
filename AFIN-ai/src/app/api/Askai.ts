"use server"
import { NextResponse } from 'next/server';
import { sendMessage } from '../_utils/generativeAI';

export async function POST(request: Request) {
  try {
    const { message } = await request.json();

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    const response = await sendMessage(message);
    return NextResponse.json({ response });
  } catch (error) {
    console.error('Error handling AI request:', error);
    return NextResponse.json({ error: 'Error processing AI message' }, { status: 500 });
  }
}
