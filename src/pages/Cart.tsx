import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

interface CartItem {
  id: string;
  quantity: number;
  product: {
    id: string;
    name: string;
    price: number;
    image_url: string | null;
    roast_type: string | null;
    stock_quantity: number;
  };
}

const Cart = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchCartItems();
    } else {
      navigate('/auth');
    }
  }, [user, navigate]);

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
            product:products (
              id,
              name,
              price,
              image_url,
              roast_type,
              stock_quantity
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
    return cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);
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
                        {item.product.roast_type && (
                          <p className="text-sm text-muted-foreground">
                            {item.product.roast_type} Roast
                          </p>
                        )}
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
                          {formatPrice(item.product.price * item.quantity)}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {formatPrice(item.product.price)} / item
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
                onClick={() => {
                  toast({
                    title: "Fitur Segera Hadir",
                    description: "Checkout akan segera tersedia.",
                  });
                }}
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
    </div>
  );
};

export default Cart;
