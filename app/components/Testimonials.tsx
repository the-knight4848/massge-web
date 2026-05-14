import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah Jenkins',
    role: 'Regular Client',
    content: 'The most relaxing experience I have ever had. The staff is incredibly professional and the atmosphere is pure tranquility.',
  },
  {
    name: 'Michael Chen',
    role: 'First-time Visitor',
    content: 'Absolutely outstanding. The traditional Thai massage completely relieved my lower back pain. Will definitely be returning.',
  },
  {
    name: 'Emma Thompson',
    role: 'Local Resident',
    content: 'A hidden gem! The aromatherapy massage was heavenly. The attention to detail in the spa makes you feel like royalty.',
  }
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 bg-sage-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl text-sage-900 font-bold mb-4">What Our Guests Say</h2>
          <div className="flex justify-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} className="w-6 h-6 fill-beige-500 text-beige-500" />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-8 rounded-2xl shadow-sm border border-beige-100">
              <p className="text-sage-700 italic mb-6">"{testimonial.content}"</p>
              <div>
                <h4 className="font-semibold text-sage-900">{testimonial.name}</h4>
                <span className="text-sm text-sage-500">{testimonial.role}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
