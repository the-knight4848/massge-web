import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { token, amount, description } = body;

    if (!process.env.OMISE_SECRET_KEY || process.env.OMISE_SECRET_KEY.includes('skey_test_xxx')) {
      // If no valid key is provided, we simulate a successful charge for demonstration
      console.log('Omise test charge simulation:', { amount, token });
      return NextResponse.json({ success: true, chargeId: 'chrg_test_mock' });
    }

    const omise = require('omise')({
      publicKey: process.env.NEXT_PUBLIC_OMISE_PUBLIC_KEY,
      secretKey: process.env.OMISE_SECRET_KEY,
    });

    const charge = await new Promise((resolve, reject) => {
      omise.charges.create({
        amount: amount * 100, // convert to Satang
        currency: 'thb',
        card: token,
        description: description || 'Massage Booking',
      }, (err: any, resp: any) => {
        if (err) reject(err);
        else resolve(resp);
      });
    }) as any;

    if (charge.status === 'successful' || charge.status === 'pending') {
      return NextResponse.json({ success: true, chargeId: charge.id });
    } else {
      return NextResponse.json({ success: false, message: charge.failure_message }, { status: 400 });
    }
  } catch (error: any) {
    console.error('Omise charge error:', error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
