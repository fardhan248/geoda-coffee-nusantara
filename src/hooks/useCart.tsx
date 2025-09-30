import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

export const useCart = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [cartCount, setCartCount] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      fetchCartCount();
    } else {
      setCartCount(0);
    }
  }, [user]);

  const fetchCartCount = async () => {
    if (!user) return;

    try {
      const { data: cart } = await supabase
        .from('carts')
        .select('id')
        .eq('user_id', user.id)
        .single();

      if (cart) {
        const { data: items } = await supabase
          .from('cart_items')
          .select('quantity')
          .eq('cart_id', cart.id);

        const total = items?.reduce((sum, item) => sum + item.quantity, 0) || 0;
        setCartCount(total);
      }
    } catch (error) {
      console.error('Error fetching cart count:', error);
    }
  };

  const addToCart = async (productId: string) => {
    if (!user) {
      toast({
        title: "Login Diperlukan",
        description: "Silakan login terlebih dahulu untuk menambahkan produk ke keranjang.",
        variant: "destructive",
      });
      return false;
    }

    setLoading(true);
    try {
      // Get or create cart
      let { data: cart } = await supabase
        .from('carts')
        .select('id')
        .eq('user_id', user.id)
        .single();

      if (!cart) {
        const { data: newCart, error: cartError } = await supabase
          .from('carts')
          .insert({ user_id: user.id })
          .select()
          .single();

        if (cartError) throw cartError;
        cart = newCart;
      }

      // Check if item already exists in cart
      const { data: existingItem } = await supabase
        .from('cart_items')
        .select('id, quantity')
        .eq('cart_id', cart.id)
        .eq('product_id', productId)
        .single();

      if (existingItem) {
        // Update quantity
        const { error: updateError } = await supabase
          .from('cart_items')
          .update({ quantity: existingItem.quantity + 1 })
          .eq('id', existingItem.id);

        if (updateError) throw updateError;
      } else {
        // Insert new item
        const { error: insertError } = await supabase
          .from('cart_items')
          .insert({
            cart_id: cart.id,
            product_id: productId,
            quantity: 1
          });

        if (insertError) throw insertError;
      }

      await fetchCartCount();
      toast({
        title: "Berhasil",
        description: "Produk berhasil ditambahkan ke keranjang.",
      });
      return true;
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast({
        title: "Error",
        description: "Gagal menambahkan produk ke keranjang.",
        variant: "destructive",
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    cartCount,
    addToCart,
    loading,
    refreshCartCount: fetchCartCount
  };
};
