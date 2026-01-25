-- Drop existing restrictive policies
DROP POLICY IF EXISTS "Users can update their own ministries" ON public.ministries;
DROP POLICY IF EXISTS "Users can delete their own ministries" ON public.ministries;

-- Create new permissive policies for all authenticated users
CREATE POLICY "Authenticated users can update any ministry"
ON public.ministries
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Authenticated users can delete any ministry"
ON public.ministries
FOR DELETE
TO authenticated
USING (true);