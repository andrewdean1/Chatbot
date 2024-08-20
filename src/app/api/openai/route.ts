import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export async function POST(req: Request) {
  try {
    const { messages }: { messages: ChatMessage[] } = await req.json();
    const chatCompletion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        ...messages,
      ],
    });
    const reply = chatCompletion.choices[0].message.content;
    return NextResponse.json({ reply });
  } catch (error) {
    console.error('OpenAI API error:', error);
    if (error instanceof Error) {
      if (
        'response' in error &&
        typeof error.response === 'object' &&
        error.response &&
        'status' in error.response
      ) {
        if (error.response.status === 429) {
          return NextResponse.json(
            { error: 'Rate limit exceeded.' },
            { status: 429 }
          );
        }
      }
      return NextResponse.json(
        { error: error.message || 'An error occurred during your request.' },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { error: 'An unknown error occurred.' },
      { status: 500 }
    );
  }
}
