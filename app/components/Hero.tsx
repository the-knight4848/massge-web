import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      <div className="absolute inset-0 z-0 bg-sage-800">
        <div className="absolute inset-0 bg-sage-900/50 z-10"></div>
        <Image 
          src="/hero-bg.png" 
          alt="Relaxing spa setting" 
          fill
          className="object-cover"
          priority
        />
      </div>
      
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-beige-50">
        <span className="uppercase tracking-widest text-sm font-medium mb-4 block text-beige-100">Premium Wellness Center</span>
        <h1 className="font-serif text-5xl md:text-7xl font-bold mb-6 leading-tight">
          Find Your Inner <br/> <span className="text-beige-200">Peace & Balance</span>
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto mb-10 text-beige-50/90 font-light">
          Experience authentic massage therapies designed to restore your body, mind, and spirit in a tranquil sanctuary.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/book" className="bg-beige-50 text-sage-900 px-8 py-4 rounded-full font-medium hover:bg-beige-100 transition-colors text-lg shadow-lg">
            Book an Appointment
          </Link>
          <Link href="#services" className="border border-beige-50 text-beige-50 px-8 py-4 rounded-full font-medium hover:bg-beige-50/10 transition-colors text-lg backdrop-blur-sm">
            Explore Services
          </Link>
        </div>
      </div>
    </section>
  );
}
