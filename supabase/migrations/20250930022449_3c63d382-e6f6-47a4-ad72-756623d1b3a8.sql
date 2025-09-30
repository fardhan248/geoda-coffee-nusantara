-- Add unique constraint to user_profiles.user_id if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint 
        WHERE conname = 'user_profiles_user_id_key' 
        AND conrelid = 'public.user_profiles'::regclass
    ) THEN
        ALTER TABLE public.user_profiles 
        ADD CONSTRAINT user_profiles_user_id_key UNIQUE (user_id);
    END IF;
END $$;

-- Recreate the handle_new_user function with better error handling
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Insert into users table first
  INSERT INTO public.users (id, email, role, created_at)
  VALUES (
    NEW.id,
    NEW.email,
    'customer',
    now()
  )
  ON CONFLICT (id) DO UPDATE
  SET email = EXCLUDED.email;

  -- Then insert into user_profiles table
  INSERT INTO public.user_profiles (user_id, full_name, phone_number, address, profile_picture_url)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    '',
    '',
    ''
  )
  ON CONFLICT (user_id) DO UPDATE
  SET full_name = COALESCE(EXCLUDED.full_name, public.user_profiles.full_name);

  RETURN NEW;
END;
$$;