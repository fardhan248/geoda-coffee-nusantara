import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Filter, Search, ShoppingCart } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Tables } from '@/integrations/supabase/types';
import { useToast } from '@/hooks/use-toast';
import { useCart } from '@/hooks/useCart';

type Product = Tables<'products'>;

const Shop = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [roastFilter, setRoastFilter] = useState<string>('all');
  const [priceFilter, setPriceFilter] = useState<string>('all');
  const [stockFilter, setStockFilter] = useState<boolean>(false);
  const { toast } = useToast();
  const { addToCart, loading: cartLoading } = useCart();

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [products, searchTerm, roastFilter, priceFilter, stockFilter]);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      setProducts(data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast({
        title: "Error",
        description: "Gagal memuat produk. Silakan coba lagi.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const filterProducts = () => {
    let filtered = products;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Roast type filter
    if (roastFilter !== 'all') {
      filtered = filtered.filter(product => product.roast_type === roastFilter);
    }

    // Price filter
    if (priceFilter !== 'all') {
      switch (priceFilter) {
        case 'under50':
          filtered = filtered.filter(product => product.price < 50000);
          break;
        case '50-100':
          filtered = filtered.filter(product => product.price >= 50000 && product.price <= 100000);
          break;
        case 'over100':
          filtered = filtered.filter(product => product.price > 100000);
          break;
      }
    }

    // Stock filter
    if (stockFilter) {
      filtered = filtered.filter(product => product.stock_quantity && product.stock_quantity > 0);
    }

    setFilteredProducts(filtered);
  };

  const handleAddToCart = async (productId: string) => {
    await addToCart(productId);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getRoastBadgeColor = (roastType: string | null) => {
    switch (roastType) {
      case 'Light':
        return 'bg-yellow-100 text-yellow-800';
      case 'Medium':
        return 'bg-orange-100 text-orange-800';
      case 'Dark':
        return 'bg-gray-800 text-gray-100';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Memuat produk...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="hero-gradient text-primary-foreground py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display font-bold text-4xl md:text-6xl mb-4">
            Koleksi Kopi Premium
          </h1>
          <p className="text-xl md:text-2xl text-primary-foreground/90 max-w-2xl mx-auto">
            Temukan berbagai pilihan kopi Indonesia terbaik dengan kualitas premium
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-muted/30 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Cari kopi..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex gap-4 flex-wrap">
              <Select value={roastFilter} onValueChange={setRoastFilter}>
                <SelectTrigger className="w-40">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Jenis Roast" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Roast</SelectItem>
                  <SelectItem value="Light">Light Roast</SelectItem>
                  <SelectItem value="Medium">Medium Roast</SelectItem>
                  <SelectItem value="Dark">Dark Roast</SelectItem>
                </SelectContent>
              </Select>

              <Select value={priceFilter} onValueChange={setPriceFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Harga" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Harga</SelectItem>
                  <SelectItem value="under50">&lt; Rp 50.000</SelectItem>
                  <SelectItem value="50-100">Rp 50.000 - 100.000</SelectItem>
                  <SelectItem value="over100">&gt; Rp 100.000</SelectItem>
                </SelectContent>
              </Select>

              <Button
                variant={stockFilter ? "default" : "outline"}
                onClick={() => setStockFilter(!stockFilter)}
                className="gap-2"
              >
                <Filter className="h-4 w-4" />
                {stockFilter ? "Ada Stok" : "Semua Stok"}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-muted-foreground mb-4">
                Tidak ada produk yang ditemukan
              </p>
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchTerm('');
                  setRoastFilter('all');
                  setPriceFilter('all');
                }}
              >
                Reset Filter
              </Button>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center mb-8">
                <p className="text-muted-foreground">
                  Menampilkan {filteredProducts.length} produk
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <Card key={product.id} className="group overflow-hidden shadow-warm hover:shadow-coffee transition-spring">
                    <div className="aspect-square bg-muted relative overflow-hidden">
                      {product.image_url ? (
                        <img
                          src={product.image_url}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-spring"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center">
                          <span className="text-primary text-4xl font-display">G</span>
                        </div>
                      )}
                      {product.stock_quantity === 0 && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                          <span className="text-white font-semibold">Stok Habis</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-display font-semibold text-lg text-foreground group-hover:text-primary transition-smooth">
                          {product.name}
                        </h3>
                        {product.roast_type && (
                          <Badge className={getRoastBadgeColor(product.roast_type)}>
                            {product.roast_type}
                          </Badge>
                        )}
                      </div>
                      
                      {product.description && (
                        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                          {product.description}
                        </p>
                      )}
                      
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xl text-primary">
                          {formatPrice(product.price)}
                        </span>
                        <Button 
                          variant="hero" 
                          size="sm"
                          disabled={product.stock_quantity === 0 || cartLoading}
                          onClick={() => handleAddToCart(product.id)}
                        >
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          Tambah
                        </Button>
                      </div>
                      
                      {product.stock_quantity !== null && product.stock_quantity > 0 && (
                        <p className="text-xs text-muted-foreground mt-2">
                          Stok: {product.stock_quantity}
                        </p>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default Shop;