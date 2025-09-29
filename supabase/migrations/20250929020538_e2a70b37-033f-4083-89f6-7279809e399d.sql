-- Enable RLS on all tables that currently don't have it
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.carts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_variants ENABLE ROW LEVEL SECURITY;

-- Products and variants are public (for browsing catalog)
CREATE POLICY "Products are publicly readable" 
ON public.products 
FOR SELECT 
USING (is_active = true);

CREATE POLICY "Product variants are publicly readable" 
ON public.product_variants 
FOR SELECT 
USING (true);

-- Users can only access their own data
CREATE POLICY "Users can view their own profile" 
ON public.users 
FOR SELECT 
USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" 
ON public.users 
FOR UPDATE 
USING (auth.uid() = id);

-- User profiles policies
CREATE POLICY "Users can view their own user profile" 
ON public.user_profiles 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own user profile" 
ON public.user_profiles 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own user profile" 
ON public.user_profiles 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Cart policies
CREATE POLICY "Users can view their own cart" 
ON public.carts 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own cart" 
ON public.carts 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own cart" 
ON public.carts 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own cart" 
ON public.carts 
FOR DELETE 
USING (auth.uid() = user_id);

-- Cart items policies
CREATE POLICY "Users can view their own cart items" 
ON public.cart_items 
FOR SELECT 
USING (EXISTS (
  SELECT 1 FROM public.carts 
  WHERE carts.id = cart_items.cart_id 
  AND carts.user_id = auth.uid()
));

CREATE POLICY "Users can insert their own cart items" 
ON public.cart_items 
FOR INSERT 
WITH CHECK (EXISTS (
  SELECT 1 FROM public.carts 
  WHERE carts.id = cart_items.cart_id 
  AND carts.user_id = auth.uid()
));

CREATE POLICY "Users can update their own cart items" 
ON public.cart_items 
FOR UPDATE 
USING (EXISTS (
  SELECT 1 FROM public.carts 
  WHERE carts.id = cart_items.cart_id 
  AND carts.user_id = auth.uid()
));

CREATE POLICY "Users can delete their own cart items" 
ON public.cart_items 
FOR DELETE 
USING (EXISTS (
  SELECT 1 FROM public.carts 
  WHERE carts.id = cart_items.cart_id 
  AND carts.user_id = auth.uid()
));

-- Orders policies
CREATE POLICY "Users can view their own orders" 
ON public.orders 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own orders" 
ON public.orders 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own orders" 
ON public.orders 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Order items policies
CREATE POLICY "Users can view their own order items" 
ON public.order_items 
FOR SELECT 
USING (EXISTS (
  SELECT 1 FROM public.orders 
  WHERE orders.id = order_items.order_id 
  AND orders.user_id = auth.uid()
));

CREATE POLICY "Users can insert their own order items" 
ON public.order_items 
FOR INSERT 
WITH CHECK (EXISTS (
  SELECT 1 FROM public.orders 
  WHERE orders.id = order_items.order_id 
  AND orders.user_id = auth.uid()
));

-- Create trigger to automatically create user profile
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.user_profiles (user_id, full_name)
  VALUES (
    NEW.id, 
    COALESCE(NEW.raw_user_meta_data ->> 'full_name', NEW.email)
  );
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();