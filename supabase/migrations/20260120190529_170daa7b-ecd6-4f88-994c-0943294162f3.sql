-- Create profiles table for volunteer information
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view all profiles"
  ON public.profiles FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can insert their own profile"
  ON public.profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create ministries table for volunteer-created ministry days
CREATE TABLE public.ministries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  date DATE NOT NULL,
  day_of_week TEXT NOT NULL,
  bible_book TEXT,
  theme TEXT,
  verse TEXT,
  objective TEXT,
  activities TEXT[],
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on ministries
ALTER TABLE public.ministries ENABLE ROW LEVEL SECURITY;

-- Ministries policies - all authenticated users can view
CREATE POLICY "Anyone can view all ministries"
  ON public.ministries FOR SELECT
  TO authenticated
  USING (true);

-- Any authenticated user can create ministries
CREATE POLICY "Authenticated users can create ministries"
  ON public.ministries FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own ministries
CREATE POLICY "Users can update their own ministries"
  ON public.ministries FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Users can delete their own ministries
CREATE POLICY "Users can delete their own ministries"
  ON public.ministries FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_ministries_updated_at
  BEFORE UPDATE ON public.ministries
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();