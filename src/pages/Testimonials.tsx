import { Card } from '@/components/ui/card';
import { Star } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  rating: number;
  text: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Rina",
    rating: 5,
    text: "Rasa kopinya konsisten, harum, dan kemasannya sangat rapi. Jadi favorit saya setiap pagi!"
  },
  {
    id: 2,
    name: "Budi",
    rating: 4,
    text: "Pengiriman cepat, dan saya suka ada info traceability dari petani. Membuat kopi terasa lebih bermakna."
  },
  {
    id: 3,
    name: "Maya",
    rating: 5,
    text: "Suka banget sama Geoda Coffee, rasa light roast-nya smooth banget. Pasti repeat order!"
  },
  {
    id: 4,
    name: "Andi",
    rating: 5,
    text: "Kualitas biji kopinya premium! Aromanya kuat dan rasanya nikmat sekali. Recommended!"
  },
  {
    id: 5,
    name: "Siti",
    rating: 4,
    text: "Pelayanan ramah dan produknya berkualitas. Harga sesuai dengan kualitas yang didapat."
  },
  {
    id: 6,
    name: "Doni",
    rating: 5,
    text: "Dark roast dari Geoda Coffee ini mantap! Body-nya thick dan finish-nya panjang. Perfect untuk espresso."
  },
  {
    id: 7,
    name: "Lina",
    rating: 5,
    text: "Beli untuk hadiah teman, packagingnya elegan banget. Temannya juga suka sama kopinya!"
  },
  {
    id: 8,
    name: "Wahyu",
    rating: 4,
    text: "Medium roast-nya balance antara acidity dan sweetness. Cocok buat daily brew!"
  },
  {
    id: 9,
    name: "Dewi",
    rating: 5,
    text: "Sustainability-nya keren! Senang bisa support petani lokal sambil ngopi enak."
  },
  {
    id: 10,
    name: "Rudi",
    rating: 5,
    text: "Udah langganan hampir setahun. Ga pernah kecewa! Kualitas selalu terjaga."
  },
  {
    id: 11,
    name: "Nina",
    rating: 4,
    text: "Website-nya informatif, mudah order. Kopinya juga enak, terutama yang single origin."
  },
  {
    id: 12,
    name: "Eko",
    rating: 5,
    text: "Ini kopi Indonesia terbaik yang pernah saya coba. Bangga ada brand lokal sekualitas ini!"
  }
];

const Testimonials = () => {
  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[...Array(5)].map((_, index) => (
          <Star
            key={index}
            className={`h-5 w-5 ${
              index < rating
                ? 'fill-gold text-gold'
                : 'fill-muted text-muted'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="hero-gradient text-primary-foreground py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display font-bold text-4xl md:text-6xl mb-4">
            Testimoni Pelanggan
          </h1>
          <p className="text-xl md:text-2xl text-primary-foreground/90 max-w-2xl mx-auto">
            Apa kata mereka yang sudah mencoba Geoda Coffee
          </p>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <Card
                key={testimonial.id}
                className="p-6 shadow-warm hover:shadow-coffee transition-spring"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-display font-semibold text-xl text-foreground">
                      {testimonial.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">Pelanggan Setia</p>
                  </div>
                  {renderStars(testimonial.rating)}
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  "{testimonial.text}"
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display font-bold text-3xl md:text-4xl mb-4">
            Ingin Berbagi Pengalaman Anda?
          </h2>
          <p className="text-muted-foreground text-lg mb-8">
            Kami senang mendengar feedback dari Anda. Testimoni Anda sangat berarti bagi kami!
          </p>
          <a
            href="/contact"
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-white/10 text-primary-foreground border border-primary-foreground/20 hover:bg-white/20 h-11 px-8"
          >
            Hubungi Kami
          </a>
        </div>
      </section>
    </div>
  );
};

export default Testimonials;
