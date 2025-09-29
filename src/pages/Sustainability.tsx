import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Leaf, Recycle, Users, Award, TreePine, Droplets } from 'lucide-react';
import { Link } from 'react-router-dom';

const Sustainability = () => {
  const initiatives = [
    {
      icon: TreePine,
      title: 'Reforestation Program',
      description: 'Program penanaman kembali hutan di area sekitar kebun kopi untuk menjaga ekosistem dan keanekaragaman hayati.',
      impact: '5,000 pohon ditanam',
      period: '2023-2024'
    },
    {
      icon: Droplets,
      title: 'Water Conservation',
      description: 'Sistem pengolahan air limbah dari proses wet hulling untuk mengurangi dampak terhadap sumber air.',
      impact: '70% pengurangan limbah air',
      period: '2023-2024'
    },
    {
      icon: Users,
      title: 'Community Development',
      description: 'Program pemberdayaan masyarakat petani melalui pelatihan dan pembentukan koperasi.',
      impact: '150+ keluarga petani',
      period: 'Ongoing'
    },
    {
      icon: Leaf,
      title: 'Organic Farming',
      description: 'Mendorong petani mitra untuk menggunakan pupuk organik dan mengurangi penggunaan pestisida kimia.',
      impact: '80% petani beralih organik',
      period: '2022-2024'
    }
  ];

  const packaging = [
    {
      material: 'Kraft Paper Bag',
      description: 'Kemasan utama menggunakan kertas kraft yang dapat didaur ulang dan mudah terurai',
      recyclable: true,
      biodegradable: true
    },
    {
      material: 'Valve Degassing',
      description: 'Katup degassing tanpa aluminium untuk menjaga kesegaran tanpa bahan berbahaya',
      recyclable: true,
      biodegradable: false
    },
    {
      material: 'Natural Ink',
      description: 'Tinta berbasis nabati untuk printing label dan desain kemasan',
      recyclable: true,
      biodegradable: true
    },
    {
      material: 'Minimalist Design',
      description: 'Desain sederhana untuk mengurangi penggunaan tinta dan material berlebih',
      recyclable: true,
      biodegradable: false
    }
  ];

  const certifications = [
    {
      name: 'Rainforest Alliance',
      description: 'Sertifikasi untuk praktik pertanian berkelanjutan yang melindungi hutan dan kesejahteraan petani',
      year: '2022'
    },
    {
      name: 'Organic Indonesia',
      description: 'Sertifikasi organik dari lembaga sertifikasi Indonesia untuk produk kopi organik',
      year: '2023'
    },
    {
      name: 'Fair Trade Certified',
      description: 'Jaminan perdagangan yang adil dan pemberdayaan ekonomi petani kecil',
      year: '2021'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-accent to-accent-light text-accent-foreground py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display font-bold text-4xl md:text-6xl mb-6">
            Sustainability
          </h1>
          <p className="text-xl md:text-2xl text-accent-foreground/90 max-w-3xl mx-auto leading-relaxed">
            Komitmen kami terhadap lingkungan, petani, dan masa depan kopi Indonesia yang berkelanjutan
          </p>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display font-bold text-4xl md:text-5xl text-foreground mb-8">
            Masa Depan yang Berkelanjutan
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed mb-8">
            Di Geoda Coffee, sustainability bukan hanya buzzword, tetapi komitmen nyata yang kami wujudkan 
            dalam setiap aspek bisnis. Dari cara kami bekerja dengan petani hingga kemasan yang sampai 
            ke tangan Anda, setiap keputusan dibuat dengan mempertimbangkan dampak terhadap lingkungan 
            dan masyarakat.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">100%</div>
              <p className="text-muted-foreground">Kemasan Ramah Lingkungan</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">150+</div>
              <p className="text-muted-foreground">Keluarga Petani Bermitra</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">5,000</div>
              <p className="text-muted-foreground">Pohon Ditanam</p>
            </div>
          </div>
        </div>
      </section>

      {/* Environmental Initiatives */}
      <section className="py-20 warm-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display font-bold text-4xl md:text-5xl text-foreground mb-4">
              Inisiatif Lingkungan
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Program-program konkret untuk menjaga kelestarian lingkungan dan ekosistem kopi
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {initiatives.map((initiative, index) => {
              const Icon = initiative.icon;
              return (
                <Card key={index} className="p-6 shadow-warm hover:shadow-coffee transition-spring">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
                      <Icon className="h-6 w-6 text-accent-foreground" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-display font-semibold text-xl text-foreground">
                          {initiative.title}
                        </h3>
                        <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                          {initiative.period}
                        </span>
                      </div>
                      <p className="text-muted-foreground mb-3 leading-relaxed">
                        {initiative.description}
                      </p>
                      <div className="bg-accent/10 rounded-lg p-3">
                        <p className="font-semibold text-accent text-sm">
                          Impact: {initiative.impact}
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Eco-Friendly Packaging */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display font-bold text-4xl md:text-5xl text-foreground mb-4">
              Kemasan Ramah Lingkungan
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Setiap elemen kemasan dirancang untuk mengurangi dampak lingkungan
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {packaging.map((pack, index) => (
              <Card key={index} className="p-6 shadow-warm">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-display font-semibold text-lg text-foreground">
                    {pack.material}
                  </h3>
                  <div className="flex gap-2">
                    {pack.recyclable && (
                      <div className="flex items-center space-x-1 bg-accent/10 px-2 py-1 rounded text-xs">
                        <Recycle className="h-3 w-3 text-accent" />
                        <span className="text-accent">Recyclable</span>
                      </div>
                    )}
                    {pack.biodegradable && (
                      <div className="flex items-center space-x-1 bg-primary/10 px-2 py-1 rounded text-xs">
                        <Leaf className="h-3 w-3 text-primary" />
                        <span className="text-primary">Biodegradable</span>
                      </div>
                    )}
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {pack.description}
                </p>
              </Card>
            ))}
          </div>

          {/* Recycling Guide */}
          <Card className="p-8 bg-accent/5 border-accent/20">
            <h3 className="font-display font-bold text-2xl text-foreground mb-4 text-center">
              Panduan Daur Ulang Kemasan
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">1️⃣</span>
                </div>
                <h4 className="font-semibold text-foreground mb-2">Kosongkan Kemasan</h4>
                <p className="text-sm text-muted-foreground">
                  Pastikan kemasan benar-benar kosong dari sisa kopi
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">2️⃣</span>
                </div>
                <h4 className="font-semibold text-foreground mb-2">Pisahkan Material</h4>
                <p className="text-sm text-muted-foreground">
                  Pisahkan valve dari kemasan kertas untuk recycle yang optimal
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">3️⃣</span>
                </div>
                <h4 className="font-semibold text-foreground mb-2">Buang ke Tempat Sampah</h4>
                <p className="text-sm text-muted-foreground">
                  Masukkan ke tempat sampah kertas untuk proses daur ulang
                </p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display font-bold text-4xl md:text-5xl text-foreground mb-4">
              Sertifikasi & Pengakuan
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Komitmen kami diakui oleh lembaga internasional
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {certifications.map((cert, index) => (
              <Card key={index} className="p-6 text-center shadow-warm">
                <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-gold-foreground" />
                </div>
                <h3 className="font-display font-semibold text-xl text-foreground mb-2">
                  {cert.name}
                </h3>
                <p className="text-sm text-primary font-medium mb-3">
                  Certified since {cert.year}
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {cert.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="font-display font-bold text-4xl md:text-5xl mb-6">
            Bergabunglah dalam Gerakan Ini
          </h2>
          <p className="text-xl mb-8 text-primary-foreground/90">
            Setiap cangkir kopi yang Anda beli adalah kontribusi nyata untuk masa depan 
            yang lebih berkelanjutan bagi petani dan lingkungan Indonesia
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="gold" size="lg" asChild>
              <Link to="/shop">Dukung Sustainability</Link>
            </Button>
            <Button variant="outline" size="lg" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10" asChild>
              <Link to="/contact">Pelajari Lebih Lanjut</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Sustainability;