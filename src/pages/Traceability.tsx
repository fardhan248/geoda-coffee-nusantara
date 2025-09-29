import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Thermometer, Droplets, Users, Calendar } from 'lucide-react';
import coffeeFarming from '@/assets/coffee-farming.jpg';

const Traceability = () => {
  const regions = [
    {
      name: 'Aceh Gayo',
      location: 'Dataran Tinggi Gayo, Aceh',
      altitude: '1.200 - 1.600 mdpl',
      variety: 'Arabica Gayo',
      process: 'Semi Washed',
      harvestSeason: 'Oktober - Desember',
      farmers: 45,
      characteristics: ['Citrus', 'Floral', 'Full Body'],
      description: 'Kopi dari dataran tinggi Gayo terkenal dengan keasaman yang cerah dan aroma floral yang khas.'
    },
    {
      name: 'Toraja',
      location: 'Tana Toraja, Sulawesi Selatan',
      altitude: '1.400 - 1.800 mdpl',
      variety: 'Arabica Toraja',
      process: 'Wet Hulled',
      harvestSeason: 'Juni - September',
      farmers: 32,
      characteristics: ['Earthy', 'Herbal', 'Low Acidity'],
      description: 'Kopi Toraja memiliki karakteristik earthy yang unik dengan body yang kompleks dan after taste yang panjang.'
    },
    {
      name: 'Java Preanger',
      location: 'Bandung, Jawa Barat',
      altitude: '1.000 - 1.400 mdpl',
      variety: 'Arabica Java',
      process: 'Natural',
      harvestSeason: 'Mei - Agustus',
      farmers: 28,
      characteristics: ['Chocolate', 'Nutty', 'Medium Body'],
      description: 'Kopi Java Preanger menghadirkan rasa cokelat dan kacang yang balance dengan sweetness alami.'
    }
  ];

  const processSteps = [
    {
      step: 1,
      title: 'Pemilihan Biji',
      description: 'Petani mitra memilih cherry kopi yang sudah matang sempurna dengan standar kualitas tertinggi',
      icon: '🍒'
    },
    {
      step: 2,
      title: 'Proses Fermentasi',
      description: 'Fermentasi dikontrol dengan ketat untuk mengembangkan profil rasa yang optimal',
      icon: '⚗️'
    },
    {
      step: 3,
      title: 'Pengeringan',
      description: 'Pengeringan dilakukan dengan metode yang sesuai dengan karakteristik setiap daerah',
      icon: '☀️'
    },
    {
      step: 4,
      title: 'Sortasi Kualitas',
      description: 'Tim quality control melakukan sortasi untuk memastikan hanya biji berkualitas terbaik yang lolos',
      icon: '🔍'
    },
    {
      step: 5,
      title: 'Roasting',
      description: 'Proses roasting dilakukan dengan profil yang disesuaikan untuk setiap karakteristik regional',
      icon: '🔥'
    },
    {
      step: 6,
      title: 'Quality Assurance',
      description: 'Setiap batch melalui cupping test untuk memastikan konsistensi rasa dan kualitas',
      icon: '☕'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="hero-gradient text-primary-foreground py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display font-bold text-4xl md:text-6xl mb-6">
            Traceability
          </h1>
          <p className="text-xl md:text-2xl text-primary-foreground/90 max-w-3xl mx-auto leading-relaxed">
            Transparansi penuh dari kebun hingga cangkir Anda. Ketahui perjalanan setiap biji kopi 
            yang Anda nikmati
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-display font-bold text-4xl md:text-5xl text-foreground mb-6">
                Transparansi adalah Kunci
              </h2>
              <div className="space-y-4 text-lg text-muted-foreground">
                <p>
                  Di Geoda Coffee, kami percaya bahwa setiap cangkir kopi memiliki cerita yang layak untuk 
                  diketahui. Melalui sistem traceability kami, Anda dapat mengetahui perjalanan lengkap 
                  kopi dari kebun hingga sampai di tangan Anda.
                </p>
                <p>
                  Kami bekerja sama dengan petani mitra di berbagai daerah di Indonesia, memastikan 
                  praktik pertanian yang berkelanjutan dan kualitas yang konsisten.
                </p>
              </div>
            </div>
            <div>
              <img 
                src={coffeeFarming}
                alt="Proses pemilihan biji kopi berkualitas tinggi"
                className="rounded-2xl shadow-coffee w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Coffee Origins */}
      <section className="py-20 warm-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display font-bold text-4xl md:text-5xl text-foreground mb-4">
              Asal Kopi Kami
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Mengenal lebih dekat daerah-daerah penghasil kopi premium Indonesia yang bermitra dengan kami
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {regions.map((region, index) => (
              <Card key={index} className="p-6 shadow-warm hover:shadow-coffee transition-spring">
                <div className="mb-4">
                  <h3 className="font-display font-bold text-2xl text-foreground mb-2">
                    {region.name}
                  </h3>
                  <div className="flex items-center text-muted-foreground mb-2">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span className="text-sm">{region.location}</span>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Ketinggian:</span>
                    <span className="text-sm font-medium">{region.altitude}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Varietas:</span>
                    <span className="text-sm font-medium">{region.variety}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Proses:</span>
                    <span className="text-sm font-medium">{region.process}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Panen:</span>
                    <span className="text-sm font-medium">{region.harvestSeason}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Petani Mitra:</span>
                    <span className="text-sm font-medium">{region.farmers} petani</span>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold text-foreground mb-2">Karakteristik Rasa:</h4>
                  <div className="flex flex-wrap gap-2">
                    {region.characteristics.map((char, i) => (
                      <Badge key={i} variant="secondary" className="text-xs">
                        {char}
                      </Badge>
                    ))}
                  </div>
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed">
                  {region.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display font-bold text-4xl md:text-5xl text-foreground mb-4">
              Proses dari Kebun ke Cangkir
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Setiap langkah dikontrol dengan ketat untuk memastikan kualitas terbaik
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {processSteps.map((process, index) => (
              <Card key={index} className="p-6 shadow-warm hover:shadow-coffee transition-spring">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 hero-gradient rounded-full flex items-center justify-center mr-4">
                    <span className="text-primary-foreground font-bold">{process.step}</span>
                  </div>
                  <div>
                    <span className="text-2xl mr-2">{process.icon}</span>
                    <h3 className="font-display font-semibold text-lg text-foreground">
                      {process.title}
                    </h3>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {process.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Climate & Quality Control */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display font-bold text-4xl md:text-5xl text-foreground mb-4">
              Peran Cuaca dalam Kualitas
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Bekerjasama dengan ahli cuaca untuk memastikan kondisi optimal dalam setiap tahap produksi
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-6 text-center shadow-warm">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <Thermometer className="h-8 w-8 text-accent-foreground" />
              </div>
              <h3 className="font-display font-semibold text-xl text-foreground mb-3">
                Monitoring Suhu
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Pemantauan suhu harian di setiap lokasi kebun untuk menentukan waktu panen yang optimal 
                dan memastikan kematangan cherry yang sempurna.
              </p>
            </Card>

            <Card className="p-6 text-center shadow-warm">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Droplets className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="font-display font-semibold text-xl text-foreground mb-3">
                Kontrol Kelembaban
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Sistem monitoring kelembaban untuk mengoptimalkan proses fermentasi dan pengeringan, 
                memastikan profil rasa yang konsisten.
              </p>
            </Card>

            <Card className="p-6 text-center shadow-warm">
              <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-8 w-8 text-gold-foreground" />
              </div>
              <h3 className="font-display font-semibold text-xl text-foreground mb-3">
                Prediksi Cuaca
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Analisis prediksi cuaca jangka panjang untuk perencanaan panen dan proses pasca panen 
                yang optimal di setiap region.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Farmer Partnership */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display font-bold text-4xl md:text-5xl text-foreground mb-4">
              Kemitraan dengan Petani
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Membangun hubungan jangka panjang yang saling menguntungkan
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="p-6 text-center shadow-warm">
              <div className="text-3xl mb-4">🤝</div>
              <h3 className="font-display font-semibold text-lg text-foreground mb-2">
                Fair Trade
              </h3>
              <p className="text-muted-foreground text-sm">
                Harga yang adil dan transparan untuk setiap kilogram kopi berkualitas
              </p>
            </Card>

            <Card className="p-6 text-center shadow-warm">
              <div className="text-3xl mb-4">🎓</div>
              <h3 className="font-display font-semibold text-lg text-foreground mb-2">
                Pelatihan
              </h3>
              <p className="text-muted-foreground text-sm">
                Program pelatihan berkelanjutan untuk meningkatkan kualitas dan produktivitas
              </p>
            </Card>

            <Card className="p-6 text-center shadow-warm">
              <div className="text-3xl mb-4">🌱</div>
              <h3 className="font-display font-semibold text-lg text-foreground mb-2">
                Sustainability
              </h3>
              <p className="text-muted-foreground text-sm">
                Dukungan untuk praktik pertanian berkelanjutan dan ramah lingkungan
              </p>
            </Card>

            <Card className="p-6 text-center shadow-warm">
              <div className="text-3xl mb-4">📊</div>
              <h3 className="font-display font-semibold text-lg text-foreground mb-2">
                Transparansi
              </h3>
              <p className="text-muted-foreground text-sm">
                Sistem tracing yang memungkinkan konsumen mengetahui asal setiap biji kopi
              </p>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Traceability;