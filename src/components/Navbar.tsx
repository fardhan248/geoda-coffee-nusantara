import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Menu, X, ShoppingCart, User, LogIn, LogOut } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useCart } from '@/hooks/useCart';
import logo from "@/assets/logo_geoda.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { cartCount } = useCart();

  const navigation = [
    { name: 'Beranda', href: '/' },
    { name: 'Produk', href: '/shop' },
    { name: 'Tentang Kami', href: '/about' },
    { name: 'Traceability', href: '/traceability' },
    { name: 'Sustainability', href: '/sustainability' },
    { name: 'Testimoni', href: '/testimonials' },
    { name: 'Kontak', href: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border shadow-warm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center">
              <img src={logo} alt="Logo" className="w-full h-full object-contain"/>
              {/*<span className="text-primary-foreground font-bold text-lg">G</span>*/}
            </div>
            <span className="font-display font-semibold text-xl text-foreground">
              Geoda Coffee
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`px-3 py-2 text-sm font-medium transition-smooth ${
                    isActive(item.href)
                      ? 'text-primary border-b-2 border-primary'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="icon"
              className="relative"
              onClick={() => navigate('/cart')}
            >
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <Badge 
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                  variant="default"
                >
                  {cartCount}
                </Badge>
              )}
            </Button>
            
            {user ? (
              <>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => navigate('/profile')}
                >
                  <User className="h-5 w-5" />
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleSignOut}
                  className="flex items-center gap-2"
                >
                  <LogOut className="h-4 w-4" />
                  Keluar
                </Button>
              </>
            ) : (
              <Button 
                variant="hero" 
                size="sm"
                onClick={() => navigate('/auth')}
                className="flex items-center gap-2"
              >
                <LogIn className="h-4 w-4" />
                Masuk
              </Button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`block px-3 py-2 text-base font-medium transition-smooth ${
                  isActive(item.href)
                    ? 'text-primary bg-primary/5'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="flex items-center space-x-2 px-3 py-4">
              <Button 
                variant="ghost" 
                size="icon"
                className="relative"
                onClick={() => {
                  navigate('/cart');
                  setIsOpen(false);
                }}
              >
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <Badge 
                    className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                    variant="default"
                  >
                    {cartCount}
                  </Badge>
                )}
              </Button>
              
              {user ? (
                <>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => {
                      navigate('/profile');
                      setIsOpen(false);
                    }}
                  >
                    <User className="h-5 w-5" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      handleSignOut();
                      setIsOpen(false);
                    }}
                    className="flex items-center gap-2 ml-2"
                  >
                    <LogOut className="h-4 w-4" />
                    Keluar
                  </Button>
                </>
              ) : (
                <Button 
                  variant="hero" 
                  size="sm" 
                  className="ml-2 flex items-center gap-2"
                  onClick={() => {
                    navigate('/auth');
                    setIsOpen(false);
                  }}
                >
                  <LogIn className="h-4 w-4" />
                  Masuk
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
