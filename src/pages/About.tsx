import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Coffee, Heart, Users, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import coffeeFarming from '@/assets/coffee-farming.jpg';

const About = () => {
  const values = [
    {
      icon: Coffee,
      title: 'Kualitas Terjamin',
      description: 'Setiap biji kopi dipilih dengan standar kualitas tertinggi dan diproses dengan teknologi modern untuk mempertahankan cita rasa alami.'
    },
    {
      icon: Heart,
      title: 'Passion untuk Kopi',
      description: 'Kecintaan mendalam terhadap kopi Indonesia mendorong kami untuk terus berinovasi dan menghadirkan produk terbaik.'
    },
    {
      icon: Users,
      title: 'Kemitraan Berkelanjutan',
      description: 'Membangun hubungan jangka panjang dengan petani lokal untuk menciptakan ekosistem kopi yang berkelanjutan.'
    },
    {
      icon: Award,
      title: 'Standar Internasional',
      description: 'Produk kami memenuhi standar kualitas internasional dengan sertifikasi yang diakui secara global.'
    }
  ];

  const team = [
    {
      name: 'Budi Santoso',
      role: 'Founder & CEO',
      description: 'Memiliki pengalaman 15 tahun di industri kopi Indonesia dan passionate terhadap kopi berkualitas tinggi.'
    },
    {
      name: 'Sari Dewi',
      role: 'Head of Quality Control',
      description: 'Ahli dalam quality assurance dengan latar belakang food science, memastikan setiap produk memenuhi standar tertinggi.'
    },
    {
      name: 'Ahmad Rizal',
      role: 'Partnership Manager',
      description: 'Mengelola hubungan dengan petani mitra dan memastikan praktik fair trade yang berkelanjutan.'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="hero-gradient text-primary-foreground py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display font-bold text-4xl md:text-6xl mb-6">
            Tentang Geoda Coffee
          </h1>
          <p className="text-xl md:text-2xl text-primary-foreground/90 max-w-3xl mx-auto leading-relaxed">
            Perjalanan kami dimulai dari kecintaan terhadap kopi Indonesia berkualitas tinggi 
            dan komitmen untuk memberdayakan petani lokal
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-display font-bold text-4xl md:text-5xl text-foreground mb-6">
                Cerita Dimulai dari Tanah
              </h2>
              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                <p>
                  Geoda Coffee lahir dari passion mendalam terhadap kopi Indonesia yang berkualitas tinggi. 
                  Didirikan pada tahun 2018 oleh sekelompok pecinta kopi yang memiliki visi untuk mengangkat 
                  derajat kopi Indonesia di kancah internasional.
                </p>
                <p>
                  Kami percaya bahwa setiap cangkir kopi memiliki cerita. Cerita tentang tanah tempat 
                  tumbuhnya, tangan-tangan terampil yang merawatnya, dan proses panjang yang menghasilkan 
                  cita rasa yang sempurna. Inilah yang menjadi fondasi Geoda Coffee.
                </p>
                <p>
                  Bekerja langsung dengan petani di berbagai daerah di Indonesia, kami tidak hanya 
                  membeli biji kopi, tetapi membangun kemitraan yang berkelanjutan. Setiap pembelian 
                  adalah investasi untuk masa depan yang lebih baik bagi komunitas petani.
                </p>
              </div>
            </div>
            <div>
              <img 
                src={coffeeFarming}
                alt="Petani kopi Indonesia yang bermitra dengan Geoda Coffee"
                className="rounded-2xl shadow-coffee w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 warm-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display font-bold text-4xl md:text-5xl text-foreground mb-4">
              Misi & Visi Kami
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <Card className="p-8 shadow-warm">
              <h3 className="font-display font-bold text-2xl text-foreground mb-4">
                Misi Kami
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Menghadirkan kopi Indonesia berkualitas premium kepada dunia dengan tetap 
                menjaga keberlanjutan lingkungan dan memberdayakan petani lokal melalui 
                praktik fair trade yang transparan dan berkeadilan.
              </p>
            </Card>

            <Card className="p-8 shadow-warm">
              <h3 className="font-display font-bold text-2xl text-foreground mb-4">
                Visi Kami
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Menjadi brand kopi Indonesia terdepan yang diakui secara internasional, 
                sekaligus menjadi jembatan antara petani dan pecinta kopi di seluruh dunia 
                untuk menciptakan ekosistem kopi yang berkelanjutan.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display font-bold text-4xl md:text-5xl text-foreground mb-4">
              Nilai-Nilai Kami
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Prinsip-prinsip yang menjadi fondasi dalam setiap langkah perjalanan kami
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card key={index} className="p-6 text-center shadow-warm hover:shadow-coffee transition-spring">
                  <div className="w-16 h-16 hero-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <h3 className="font-display font-semibold text-xl mb-3 text-foreground">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display font-bold text-4xl md:text-5xl text-foreground mb-4">
              Tim Kami
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Orang-orang passionate yang berdedikasi untuk menghadirkan kopi terbaik Indonesia
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="p-6 text-center shadow-warm">
                <div className="w-24 h-24 hero-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary-foreground font-display font-bold text-2xl">
                    {member.name.split(' ').map(name => name[0]).join('')}
                  </span>
                </div>
                <h3 className="font-display font-semibold text-xl text-foreground mb-1">
                  {member.name}
                </h3>
                <p className="text-primary font-medium mb-3">
                  {member.role}
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  {member.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Awards & Recognition */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display font-bold text-4xl md:text-5xl text-foreground mb-4">
              Penghargaan & Sertifikasi
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Pengakuan atas komitmen kami terhadap kualitas dan keberlanjutan
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-6 text-center shadow-warm">
              <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-gold-foreground" />
              </div>
              <h3 className="font-display font-semibold text-xl text-foreground mb-2">
                Fair Trade Certified
              </h3>
              <p className="text-muted-foreground">
                Sertifikasi fair trade yang menjamin praktik perdagangan yang adil dengan petani mitra
              </p>
            </Card>

            <Card className="p-6 text-center shadow-warm">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <Coffee className="h-8 w-8 text-accent-foreground" />
              </div>
              <h3 className="font-display font-semibold text-xl text-foreground mb-2">
                Specialty Coffee Association
              </h3>
              <p className="text-muted-foreground">
                Anggota SCA dengan standar kualitas specialty coffee yang diakui internasional
              </p>
            </Card>

            <Card className="p-6 text-center shadow-warm">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="font-display font-semibold text-xl text-foreground mb-2">
                Sustainable Coffee Challenge
              </h3>
              <p className="text-muted-foreground">
                Pemenang kompetisi inovasi untuk praktik kopi berkelanjutan di Asia Tenggara
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 hero-gradient text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="font-display font-bold text-4xl md:text-5xl mb-6">
            Mari Bergabung dalam Perjalanan Ini
          </h2>
          <p className="text-xl mb-8 text-primary-foreground/90">
            Setiap cangkir kopi Geoda adalah langkah menuju masa depan yang lebih berkelanjutan 
            untuk petani dan pecinta kopi di seluruh dunia
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="gold" size="lg" asChild>
              <Link to="/shop">Coba Kopi Kami</Link>
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

export default About;