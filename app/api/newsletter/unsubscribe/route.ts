import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error('RESEND_API_KEY is not configured');
  return new Resend(key);
}

function getAudienceId() {
  const id = process.env.RESEND_AUDIENCE_ID;
  if (!id) throw new Error('RESEND_AUDIENCE_ID is not configured');
  return id;
}

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { success: false, error: 'Email is required.' },
        { status: 400 },
      );
    }

    const resend = getResend();
    const audienceId = getAudienceId();

    // Find contact by email and unsubscribe
    const contacts = await resend.contacts.list({ audienceId });
    const contact = contacts.data?.data?.find((c) => c.email === email);

    if (contact) {
      await resend.contacts.update({
        id: contact.id,
        audienceId,
        unsubscribed: true,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Newsletter unsubscribe error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to unsubscribe.' },
      { status: 500 },
    );
  }
}
