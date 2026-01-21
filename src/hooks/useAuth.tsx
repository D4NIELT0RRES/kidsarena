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

interface StoredCredentials {
  email: string;
  password: string;
  name: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Normalize name for consistent matching
const normalizeName = (name: string): string => {
  return name.trim().toLowerCase().replace(/\s+/g, ' ');
};

// Generate deterministic credentials from name
const generateCredentials = (normalizedName: string): { email: string; password: string } => {
  const nameSlug = normalizedName.replace(/\s+/g, '_');
  const email = `${nameSlug}@kidsbaby.app`;
  const password = `kb_${nameSlug}_secure_2024`;
  return { email, password };
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
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
      } else {
        // Try to auto-login with stored credentials
        autoLoginWithStoredCredentials();
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const autoLoginWithStoredCredentials = async () => {
    const stored = localStorage.getItem('kids_baby_credentials');
    if (stored) {
      try {
        const credentials: StoredCredentials = JSON.parse(stored);
        const { error } = await supabase.auth.signInWithPassword({
          email: credentials.email,
          password: credentials.password,
        });
        
        if (!error) {
          setUserName(credentials.name);
        } else {
          // Invalid stored credentials, clear them
          localStorage.removeItem('kids_baby_credentials');
        }
      } catch {
        localStorage.removeItem('kids_baby_credentials');
      }
    }
  };

  const fetchUserProfile = async (userId: string) => {
    const { data } = await supabase
      .from('profiles')
      .select('name')
      .eq('user_id', userId)
      .single();
    
    if (data?.name) {
      setUserName(data.name);
    }
  };

  const signInWithName = async (name: string): Promise<{ error: Error | null }> => {
    try {
      const trimmedName = name.trim();
      const normalizedName = normalizeName(trimmedName);
      const { email, password } = generateCredentials(normalizedName);

      // Try to sign in first (existing user)
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (!signInError) {
        // Successful login - store credentials
        const credentials: StoredCredentials = { email, password, name: trimmedName };
        localStorage.setItem('kids_baby_credentials', JSON.stringify(credentials));
        setUserName(trimmedName);
        return { error: null };
      }

      // If login failed, create new account
      const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
          data: { name: trimmedName }
        }
      });

      if (signUpError) {
        // Check if user exists but password is wrong (shouldn't happen with deterministic credentials)
        if (signUpError.message.includes('already registered')) {
          return { error: new Error('Este nome já está em uso com credenciais diferentes. Tente um nome diferente.') };
        }
        return { error: signUpError };
      }

      if (authData.user) {
        // Create profile
        await supabase
          .from('profiles')
          .insert({
            user_id: authData.user.id,
            name: trimmedName
          });

        // Store credentials for future logins
        const credentials: StoredCredentials = { email, password, name: trimmedName };
        localStorage.setItem('kids_baby_credentials', JSON.stringify(credentials));
        setUserName(trimmedName);
      }

      return { error: null };
    } catch (err) {
      return { error: err as Error };
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUserName(null);
    localStorage.removeItem('kids_baby_credentials');
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
