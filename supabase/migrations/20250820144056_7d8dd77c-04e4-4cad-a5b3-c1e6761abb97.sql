-- Create products table for caching Amazon products
CREATE TABLE public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  asin VARCHAR(10) UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2),
  original_price DECIMAL(10,2),
  discount_percentage INTEGER DEFAULT 0,
  image_url TEXT,
  category VARCHAR(100),
  brand VARCHAR(100),
  rating DECIMAL(3,2),
  review_count INTEGER DEFAULT 0,
  features JSONB,
  specifications JSONB,
  availability BOOLEAN DEFAULT true,
  affiliate_url TEXT,
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create user sessions table for tracking anonymous users
CREATE TABLE public.user_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id VARCHAR(255) UNIQUE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  preferences JSONB DEFAULT '{}',
  search_history JSONB DEFAULT '[]',
  viewed_products JSONB DEFAULT '[]',
  price_range JSONB DEFAULT '{"min": 0, "max": 10000}',
  categories_of_interest JSONB DEFAULT '[]',
  last_active TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create search queries table for analytics
CREATE TABLE public.search_queries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id VARCHAR(255) REFERENCES public.user_sessions(session_id),
  query TEXT NOT NULL,
  results_count INTEGER DEFAULT 0,
  clicked_products JSONB DEFAULT '[]',
  conversion_rate DECIMAL(5,4) DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create price tracking table
CREATE TABLE public.price_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
  price DECIMAL(10,2) NOT NULL,
  discount_percentage INTEGER DEFAULT 0,
  tracked_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create coupons table
CREATE TABLE public.coupons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code VARCHAR(50) NOT NULL,
  discount_type VARCHAR(20) NOT NULL, -- percentage, fixed, free_shipping
  discount_value DECIMAL(10,2),
  minimum_purchase DECIMAL(10,2),
  expiry_date TIMESTAMP WITH TIME ZONE,
  applicable_categories JSONB DEFAULT '[]',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create click tracking table for affiliate analytics
CREATE TABLE public.click_tracking (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id VARCHAR(255) REFERENCES public.user_sessions(session_id),
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
  clicked_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  referrer_page VARCHAR(255),
  user_agent TEXT,
  converted BOOLEAN DEFAULT false,
  commission_earned DECIMAL(10,2) DEFAULT 0
);

-- Enable RLS on all tables
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.search_queries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.price_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.coupons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.click_tracking ENABLE ROW LEVEL SECURITY;

-- Create policies for products (public read)
CREATE POLICY "Products are viewable by everyone" 
ON public.products FOR SELECT USING (true);

CREATE POLICY "Insert products" 
ON public.products FOR INSERT WITH CHECK (true);

CREATE POLICY "Update products" 
ON public.products FOR UPDATE USING (true);

-- Create policies for user sessions
CREATE POLICY "View own session" 
ON public.user_sessions FOR SELECT 
USING (session_id = current_setting('app.session_id', true) OR user_id = auth.uid());

CREATE POLICY "Insert session" 
ON public.user_sessions FOR INSERT WITH CHECK (true);

CREATE POLICY "Update own session" 
ON public.user_sessions FOR UPDATE 
USING (session_id = current_setting('app.session_id', true) OR user_id = auth.uid());

-- Create policies for search queries
CREATE POLICY "View search queries" 
ON public.search_queries FOR SELECT USING (true);

CREATE POLICY "Insert search queries" 
ON public.search_queries FOR INSERT WITH CHECK (true);

-- Create policies for price history (public read)
CREATE POLICY "Price history viewable by everyone" 
ON public.price_history FOR SELECT USING (true);

CREATE POLICY "Insert price history" 
ON public.price_history FOR INSERT WITH CHECK (true);

-- Create policies for coupons (public read)
CREATE POLICY "Coupons viewable by everyone" 
ON public.coupons FOR SELECT USING (true);

CREATE POLICY "Insert coupons" 
ON public.coupons FOR INSERT WITH CHECK (true);

-- Create policies for click tracking
CREATE POLICY "Insert click tracking" 
ON public.click_tracking FOR INSERT WITH CHECK (true);

CREATE POLICY "View click tracking" 
ON public.click_tracking FOR SELECT USING (true);

-- Create indexes for performance
CREATE INDEX idx_products_category ON public.products(category);
CREATE INDEX idx_products_price ON public.products(price);
CREATE INDEX idx_products_rating ON public.products(rating);
CREATE INDEX idx_products_asin ON public.products(asin);
CREATE INDEX idx_user_sessions_session_id ON public.user_sessions(session_id);
CREATE INDEX idx_search_queries_session_id ON public.search_queries(session_id);
CREATE INDEX idx_price_history_product_id ON public.price_history(product_id);
CREATE INDEX idx_click_tracking_session_id ON public.click_tracking(session_id);

-- Create function to update last_active timestamp
CREATE OR REPLACE FUNCTION update_last_active()
RETURNS TRIGGER AS $$
BEGIN
  NEW.last_active = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for user sessions
CREATE TRIGGER update_user_session_last_active
  BEFORE UPDATE ON public.user_sessions
  FOR EACH ROW
  EXECUTE FUNCTION update_last_active();