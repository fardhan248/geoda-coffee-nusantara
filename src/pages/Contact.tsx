import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Mail, Phone, MapPin, Clock, MessageCircle, HelpCircle, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';
import { supabase } from '@/integrations/supabase/client';

const contactSchema = z.object({
  name: z.string().trim().min(2, { message: "Nama minimal 2 karakter" }).max(100, { message: "Nama terlalu panjang" }),
  email: z.string().trim().email({ message: "Email tidak valid" }).max(255, { message: "Email terlalu panjang" }),
  subject: z.string().trim().min(5, { message: "Subjek minimal 5 karakter" }).max(200, { message: "Subjek terlalu panjang" }),
  message: z.string().trim().min(10, { message: "Pesan minimal 10 karakter" }).max(1000, { message: "Pesan terlalu panjang" })
});

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const validateForm = () => {
    try {
      contactSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.issues.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('contacts')
        .insert([{
          full_name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message
        }]);

      if (error) throw error;

      toast({
        title: "Pesan Terkirim!",
        description: "Terima kasih! Pesan kamu sudah terkirim. Tim Geoda Coffee akan segera menghubungi kamu.",
      });

      setFormData({ name: '', email: '', subject: '', message: '' });
      setErrors({});
    } catch (error) {
      console.error('Error submitting contact form:', error);
      toast({
        title: "Error",
        description: "Maaf, terjadi kendala saat mengirim pesan. Silakan coba lagi nanti.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      content: 'hello@geodacoffee.id',
      subtitle: 'Untuk pertanyaan umum dan kerjasama'
    },
    {
      icon: Phone,
      title: 'Telepon',
      content: '+62 812 3456 7890',
      subtitle: 'Senin - Jumat, 09:00 - 17:00 WIB'
    },
    {
      icon: MapPin,
      title: 'Alamat',
      content: 'Jl. Kopi Nusantara No. 123',
      subtitle: 'Jakarta Selatan, Indonesia 12345'
    },
    {
      icon: Clock,
      title: 'Jam Operasional',
      content: 'Senin - Jumat: 09:00 - 17:00',
      subtitle: 'Sabtu: 09:00 - 14:00'
    }
  ];

  const faqItems = [
    {
      question: 'Bagaimana cara menyimpan kopi agar tetap segar?',
      answer: 'Simpan kopi dalam wadah kedap udara di tempat yang sejuk, kering, dan terhindar dari cahaya langsung. Hindari menyimpan di kulkas atau freezer.'
    },
    {
      question: 'Berapa lama kopi bisa bertahan setelah dibuka?',
      answer: 'Kopi bubuk bisa bertahan 2-3 minggu setelah dibuka jika disimpan dengan benar. Kopi beans bisa bertahan hingga 1 bulan.'
    },
    {
      question: 'Apakah ada program berlangganan kopi?',
      answer: 'Ya, kami menyediakan program berlangganan dengan pengiriman rutin setiap 2 minggu atau 1 bulan sesuai kebutuhan Anda.'
    },
    {
      question: 'Bagaimana kebijakan pengiriman dan pengembalian?',
      answer: 'Kami menyediakan pengiriman gratis untuk pembelian di atas Rp 200.000. Produk dapat dikembalikan dalam 7 hari jika ada kerusakan saat pengiriman.'
    },
    {
      question: 'Apakah semua kopi Geoda organic?',
      answer: 'Sebagian besar produk kami adalah organic certified. Anda dapat melihat label "Organic" pada kemasan produk yang bersertifikat.'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="hero-gradient text-primary-foreground py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display font-bold text-4xl md:text-6xl mb-6">
            Hubungi Kami
          </h1>
          <p className="text-xl md:text-2xl text-primary-foreground/90 max-w-2xl mx-auto">
            Ada pertanyaan? Kami siap membantu Anda dengan pelayanan terbaik
          </p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="p-8 shadow-warm">
              <h2 className="font-display font-bold text-2xl text-foreground mb-6">
                Kirim Pesan
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Nama Lengkap</Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Masukkan nama lengkap"
                      className={`mt-1 ${errors.name ? 'border-destructive' : ''}`}
                      disabled={isSubmitting}
                    />
                    {errors.name && <p className="text-sm text-destructive mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="nama@email.com"
                      className={`mt-1 ${errors.email ? 'border-destructive' : ''}`}
                      disabled={isSubmitting}
                    />
                    {errors.email && <p className="text-sm text-destructive mt-1">{errors.email}</p>}
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="subject">Subjek</Label>
                  <Input
                    id="subject"
                    name="subject"
                    type="text"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="Subjek pesan"
                    className={`mt-1 ${errors.subject ? 'border-destructive' : ''}`}
                    disabled={isSubmitting}
                  />
                  {errors.subject && <p className="text-sm text-destructive mt-1">{errors.subject}</p>}
                </div>

                <div>
                  <Label htmlFor="message">Pesan</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tulis pesan Anda di sini..."
                    rows={6}
                    className={`mt-1 ${errors.message ? 'border-destructive' : ''}`}
                    disabled={isSubmitting}
                  />
                  {errors.message && <p className="text-sm text-destructive mt-1">{errors.message}</p>}
                </div>

                <Button 
                  type="submit" 
                  variant="hero" 
                  size="lg" 
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2" />
                      Mengirim...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Kirim Pesan
                    </>
                  )}
                </Button>
              </form>
            </Card>

            {/* Contact Information */}
            <div className="space-y-6">
              <h2 className="font-display font-bold text-2xl text-foreground mb-6">
                Informasi Kontak
              </h2>
              
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <Card key={index} className="p-6 shadow-warm">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 hero-gradient rounded-full flex items-center justify-center flex-shrink-0">
                        <Icon className="h-6 w-6 text-primary-foreground" />
                      </div>
                      <div>
                        <h3 className="font-display font-semibold text-lg text-foreground mb-1">
                          {info.title}
                        </h3>
                        <p className="text-primary font-medium mb-1">
                          {info.content}
                        </p>
                        <p className="text-muted-foreground text-sm">
                          {info.subtitle}
                        </p>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 warm-gradient">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display font-bold text-4xl md:text-5xl text-foreground mb-4">
              Pertanyaan yang Sering Diajukan
            </h2>
            <p className="text-xl text-muted-foreground">
              Temukan jawaban untuk pertanyaan umum tentang produk dan layanan kami
            </p>
          </div>

          <div className="space-y-6">
            {faqItems.map((faq, index) => (
              <Card key={index} className="p-6 shadow-warm">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <HelpCircle className="h-4 w-4 text-primary-foreground" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display font-semibold text-lg text-foreground mb-3">
                      {faq.question}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Social Media & Newsletter */}
      <section className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display font-bold text-3xl text-foreground mb-4">
            Tetap Terhubung
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Ikuti media sosial kami untuk update terbaru tentang produk, promo, dan cerita kopi
          </p>
          
          <div className="flex justify-center space-x-6 mb-8">
            <a href="#" className="w-12 h-12 bg-primary rounded-full flex items-center justify-center hover:bg-primary-light transition-smooth">
              <span className="text-primary-foreground font-bold">IG</span>
            </a>
            <a href="#" className="w-12 h-12 bg-primary rounded-full flex items-center justify-center hover:bg-primary-light transition-smooth">
              <span className="text-primary-foreground font-bold">FB</span>
            </a>
            <a href="#" className="w-12 h-12 bg-primary rounded-full flex items-center justify-center hover:bg-primary-light transition-smooth">
              <span className="text-primary-foreground font-bold">TW</span>
            </a>
          </div>

          <Card className="p-6 bg-muted/30 border-muted">
            <h3 className="font-display font-semibold text-xl text-foreground mb-3">
              Newsletter
            </h3>
            <p className="text-muted-foreground mb-4">
              Dapatkan update terbaru tentang produk baru dan promo eksklusif
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input 
                placeholder="Email Anda" 
                type="email"
                className="flex-1"
              />
              <Button variant="hero">
                Berlangganan
              </Button>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Contact;
