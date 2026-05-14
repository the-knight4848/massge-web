import Link from 'next/link';
import { Leaf } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="fixed w-full z-50 bg-beige-50/90 backdrop-blur-md border-b border-beige-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="flex items-center gap-2">
            <Leaf className="w-8 h-8 text-sage-600" />
            <span className="font-serif text-2xl text-sage-900 font-semibold tracking-wide">Lanna Spa</span>
          </Link>
          <div className="hidden md:flex items-center space-x-8">
            <Link href="#services" className="text-sage-800 hover:text-sage-600 transition-colors font-medium">Services</Link>
            <Link href="#testimonials" className="text-sage-800 hover:text-sage-600 transition-colors font-medium">Reviews</Link>
            <Link href="#contact" className="text-sage-800 hover:text-sage-600 transition-colors font-medium">Contact</Link>
            <Link href="/book" className="bg-sage-600 text-beige-50 px-6 py-2 rounded-full hover:bg-sage-800 transition-colors shadow-sm font-medium">
              Book Now
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
