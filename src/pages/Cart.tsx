import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Trash2, Plus, Minus, ShoppingBag, CreditCard, Wallet, Banknote, AlertCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

interface CartItem {
  id: string;
  quantity: number;
  variant_id: string | null;
  product: {
    id: string;
    name: string;
    price: number;
    image_url: string | null;
    roast_type: string | null;
    stock_quantity: number;
  };
  variant?: {
    id: string;
    weight: number;
    price_variant: number;
  } | null;
}

const Cart = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [checkoutDialogOpen, setCheckoutDialogOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<string>('');
  const [processingCheckout, setProcessingCheckout] = useState(false);
  const [userProfile, setUserProfile] = useState<{
    phone_number: string | null;
    address: string | null;
  } | null>(null);

  useEffect(() => {
    if (user) {
      fetchCartItems();
      fetchUserProfile();
    } else {
      navigate('/auth');
    }
  }, [user, navigate]);

  const fetchUserProfile = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('phone_number, address')
        .eq('user_id', user.id)
        .maybeSingle();

      if (error) throw error;
      setUserProfile(data);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const fetchCartItems = async () => {
    if (!user) return;

    try {
      const { data: cart } = await supabase
        .from('carts')
        .select('id')
        .eq('user_id', user.id)
        .single();

      if (cart) {
        const { data: items, error } = await supabase
          .from('cart_items')
          .select(`
            id,
            quantity,
            variant_id,
            product:products (
              id,
              name,
              price,
              image_url,
              roast_type,
              stock_quantity
            ),
            variant:product_variants (
              id,
              weight,
              price_variant
            )
          `)
          .eq('cart_id', cart.id);

        if (error) throw error;
        setCartItems(items as any || []);
      }
    } catch (error) {
      console.error('Error fetching cart items:', error);
      toast({
        title: "Error",
        description: "Gagal memuat keranjang belanja.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return;

    try {
      const { error } = await supabase
        .from('cart_items')
        .update({ quantity: newQuantity })
        .eq('id', itemId);

      if (error) throw error;

      setCartItems(cartItems.map(item =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      ));

      toast({
        title: "Berhasil",
        description: "Jumlah produk diperbarui.",
      });
    } catch (error) {
      console.error('Error updating quantity:', error);
      toast({
        title: "Error",
        description: "Gagal memperbarui jumlah produk.",
        variant: "destructive",
      });
    }
  };

  const removeItem = async (itemId: string) => {
    try {
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('id', itemId);

      if (error) throw error;

      setCartItems(cartItems.filter(item => item.id !== itemId));

      toast({
        title: "Berhasil",
        description: "Produk dihapus dari keranjang.",
      });
    } catch (error) {
      console.error('Error removing item:', error);
      toast({
        title: "Error",
        description: "Gagal menghapus produk dari keranjang.",
        variant: "destructive",
      });
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const price = item.variant ? item.variant.price_variant : item.product.price;
      return total + (price * item.quantity);
    }, 0);
  };

  const getItemPrice = (item: CartItem) => {
    return item.variant ? item.variant.price_variant : item.product.price;
  };

  const handleCheckoutClick = () => {
    // Check if user has phone number and address
    if (!userProfile?.phone_number || !userProfile?.address) {
      toast({
        title: "Profil Belum Lengkap",
        description: "Silakan lengkapi nomor telepon dan alamat di halaman profil terlebih dahulu.",
        variant: "destructive",
        action: (
          <Button variant="outline" size="sm" onClick={() => navigate('/profile')}>
            Ke Profil
          </Button>
        ),
      });
      return;
    }
    setCheckoutDialogOpen(true);
  };

  const handleConfirmCheckout = async () => {
    if (!paymentMethod) {
      toast({
        title: "Pilih Metode Pembayaran",
        description: "Silakan pilih metode pembayaran terlebih dahulu.",
        variant: "destructive",
      });
      return;
    }

    setProcessingCheckout(true);
    try {
      // Create order
      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: user?.id,
          total_price: calculateTotal(),
          payment_method: paymentMethod,
          shipping_address: userProfile?.address,
          status: 'pending'
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // Create order items
      const orderItems = cartItems.map(item => ({
        order_id: orderData.id,
        product_id: item.product.id,
        quantity: item.quantity,
        price_at_purchase: getItemPrice(item)
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) throw itemsError;

      // Get cart to delete items
      const { data: cart } = await supabase
        .from('carts')
        .select('id')
        .eq('user_id', user?.id)
        .single();

      if (cart) {
        // Delete cart items
        await supabase
          .from('cart_items')
          .delete()
          .eq('cart_id', cart.id);
      }

      toast({
        title: "Pesanan Berhasil Dibuat",
        description: "Terima kasih atas pesanan Anda! Kami akan segera memprosesnya.",
      });

      setCheckoutDialogOpen(false);
      setPaymentMethod('');
      navigate('/profile');
    } catch (error) {
      console.error('Error creating order:', error);
      toast({
        title: "Error",
        description: "Gagal membuat pesanan. Silakan coba lagi.",
        variant: "destructive",
      });
    } finally {
      setProcessingCheckout(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Memuat keranjang...</p>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <ShoppingBag className="h-24 w-24 text-muted-foreground mx-auto mb-6" />
            <h2 className="font-display text-3xl font-bold mb-4">Keranjang Kosong</h2>
            <p className="text-muted-foreground mb-8">Belum ada produk di keranjang Anda.</p>
            <Button onClick={() => navigate('/shop')} variant="hero">
              Belanja Sekarang
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <section className="hero-gradient text-primary-foreground py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-display font-bold text-4xl md:text-5xl">
            Keranjang Belanja
          </h1>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <Card key={item.id} className="p-4 shadow-warm">
                <div className="flex gap-4">
                  <div className="w-24 h-24 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                    {item.product.image_url ? (
                      <img
                        src={item.product.image_url}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center">
                        <span className="text-primary text-2xl font-display">G</span>
                      </div>
                    )}
                  </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-display font-semibold text-lg">
                            {item.product.name}
                          </h3>
                          <div className="flex gap-2 items-center">
                            {item.product.roast_type && (
                              <p className="text-sm text-muted-foreground">
                                {item.product.roast_type} Roast
                              </p>
                            )}
                            {item.variant && (
                              <>
                                {item.product.roast_type && <span className="text-sm text-muted-foreground">•</span>}
                                <p className="text-sm text-muted-foreground">
                                  {item.variant.weight}g
                                </p>
                              </>
                            )}
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeItem(item.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-12 text-center font-semibold">
                          {item.quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          disabled={item.quantity >= item.product.stock_quantity}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg text-primary">
                          {formatPrice(getItemPrice(item) * item.quantity)}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {formatPrice(getItemPrice(item))} / item
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="p-6 shadow-coffee sticky top-24">
              <h2 className="font-display font-bold text-2xl mb-6">
                Ringkasan Pesanan
              </h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal ({cartItems.length} item)</span>
                  <span>{formatPrice(calculateTotal())}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Ongkos Kirim</span>
                  <span>Dihitung saat checkout</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between items-center">
                    <span className="font-display font-bold text-xl">Total</span>
                    <span className="font-bold text-2xl text-primary">
                      {formatPrice(calculateTotal())}
                    </span>
                  </div>
                </div>
              </div>

              <Button
                className="w-full"
                size="lg"
                variant="hero"
                onClick={handleCheckoutClick}
              >
                Lanjut ke Checkout
              </Button>

              <Button
                className="w-full mt-3"
                variant="outline"
                onClick={() => navigate('/shop')}
              >
                Lanjut Belanja
              </Button>
            </Card>
          </div>
        </div>
      </div>

      {/* Checkout Dialog */}
      <Dialog open={checkoutDialogOpen} onOpenChange={setCheckoutDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl">Checkout</DialogTitle>
            <DialogDescription>
              Pilih metode pembayaran untuk menyelesaikan pesanan Anda.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Profile Info */}
            <Card className="p-4 bg-muted/50">
              <h3 className="font-semibold mb-3 text-sm">Informasi Pengiriman</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Nama:</span>
                  <span className="font-medium">{user?.email?.split('@')[0]}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Telepon:</span>
                  <span className="font-medium">{userProfile?.phone_number}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-muted-foreground">Alamat:</span>
                  <span className="font-medium text-right">{userProfile?.address}</span>
                </div>
              </div>
            </Card>

            {/* Order Summary */}
            <div className="space-y-2">
              <h3 className="font-semibold text-sm">Ringkasan Pesanan</h3>
              <div className="space-y-1 text-sm">
                {cartItems.map(item => (
                  <div key={item.id} className="flex justify-between text-muted-foreground">
                    <span>
                      {item.product.name}
                      {item.variant && ` (${item.variant.weight}g)`} x {item.quantity}
                    </span>
                    <span>{formatPrice(getItemPrice(item) * item.quantity)}</span>
                  </div>
                ))}
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between font-bold text-base">
                    <span>Total</span>
                    <span className="text-primary">{formatPrice(calculateTotal())}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="space-y-3">
              <h3 className="font-semibold text-sm">Metode Pembayaran</h3>
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                <div className="space-y-2">
                  <div className="flex items-center space-x-3 border rounded-lg p-3 hover:bg-muted/50 cursor-pointer">
                    <RadioGroupItem value="bank_transfer" id="bank_transfer" />
                    <Label htmlFor="bank_transfer" className="flex items-center gap-2 cursor-pointer flex-1">
                      <CreditCard className="h-5 w-5 text-primary" />
                      <div className="flex-1">
                        <div className="font-medium">Transfer Bank</div>
                        <div className="text-xs text-muted-foreground">BCA, BNI, Mandiri</div>
                      </div>
                    </Label>
                  </div>

                  <div className="flex items-center space-x-3 border rounded-lg p-3 hover:bg-muted/50 cursor-pointer">
                    <RadioGroupItem value="e_wallet" id="e_wallet" />
                    <Label htmlFor="e_wallet" className="flex items-center gap-2 cursor-pointer flex-1">
                      <Wallet className="h-5 w-5 text-primary" />
                      <div className="flex-1">
                        <div className="font-medium">E-Wallet</div>
                        <div className="text-xs text-muted-foreground">GoPay, OVO, Dana</div>
                      </div>
                    </Label>
                  </div>

                  <div className="flex items-center space-x-3 border rounded-lg p-3 hover:bg-muted/50 cursor-pointer">
                    <RadioGroupItem value="cod" id="cod" />
                    <Label htmlFor="cod" className="flex items-center gap-2 cursor-pointer flex-1">
                      <Banknote className="h-5 w-5 text-primary" />
                      <div className="flex-1">
                        <div className="font-medium">Cash on Delivery</div>
                        <div className="text-xs text-muted-foreground">Bayar saat barang diterima</div>
                      </div>
                    </Label>
                  </div>
                </div>
              </RadioGroup>
            </div>

            {/* Warning if no payment selected */}
            {!paymentMethod && (
              <Alert variant="default">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Silakan pilih metode pembayaran untuk melanjutkan.
                </AlertDescription>
              </Alert>
            )}
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              variant="outline"
              onClick={() => {
                setCheckoutDialogOpen(false);
                setPaymentMethod('');
              }}
              disabled={processingCheckout}
            >
              Batal
            </Button>
            <Button
              variant="hero"
              onClick={handleConfirmCheckout}
              disabled={!paymentMethod || processingCheckout}
            >
              {processingCheckout ? 'Memproses...' : 'Konfirmasi Pesanan'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Cart;
