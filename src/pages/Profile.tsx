import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Mail, Phone, MapPin, LogOut, Package } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';

const profileSchema = z.object({
  full_name: z.string().trim().min(2, { message: "Nama minimal 2 karakter" }).max(100, { message: "Nama terlalu panjang" }),
  phone_number: z.string().trim().max(20, { message: "Nomor telepon terlalu panjang" }).optional().or(z.literal("")),
  address: z.string().trim().max(500, { message: "Alamat terlalu panjang" }).optional().or(z.literal(""))
});

interface UserProfile {
  id: string;
  user_id: string;
  full_name: string | null;
  phone_number: string | null;
  address: string | null;
  profile_picture_url: string | null;
}

interface Order {
  id: string;
  total_price: number;
  status: string;
  payment_method: string;
  created_at: string;
  order_items: {
    quantity: number;
    price_at_purchase: number;
    product: {
      name: string;
    };
  }[];
}

const Profile = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [orders, setOrders] = useState<Order[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [formData, setFormData] = useState({
    full_name: '',
    phone_number: '',
    address: ''
  });
  
  const { user, signOut, loading: authLoading } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user) {
      fetchProfile();
      fetchOrders();
    }
  }, [user]);

  const fetchOrders = async () => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          id,
          total_price,
          status,
          payment_method,
          created_at,
          order_items (
            quantity,
            price_at_purchase,
            product:products (
              name
            )
          )
        `)
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setOrders(data as any || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setOrdersLoading(false);
    }
  };

  const fetchProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', user?.id)
        .maybeSingle();

      if (error) throw error;

      if (data) {
        setProfile(data);
        setFormData({
          full_name: data.full_name || '',
          phone_number: data.phone_number || '',
          address: data.address || ''
        });
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      toast({
        title: "Error",
        description: "Gagal memuat profil. Silakan coba lagi.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    try {
      profileSchema.parse(formData);
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
    
    setSaving(true);
    try {
      const { error } = await supabase
        .from('user_profiles')
        .update({
          full_name: formData.full_name || null,
          phone_number: formData.phone_number || null,
          address: formData.address || null
        })
        .eq('user_id', user?.id);

      if (error) throw error;

      toast({
        title: "Berhasil",
        description: "Profil berhasil diperbarui!",
      });
      
      fetchProfile();
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: "Error",
        description: "Gagal memperbarui profil. Silakan coba lagi.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { label: string; className: string }> = {
      pending: { label: 'Menunggu', className: 'bg-yellow-100 text-yellow-800' },
      processing: { label: 'Diproses', className: 'bg-blue-100 text-blue-800' },
      shipped: { label: 'Dikirim', className: 'bg-purple-100 text-purple-800' },
      delivered: { label: 'Diterima', className: 'bg-green-100 text-green-800' },
      cancelled: { label: 'Dibatalkan', className: 'bg-red-100 text-red-800' },
    };

    const config = statusConfig[status] || statusConfig.pending;
    return (
      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${config.className}`}>
        {config.label}
      </span>
    );
  };

  const getPaymentMethodLabel = (method: string) => {
    const labels: Record<string, string> = {
      bank_transfer: 'Transfer Bank',
      e_wallet: 'E-Wallet',
      cod: 'Cash on Delivery',
    };
    return labels[method] || method;
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Memuat profil...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="font-display font-bold text-3xl text-foreground mb-2">
            Profil Saya
          </h1>
          <p className="text-muted-foreground">
            Kelola informasi akun dan preferensi Anda
          </p>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList>
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Profil
            </TabsTrigger>
            <TabsTrigger value="orders" className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              Pesanan
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Informasi Profil</CardTitle>
                  <CardDescription>
                    Perbarui informasi pribadi Anda
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                        <Input
                          id="email"
                          type="email"
                          value={user?.email || ''}
                          disabled
                          className="pl-10 bg-muted"
                        />
                      </div>
                      <p className="text-sm text-muted-foreground">Email tidak dapat diubah</p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="full_name">Nama Lengkap</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                        <Input
                          id="full_name"
                          type="text"
                          placeholder="Nama Lengkap"
                          value={formData.full_name}
                          onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                          className={`pl-10 ${errors.full_name ? 'border-destructive' : ''}`}
                          disabled={saving}
                        />
                      </div>
                      {errors.full_name && <p className="text-sm text-destructive">{errors.full_name}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone_number">Nomor Telepon</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                        <Input
                          id="phone_number"
                          type="tel"
                          placeholder="08123456789"
                          value={formData.phone_number}
                          onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
                          className={`pl-10 ${errors.phone_number ? 'border-destructive' : ''}`}
                          disabled={saving}
                        />
                      </div>
                      {errors.phone_number && <p className="text-sm text-destructive">{errors.phone_number}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address">Alamat</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 text-muted-foreground h-4 w-4" />
                        <textarea
                          id="address"
                          placeholder="Alamat lengkap untuk pengiriman"
                          value={formData.address}
                          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                          className={`w-full min-h-[80px] px-3 py-2 pl-10 border rounded-md text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 resize-none ${errors.address ? 'border-destructive' : 'border-input'} ${saving ? 'opacity-50 cursor-not-allowed' : ''}`}
                          disabled={saving}
                        />
                      </div>
                      {errors.address && <p className="text-sm text-destructive">{errors.address}</p>}
                    </div>

                    <Button type="submit" disabled={saving} variant="hero">
                      {saving ? 'Menyimpan...' : 'Simpan Perubahan'}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Akun</CardTitle>
                  <CardDescription>
                    Pengaturan akun
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center mx-auto mb-4">
                      <User className="h-10 w-10 text-primary-foreground" />
                    </div>
                    <h3 className="font-semibold">{profile?.full_name || 'Pengguna'}</h3>
                    <p className="text-sm text-muted-foreground">{user?.email}</p>
                  </div>

                  <Button 
                    onClick={handleSignOut} 
                    variant="outline" 
                    className="w-full"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Keluar
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>Riwayat Pesanan</CardTitle>
                <CardDescription>
                  Lihat semua pesanan Anda
                </CardDescription>
              </CardHeader>
              <CardContent>
                {ordersLoading ? (
                  <div className="text-center py-12">
                    <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-muted-foreground">Memuat pesanan...</p>
                  </div>
                ) : orders.length === 0 ? (
                  <div className="text-center py-12">
                    <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Belum ada pesanan</h3>
                    <p className="text-muted-foreground mb-4">
                      Anda belum memiliki riwayat pesanan. Mulai berbelanja sekarang!
                    </p>
                    <Button variant="hero" onClick={() => navigate('/shop')}>
                      Mulai Belanja
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <Card key={order.id} className="p-4">
                        <div className="space-y-3">
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-semibold">Pesanan #{order.id.slice(0, 8)}</h3>
                                {getStatusBadge(order.status)}
                              </div>
                              <p className="text-sm text-muted-foreground">
                                {formatDate(order.created_at)}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm text-muted-foreground mb-1">Total</p>
                              <p className="font-bold text-lg text-primary">
                                {formatPrice(order.total_price)}
                              </p>
                            </div>
                          </div>

                          <div className="border-t pt-3">
                            <p className="text-sm text-muted-foreground mb-2">Produk:</p>
                            <div className="space-y-1">
                              {order.order_items.map((item, idx) => (
                                <div key={idx} className="flex justify-between text-sm">
                                  <span>{item.product.name} x {item.quantity}</span>
                                  <span className="text-muted-foreground">
                                    {formatPrice(item.price_at_purchase * item.quantity)}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="border-t pt-3">
                            <p className="text-sm">
                              <span className="text-muted-foreground">Metode Pembayaran: </span>
                              <span className="font-medium">
                                {getPaymentMethodLabel(order.payment_method)}
                              </span>
                            </p>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;