"use client";

import { useState } from 'react';
import Script from 'next/script';
import Image from 'next/image';
import { format, startOfToday } from 'date-fns';
import { CreditCard, QrCode } from 'lucide-react';

const SERVICES = [
  { id: 'thai', title: 'Traditional Thai Massage', price: 800, duration: 60 },
  { id: 'aroma', title: 'Aromatherapy Oil Massage', price: 1200, duration: 90 },
  { id: 'foot', title: 'Foot Reflexology', price: 600, duration: 60 }
];

const generateSlots = (date: Date, duration: number) => {
  const slots = [];
  let currentHour = 10;
  let currentMinute = 0;
  
  while (currentHour < 20) {
    const timeString = `${currentHour.toString().padStart(2, '0')}:${currentMinute.toString().padStart(2, '0')}`;
    slots.push(timeString);
    
    const totalMinutes = currentMinute + duration + 30;
    currentHour += Math.floor(totalMinutes / 60);
    currentMinute = totalMinutes % 60;
  }
  return slots;
};

export default function BookingForm() {
  const [step, setStep] = useState(1);
  const [serviceId, setServiceId] = useState('');
  const [date, setDate] = useState<Date>(startOfToday());
  const [time, setTime] = useState('');
  const [details, setDetails] = useState({ name: '', email: '', phone: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  
  // Payment Options State
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'promptpay'>('card');
  const [qrCodeUrl, setQrCodeUrl] = useState('');

  const selectedService = SERVICES.find(s => s.id === serviceId);
  const slots = selectedService ? generateSlots(date, selectedService.duration) : [];

  const handleNext = () => setStep(p => p + 1);
  const handleBack = () => {
    setStep(p => p - 1);
    setQrCodeUrl('');
    setError('');
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (paymentMethod === 'promptpay') {
      // Process PromptPay
      try {
        const res = await fetch('/api/checkout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            method: 'promptpay',
            amount: selectedService?.price,
            description: `Booking: ${selectedService?.title} for ${details.name}`
          })
        });
        const data = await res.json();
        if (data.success && data.qrCode) {
          setQrCodeUrl(data.qrCode);
        } else {
          setError(data.message || 'Failed to generate QR Code');
        }
      } catch (err: any) {
        setError('An error occurred during QR code generation.');
      } finally {
        setLoading(false);
      }
    } else {
      // Process Credit Card
      if (!(window as any).OmiseCard) {
        setError('Payment system is not loaded yet. Please try again.');
        setLoading(false);
        return;
      }

      const OmiseCard = (window as any).OmiseCard;
      OmiseCard.configure({
        publicKey: process.env.NEXT_PUBLIC_OMISE_PUBLIC_KEY || 'pkey_test_xxxx',
      });

      OmiseCard.open({
        amount: (selectedService?.price || 0) * 100, // THB in Satang
        currency: "THB",
        defaultPaymentMethod: "credit_card",
        onCreateTokenSuccess: async (nonce: string) => {
          try {
            const res = await fetch('/api/checkout', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                method: 'card',
                token: nonce,
                amount: selectedService?.price,
                description: `Booking: ${selectedService?.title} for ${details.name}`
              })
            });
            const data = await res.json();
            if (data.success) {
              setSuccess(true);
              setStep(5);
            } else {
              setError(data.message || 'Payment failed');
            }
          } catch (err: any) {
            setError('An error occurred during payment.');
          } finally {
            setLoading(false);
          }
        },
        onFormClosed: () => {
          setLoading(false);
        },
      });
    }
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-beige-100 max-w-3xl mx-auto">
      <Script src="https://cdn.omise.co/omise.js" strategy="lazyOnload" />
      
      {step < 5 && (
        <div className="flex justify-between mb-8 text-sm font-medium text-sage-400">
          <span className={step >= 1 ? 'text-sage-900' : ''}>1. Service</span>
          <span className={step >= 2 ? 'text-sage-900' : ''}>2. Date/Time</span>
          <span className={step >= 3 ? 'text-sage-900' : ''}>3. Details</span>
          <span className={step >= 4 ? 'text-sage-900' : ''}>4. Payment</span>
        </div>
      )}

      {step === 1 && (
        <div className="space-y-4">
          <h3 className="font-serif text-2xl text-sage-900 mb-6">Select a Service</h3>
          {SERVICES.map(s => (
            <div 
              key={s.id} 
              onClick={() => setServiceId(s.id)}
              className={`p-4 rounded-xl border-2 cursor-pointer transition-colors ${serviceId === s.id ? 'border-sage-600 bg-sage-50' : 'border-beige-200 hover:border-sage-400'}`}
            >
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-semibold text-sage-900">{s.title}</h4>
                  <p className="text-sm text-sage-600">{s.duration} mins</p>
                </div>
                <span className="font-bold text-sage-900">฿{s.price}</span>
              </div>
            </div>
          ))}
          <button 
            disabled={!serviceId}
            onClick={handleNext}
            className="w-full mt-8 bg-sage-600 text-beige-50 py-3 rounded-xl font-medium disabled:opacity-50 hover:bg-sage-800 transition-colors"
          >
            Continue to Date & Time
          </button>
        </div>
      )}

      {step === 2 && (
        <div>
          <h3 className="font-serif text-2xl text-sage-900 mb-6">Select Date & Time</h3>
          <div className="mb-6">
            <label className="block text-sm font-medium text-sage-700 mb-2">Date</label>
            <input 
              type="date" 
              min={format(new Date(), 'yyyy-MM-dd')}
              value={format(date, 'yyyy-MM-dd')}
              onChange={(e) => setDate(new Date(e.target.value))}
              className="w-full p-3 border border-beige-200 rounded-xl focus:outline-none focus:border-sage-500"
            />
          </div>
          
          <div className="mb-8">
            <label className="block text-sm font-medium text-sage-700 mb-2">Available Slots</label>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
              {slots.map(s => (
                <button
                  key={s}
                  onClick={() => setTime(s)}
                  className={`py-2 rounded-lg border text-sm font-medium transition-colors ${time === s ? 'bg-sage-600 text-white border-sage-600' : 'border-beige-200 text-sage-700 hover:border-sage-400'}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-4">
            <button onClick={handleBack} className="w-1/3 py-3 border border-beige-200 rounded-xl font-medium text-sage-700 hover:bg-beige-50 transition-colors">Back</button>
            <button 
              disabled={!time}
              onClick={handleNext}
              className="w-2/3 bg-sage-600 text-beige-50 py-3 rounded-xl font-medium disabled:opacity-50 hover:bg-sage-800 transition-colors"
            >
              Continue to Details
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <form onSubmit={(e) => { e.preventDefault(); handleNext(); }}>
          <h3 className="font-serif text-2xl text-sage-900 mb-6">Your Details</h3>
          <div className="space-y-4 mb-8">
            <div>
              <label className="block text-sm font-medium text-sage-700 mb-1">Full Name</label>
              <input required type="text" value={details.name} onChange={e => setDetails({...details, name: e.target.value})} className="w-full p-3 border border-beige-200 rounded-xl focus:outline-none focus:border-sage-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-sage-700 mb-1">Email</label>
              <input required type="email" value={details.email} onChange={e => setDetails({...details, email: e.target.value})} className="w-full p-3 border border-beige-200 rounded-xl focus:outline-none focus:border-sage-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-sage-700 mb-1">Phone Number</label>
              <input required type="tel" value={details.phone} onChange={e => setDetails({...details, phone: e.target.value})} className="w-full p-3 border border-beige-200 rounded-xl focus:outline-none focus:border-sage-500" />
            </div>
          </div>
          <div className="flex gap-4">
            <button type="button" onClick={handleBack} className="w-1/3 py-3 border border-beige-200 rounded-xl font-medium text-sage-700 hover:bg-beige-50 transition-colors">Back</button>
            <button type="submit" className="w-2/3 bg-sage-600 text-beige-50 py-3 rounded-xl font-medium hover:bg-sage-800 transition-colors">Continue to Payment</button>
          </div>
        </form>
      )}

      {step === 4 && (
        <div>
          <h3 className="font-serif text-2xl text-sage-900 mb-6">Payment Summary</h3>
          <div className="bg-beige-50 p-6 rounded-xl mb-8 space-y-3 text-sage-800 border border-beige-200">
            <p><strong>Service:</strong> {selectedService?.title}</p>
            <p><strong>Date & Time:</strong> {format(date, 'MMM dd, yyyy')} at {time}</p>
            <p className="text-xl font-bold border-t border-beige-200 pt-3 mt-3">Total: ฿{selectedService?.price}</p>
          </div>

          {!qrCodeUrl ? (
            <>
              <div className="mb-8">
                <label className="block text-sm font-medium text-sage-700 mb-3">Select Payment Method</label>
                <div className="grid grid-cols-2 gap-4">
                  <button 
                    onClick={() => setPaymentMethod('card')}
                    className={`flex flex-col items-center justify-center p-4 border-2 rounded-xl transition-colors ${paymentMethod === 'card' ? 'border-sage-600 bg-sage-50 text-sage-900' : 'border-beige-200 text-sage-500 hover:border-sage-300'}`}
                  >
                    <CreditCard className="w-8 h-8 mb-2" />
                    <span className="font-medium">Credit Card</span>
                  </button>
                  <button 
                    onClick={() => setPaymentMethod('promptpay')}
                    className={`flex flex-col items-center justify-center p-4 border-2 rounded-xl transition-colors ${paymentMethod === 'promptpay' ? 'border-sage-600 bg-sage-50 text-sage-900' : 'border-beige-200 text-sage-500 hover:border-sage-300'}`}
                  >
                    <QrCode className="w-8 h-8 mb-2" />
                    <span className="font-medium">QR PromptPay</span>
                  </button>
                </div>
              </div>

              {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

              <div className="flex gap-4">
                <button onClick={handleBack} className="w-1/3 py-3 border border-beige-200 rounded-xl font-medium text-sage-700 hover:bg-beige-50 transition-colors">Back</button>
                <button 
                  onClick={handlePayment}
                  disabled={loading}
                  className="w-2/3 bg-sage-600 text-beige-50 py-3 rounded-xl font-medium hover:bg-sage-800 transition-colors flex justify-center items-center gap-2"
                >
                  {loading ? 'Processing...' : paymentMethod === 'card' ? 'Pay with Card' : 'Generate QR Code'}
                </button>
              </div>
            </>
          ) : (
            <div className="text-center">
              <h4 className="font-medium text-lg mb-4 text-sage-900">Scan QR Code to Pay</h4>
              <div className="inline-block p-4 bg-white border border-beige-200 rounded-2xl mb-6 shadow-sm">
                <img src={qrCodeUrl} alt="PromptPay QR Code" className="mx-auto w-[250px] h-[250px]" />
              </div>
              <p className="text-sm text-sage-500 mb-8">Open your banking app and scan this code to complete the booking.</p>
              
              <div className="flex gap-4">
                <button onClick={() => setQrCodeUrl('')} className="w-1/3 py-3 border border-beige-200 rounded-xl font-medium text-sage-700 hover:bg-beige-50 transition-colors">Cancel</button>
                <button 
                  onClick={() => { setStep(5); setSuccess(true); }}
                  className="w-2/3 bg-sage-600 text-beige-50 py-3 rounded-xl font-medium hover:bg-sage-800 transition-colors flex justify-center items-center gap-2"
                >
                  Simulate Payment Success
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {step === 5 && (
        <div className="text-center py-8">
          <div className="w-20 h-20 bg-sage-100 text-sage-600 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">✓</div>
          <h3 className="font-serif text-3xl text-sage-900 mb-4">Booking Confirmed!</h3>
          <p className="text-sage-600 mb-8 max-w-md mx-auto">
            Thank you, {details.name}. Your appointment for <strong>{selectedService?.title}</strong> on <strong>{format(date, 'MMM dd, yyyy')} at {time}</strong> has been successfully booked. A confirmation email will be sent shortly.
          </p>
          <a href="/" className="inline-block bg-sage-600 text-beige-50 px-8 py-3 rounded-full font-medium hover:bg-sage-800 transition-colors">Return to Home</a>
        </div>
      )}
    </div>
  );
}
