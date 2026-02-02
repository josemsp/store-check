import type { Session, User } from '@supabase/supabase-js';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';

import { tokenStore } from '@/infra/api/tokenStore';
import { getSupabaseClient } from '@/infra/auth/supabase.client';

type AuthContextValue = {
  user: User | null;
  session: Session | null;
  isAuthenticated: boolean;
  isInitialized: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  rememberDevice: boolean;
  setRememberDevice: (value: boolean) => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

const REMEMBER_KEY = 'remember_device';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  /* ------------------------------------------------------------------
   * Remember device
   * ------------------------------------------------------------------ */
  const [rememberDevice, setRememberDeviceState] = useState<boolean>(() => {
    return localStorage.getItem(REMEMBER_KEY) === 'true';
  });

  const setRememberDevice = (value: boolean) => {
    localStorage.setItem(REMEMBER_KEY, String(value));
    setRememberDeviceState(value);
  };

  /* ------------------------------------------------------------------
   * Supabase client (depends on rememberDevice)
   * ------------------------------------------------------------------ */
  const supabase = useMemo(() => {
    return getSupabaseClient();
  }, []);

  /* ------------------------------------------------------------------
   * Auth state
   * ------------------------------------------------------------------ */
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  /* ------------------------------------------------------------------
   * Bootstrap + auth listener
   * ------------------------------------------------------------------ */
  useEffect(() => {
    let mounted = true;

    async function bootstrap() {
      const { data } = await supabase.auth.getSession();

      if (!mounted) return;

      setSession(data.session);
      tokenStore.token = data.session?.access_token ?? null;
      const currentUser = data.session?.user ?? null;
      setUser(currentUser);
      setIsInitialized(true);
    }

    bootstrap();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, newSession) => {
      tokenStore.token = newSession?.access_token ?? null;
      setSession((prev) => {
        if (prev?.access_token === newSession?.access_token) return prev;
        return newSession;
      });

      setUser((prev) => {
        const newUser = newSession?.user ?? null;
        if (prev?.id === newUser?.id) return prev;
        return newUser;
      });
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [supabase]);

  /* ------------------------------------------------------------------
   * Actions
   * ------------------------------------------------------------------ */
  const login = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  const signUp = async (email: string, password: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) throw error;
  };

  const resetPassword = async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    if (error) throw error;
  };
  /* ------------------------------------------------------------------
   * Context value
   * ------------------------------------------------------------------ */
  const value: AuthContextValue = {
    user,
    session,
    isAuthenticated: !!user,
    isInitialized,
    login,
    logout,
    signUp,
    resetPassword,
    rememberDevice,
    setRememberDevice,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/* ------------------------------------------------------------------
 * Hook
 * ------------------------------------------------------------------ */
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return ctx;
}
