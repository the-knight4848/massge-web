import { Sparkles, Flower2, Droplets } from 'lucide-react';

const services = [
  {
    title: 'Traditional Thai Massage',
    description: 'Ancient healing system combining acupressure, Indian Ayurvedic principles, and assisted yoga postures.',
    price: '฿800',
    duration: '60 min',
    icon: Flower2,
  },
  {
    title: 'Aromatherapy Oil Massage',
    description: 'Smooth, flowing massage using essential oils extracted from herbs, flowers, and fruits to naturally enhance wellbeing.',
    price: '฿1,200',
    duration: '90 min',
    icon: Droplets,
  },
  {
    title: 'Foot Reflexology',
    description: 'Application of pressure to specific points on the feet, corresponding to organs and systems of the body.',
    price: '฿600',
    duration: '60 min',
    icon: Sparkles,
  }
];

export default function Services() {
  return (
    <section id="services" className="py-24 bg-beige-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-serif text-4xl text-sage-900 font-bold mb-4">Our Signature Treatments</h2>
          <p className="text-sage-600 text-lg">
            Discover our range of holistic therapies designed to rejuvenate your body and relax your mind.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow border border-beige-100 flex flex-col h-full">
              <div className="w-14 h-14 bg-sage-50 rounded-full flex items-center justify-center mb-6 shrink-0">
                <service.icon className="w-7 h-7 text-sage-600" />
              </div>
              <h3 className="font-serif text-2xl text-sage-900 font-semibold mb-3">{service.title}</h3>
              <p className="text-sage-600 mb-6 flex-grow">{service.description}</p>
              <div className="flex items-center justify-between mt-auto border-t border-beige-100 pt-4">
                <span className="text-sage-500 font-medium">{service.duration}</span>
                <span className="text-sage-900 font-bold text-xl">{service.price}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
