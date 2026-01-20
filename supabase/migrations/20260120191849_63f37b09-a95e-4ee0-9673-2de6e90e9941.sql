-- Drop the overly permissive SELECT policy on profiles
DROP POLICY IF EXISTS "Users can view all profiles" ON public.profiles;

-- Create a more restrictive policy that allows:
-- 1. Users to view their own profile
-- 2. Users to view profiles of other users who have created ministries (needed for displaying ministry creator names)
CREATE POLICY "Users can view profiles of ministry creators" 
ON public.profiles 
FOR SELECT 
TO authenticated
USING (
  auth.uid() = user_id 
  OR user_id IN (SELECT DISTINCT user_id FROM public.ministries)
);