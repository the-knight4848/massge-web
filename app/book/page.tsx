import BookingForm from '@/app/components/BookingForm';

export default function BookPage() {
  return (
    <div className="min-h-screen pt-32 pb-24 bg-beige-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="font-serif text-4xl md:text-5xl text-sage-900 font-bold mb-4">Book Your Appointment</h1>
          <p className="text-sage-600 text-lg max-w-2xl mx-auto">
            Select your preferred treatment, choose a convenient time, and secure your booking easily.
          </p>
        </div>
        <BookingForm />
      </div>
    </div>
  );
}
