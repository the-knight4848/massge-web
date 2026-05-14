import { Leaf, MapPin, Phone, Mail } from 'lucide-react';
import Link from 'next/link';

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

export default function Footer() {
  return (
    <footer id="contact" className="bg-sage-900 text-beige-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <Leaf className="w-8 h-8 text-beige-500" />
              <span className="font-serif text-2xl font-semibold tracking-wide text-beige-50">Lanna Spa</span>
            </Link>
            <p className="text-sage-200 text-sm leading-relaxed mb-6">
              Your sanctuary for relaxation and rejuvenation. Experience authentic massage therapies in a tranquil setting.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-beige-200 hover:text-white transition-colors">
                <InstagramIcon className="w-5 h-5" />
              </a>
              <a href="#" className="text-beige-200 hover:text-white transition-colors">
                <FacebookIcon className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-serif text-xl font-medium mb-6 text-beige-50">Contact</h4>
            <ul className="space-y-4 text-sage-200">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-beige-500 shrink-0 mt-0.5" />
                <span>123 Wellness Avenue,<br/>Chiang Mai, 50200<br/>Thailand</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-beige-500 shrink-0" />
                <span>+66 53 123 456</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-beige-500 shrink-0" />
                <span>hello@lannaspa.com</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-xl font-medium mb-6 text-beige-50">Hours</h4>
            <ul className="space-y-4 text-sage-200">
              <li className="flex justify-between">
                <span>Monday - Friday</span>
                <span>10:00 AM - 10:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Saturday - Sunday</span>
                <span>9:00 AM - 11:00 PM</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-serif text-xl font-medium mb-6 text-beige-50">Newsletter</h4>
            <p className="text-sage-200 text-sm mb-4">Subscribe to receive exclusive offers and wellness tips.</p>
            <form className="flex flex-col gap-3">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="bg-sage-800 border border-sage-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-beige-500 placeholder-sage-400"
              />
              <button className="bg-beige-500 text-sage-900 font-medium px-4 py-2 rounded-lg hover:bg-beige-200 transition-colors">
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-sage-800 mt-16 pt-8 text-center text-sage-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Lanna Spa. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
