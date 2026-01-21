import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  userName: string | null;
  signInWithName: (name: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    // Check for stored name in localStorage
    const storedName = localStorage.getItem('kids_baby_user_name');
    if (storedName) {
      setUserName(storedName);
    }

    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);

        if (session?.user) {
          setTimeout(() => {
            fetchUserProfile(session.user.id);
          }, 0);
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        fetchUserProfile(session.user.id);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserProfile = async (userId: string) => {
    const { data } = await supabase
      .from('profiles')
      .select('name')
      .eq('user_id', userId)
      .single();
    
    if (data?.name) {
      setUserName(data.name);
      localStorage.setItem('kids_baby_user_name', data.name);
    }
  };

  const signInWithName = async (name: string): Promise<{ error: Error | null }> => {
    try {
      // Generate a unique email based on name and timestamp
      const uniqueId = Date.now().toString(36) + Math.random().toString(36).substr(2);
      const email = `${name.toLowerCase().replace(/\s+/g, '_')}_${uniqueId}@kidsbaby.local`;
      const password = uniqueId + '_secure_password';

      // Sign up with auto-generated credentials
      const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
          data: {
            name: name
          }
        }
      });

      if (signUpError) {
        return { error: signUpError };
      }

      if (authData.user) {
        // Create profile with the user's name
        const { error: profileError } = await supabase
          .from('profiles')
          .insert({
            user_id: authData.user.id,
            name: name
          });

        if (profileError) {
          console.error('Error creating profile:', profileError);
        }

        setUserName(name);
        localStorage.setItem('kids_baby_user_name', name);
      }

      return { error: null };
    } catch (err) {
      return { error: err as Error };
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUserName(null);
    localStorage.removeItem('kids_baby_user_name');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      session, 
      loading, 
      userName,
      signInWithName,
      signOut 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};