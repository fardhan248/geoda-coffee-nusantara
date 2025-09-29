import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Mail, Lock, User, Coffee } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().trim().email({ message: "Email tidak valid" }).max(255, { message: "Email terlalu panjang" }),
  password: z.string().min(6, { message: "Password minimal 6 karakter" }).max(128, { message: "Password terlalu panjang" })
});

const signupSchema = z.object({
  fullName: z.string().trim().min(2, { message: "Nama minimal 2 karakter" }).max(100, { message: "Nama terlalu panjang" }),
  email: z.string().trim().email({ message: "Email tidak valid" }).max(255, { message: "Email terlalu panjang" }),
  password: z.string().min(6, { message: "Password minimal 6 karakter" }).max(128, { message: "Password terlalu panjang" }),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Password tidak cocok",
  path: ["confirmPassword"],
});

const Auth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('login');
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [signupData, setSignupData] = useState({ fullName: '', email: '', password: '', confirmPassword: '' });
  const [loginErrors, setLoginErrors] = useState<Record<string, string>>({});
  const [signupErrors, setSignupErrors] = useState<Record<string, string>>({});
  
  const { signIn, signUp, user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      navigate('/');
    }
  }, [user, loading, navigate]);

  const validateLogin = () => {
    try {
      loginSchema.parse(loginData);
      setLoginErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors: Record<string, string> = {};
        error.issues.forEach((err) => {
          if (err.path[0]) {
            errors[err.path[0] as string] = err.message;
          }
        });
        setLoginErrors(errors);
      }
      return false;
    }
  };

  const validateSignup = () => {
    try {
      signupSchema.parse(signupData);
      setSignupErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors: Record<string, string> = {};
        error.issues.forEach((err) => {
          if (err.path[0]) {
            errors[err.path[0] as string] = err.message;
          }
        });
        setSignupErrors(errors);
      }
      return false;
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateLogin()) return;
    
    setIsLoading(true);
    const { error } = await signIn(loginData.email, loginData.password);
    
    if (!error) {
      navigate('/');
    }
    setIsLoading(false);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateSignup()) return;
    
    setIsLoading(true);
    const { error } = await signUp(signupData.email, signupData.password, signupData.fullName);
    
    if (!error) {
      setActiveTab('login');
      setSignupData({ fullName: '', email: '', password: '', confirmPassword: '' });
    }
    setIsLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Memuat...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center">
              <Coffee className="h-8 w-8 text-primary-foreground" />
            </div>
          </div>
          <CardTitle className="text-2xl font-display">Geoda Coffee</CardTitle>
          <CardDescription>
            Masuk ke akun Anda atau buat akun baru
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Masuk</TabsTrigger>
              <TabsTrigger value="signup">Daftar</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="email@contoh.com"
                      value={loginData.email}
                      onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                      className={`pl-10 ${loginErrors.email ? 'border-destructive' : ''}`}
                      disabled={isLoading}
                    />
                  </div>
                  {loginErrors.email && <p className="text-sm text-destructive">{loginErrors.email}</p>}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="login-password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      id="login-password"
                      type="password"
                      placeholder="Password"
                      value={loginData.password}
                      onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                      className={`pl-10 ${loginErrors.password ? 'border-destructive' : ''}`}
                      disabled={isLoading}
                    />
                  </div>
                  {loginErrors.password && <p className="text-sm text-destructive">{loginErrors.password}</p>}
                </div>
                
                <Button type="submit" className="w-full" disabled={isLoading} variant="hero">
                  {isLoading ? 'Memproses...' : 'Masuk'}
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value="signup">
              <form onSubmit={handleSignup} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-name">Nama Lengkap</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      id="signup-name"
                      type="text"
                      placeholder="Nama Lengkap"
                      value={signupData.fullName}
                      onChange={(e) => setSignupData({ ...signupData, fullName: e.target.value })}
                      className={`pl-10 ${signupErrors.fullName ? 'border-destructive' : ''}`}
                      disabled={isLoading}
                    />
                  </div>
                  {signupErrors.fullName && <p className="text-sm text-destructive">{signupErrors.fullName}</p>}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="signup-email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="email@contoh.com"
                      value={signupData.email}
                      onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                      className={`pl-10 ${signupErrors.email ? 'border-destructive' : ''}`}
                      disabled={isLoading}
                    />
                  </div>
                  {signupErrors.email && <p className="text-sm text-destructive">{signupErrors.email}</p>}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="signup-password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      id="signup-password"
                      type="password"
                      placeholder="Password (minimal 6 karakter)"
                      value={signupData.password}
                      onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                      className={`pl-10 ${signupErrors.password ? 'border-destructive' : ''}`}
                      disabled={isLoading}
                    />
                  </div>
                  {signupErrors.password && <p className="text-sm text-destructive">{signupErrors.password}</p>}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="signup-confirm-password">Konfirmasi Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      id="signup-confirm-password"
                      type="password"
                      placeholder="Konfirmasi Password"
                      value={signupData.confirmPassword}
                      onChange={(e) => setSignupData({ ...signupData, confirmPassword: e.target.value })}
                      className={`pl-10 ${signupErrors.confirmPassword ? 'border-destructive' : ''}`}
                      disabled={isLoading}
                    />
                  </div>
                  {signupErrors.confirmPassword && <p className="text-sm text-destructive">{signupErrors.confirmPassword}</p>}
                </div>
                
                <Button type="submit" className="w-full" disabled={isLoading} variant="hero">
                  {isLoading ? 'Memproses...' : 'Daftar'}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;