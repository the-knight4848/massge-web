import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { token, amount, description, method } = body;

    if (!process.env.OMISE_SECRET_KEY || process.env.OMISE_SECRET_KEY.includes('skey_test_xxx')) {
      // If no valid key is provided, we simulate a successful charge or QR code
      if (method === 'promptpay') {
        return NextResponse.json({ 
          success: true, 
          chargeId: 'chrg_test_mock', 
          qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=MOCK_PROMPTPAY_QR'
        });
      }
      console.log('Omise test charge simulation:', { amount, token });
      return NextResponse.json({ success: true, chargeId: 'chrg_test_mock' });
    }

    const omise = require('omise')({
      publicKey: process.env.NEXT_PUBLIC_OMISE_PUBLIC_KEY,
      secretKey: process.env.OMISE_SECRET_KEY,
    });

    let chargeParams: any = {
      amount: amount * 100, // convert to Satang
      currency: 'thb',
      description: description || 'Massage Booking',
    };

    if (method === 'promptpay') {
      chargeParams.source = { type: 'promptpay' };
    } else if (token) {
      chargeParams.card = token;
    } else {
      throw new Error("No payment method provided");
    }

    const charge = await new Promise((resolve, reject) => {
      omise.charges.create(chargeParams, (err: any, resp: any) => {
        if (err) reject(err);
        else resolve(resp);
      });
    }) as any;

    if (charge.status === 'successful' || charge.status === 'pending') {
      let qrCodeUrl = null;
      if (charge.source && charge.source.type === 'promptpay' && charge.source.scannable_code) {
        qrCodeUrl = charge.source.scannable_code.image.download_uri;
      }
      return NextResponse.json({ success: true, chargeId: charge.id, qrCode: qrCodeUrl });
    } else {
      return NextResponse.json({ success: false, message: charge.failure_message }, { status: 400 });
    }
  } catch (error: any) {
    console.error('Omise charge error:', error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
