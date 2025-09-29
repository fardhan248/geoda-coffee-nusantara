import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Coffee, Leaf, Award, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import heroImage from '@/assets/hero-coffee.jpg';
import coffeeFarming from '@/assets/coffee-farming.jpg';
import coffeeProducts from '@/assets/coffee-products.jpg';

const Home = () => {
  const features = [
    {
      icon: Coffee,
      title: 'Kualitas Premium',
      description: 'Biji kopi pilihan terbaik dengan proses roasting yang sempurna untuk cita rasa yang konsisten.'
    },
    {
      icon: Leaf,
      title: 'Berkelanjutan',
      description: 'Bekerja sama dengan petani lokal untuk praktik pertanian yang ramah lingkungan.'
    },
    {
      icon: Award,
      title: 'Sertifikasi Kualitas',
      description: 'Produk bersertifikat dengan standar internasional untuk jaminan kualitas terbaik.'
    },
    {
      icon: Users,
      title: 'Dukungan Petani',
      description: 'Memberdayakan petani Indonesia dengan fair trade dan kemitraan yang berkelanjutan.'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Wijaya',
      text: 'Rasa kopinya benar-benar istimewa! Aroma dan cita rasanya sangat khas Indonesia.',
      rating: 5
    },
    {
      name: 'Ahmad Rizki',
      text: 'Kualitas konsisten dan kemasan yang ramah lingkungan. Sangat puas dengan pelayanannya.',
      rating: 5
    },
    {
      name: 'Maya Sari',
      text: 'Sebagai pecinta kopi, Geoda Coffee adalah pilihan terbaik untuk kopi premium Indonesia.',
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-primary/60" />
        </div>
        
        <div className="relative z-10 text-center text-primary-foreground max-w-4xl mx-auto px-4">
          <h1 className="font-display font-bold text-5xl md:text-7xl mb-6 leading-tight">
            Geoda Coffee
          </h1>
          <p className="text-xl md:text-2xl mb-4 font-medium">
            Cita Rasa Kopi Premium dari Alam Indonesia
          </p>
          <p className="text-lg md:text-xl mb-8 text-primary-foreground/90 max-w-2xl mx-auto">
            Diproses dengan presisi bersama petani dan ahli cuaca untuk menjaga 
            konsistensi rasa dan kualitas biji kopi terbaik
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="gold" size="lg" asChild>
              <Link to="/shop">Belanja Sekarang</Link>
            </Button>
            <Button variant="outline" size="lg" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10" asChild>
              <Link to="/about">Pelajari Cerita Kami</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display font-bold text-4xl md:text-5xl text-foreground mb-4">
              Mengapa Memilih Geoda Coffee?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Komitmen kami terhadap kualitas, keberlanjutan, dan pemberdayaan petani Indonesia
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="p-6 text-center shadow-warm hover:shadow-coffee transition-spring">
                  <div className="w-16 h-16 hero-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <h3 className="font-display font-semibold text-xl mb-3 text-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 warm-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src={coffeeFarming}
                alt="Petani kopi Indonesia bekerja di kebun kopi"
                className="rounded-2xl shadow-coffee w-full h-auto"
              />
            </div>
            <div>
              <h2 className="font-display font-bold text-4xl md:text-5xl text-foreground mb-6">
                Cerita dari Tanah Indonesia
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Geoda Coffee lahir dari passion terhadap kopi Indonesia yang berkualitas tinggi. 
                Kami bekerja langsung dengan petani lokal untuk memastikan setiap biji kopi 
                dipetik pada waktu yang tepat dan diproses dengan standar kualitas terbaik.
              </p>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Dengan dukungan ahli cuaca dan teknologi modern, kami menjaga konsistensi 
                rasa yang menjadi ciri khas Geoda Coffee. Setiap cangkir adalah hasil dari 
                dedikasi dan cinta terhadap tanah Indonesia.
              </p>
              <Button variant="hero" size="lg" asChild>
                <Link to="/about">Baca Cerita Lengkap</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Products Preview */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display font-bold text-4xl md:text-5xl text-foreground mb-4">
              Koleksi Kopi Premium
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Dari light roast hingga dark roast, temukan cita rasa yang sesuai dengan selera Anda
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-12">
            <div className="order-2 lg:order-1">
              <h3 className="font-display font-bold text-3xl text-foreground mb-4">
                Variasi Roasting Terbaik
              </h3>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Setiap jenis roasting memberikan karakter rasa yang unik. Light roast untuk 
                yang menyukai keasaman fruity, medium roast untuk keseimbangan sempurna, 
                dan dark roast untuk rasa yang bold dan kaya.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-muted-foreground">Light Roast - Fruity & Bright</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-muted-foreground">Medium Roast - Balanced & Smooth</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-muted-foreground">Dark Roast - Bold & Rich</span>
                </li>
              </ul>
              <Button variant="hero" size="lg" asChild>
                <Link to="/shop">Jelajahi Semua Produk</Link>
              </Button>
            </div>
            <div className="order-1 lg:order-2">
              <img 
                src={coffeeProducts}
                alt="Berbagai produk kopi Geoda dengan tingkat roasting berbeda"
                className="rounded-2xl shadow-coffee w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display font-bold text-4xl md:text-5xl text-foreground mb-4">
              Apa Kata Pelanggan
            </h2>
            <p className="text-xl text-muted-foreground">
              Testimoni dari pecinta kopi di seluruh Indonesia
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6 shadow-warm">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-gold text-lg">★</span>
                  ))}
                </div>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  "{testimonial.text}"
                </p>
                <p className="font-semibold text-foreground">
                  {testimonial.name}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 hero-gradient text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="font-display font-bold text-4xl md:text-5xl mb-6">
            Rasakan Kopi Indonesia Terbaik
          </h2>
          <p className="text-xl mb-8 text-primary-foreground/90">
            Bergabunglah dengan ribuan pecinta kopi yang telah merasakan 
            kualitas premium Geoda Coffee
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="gold" size="lg" asChild>
              <Link to="/shop">Mulai Berbelanja</Link>
            </Button>
            <Button variant="outline" size="lg" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10" asChild>
              <Link to="/contact">Hubungi Kami</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;