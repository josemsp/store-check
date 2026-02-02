import { createContext, useContext } from 'react';

// Provider for user profile data
import { useProfile } from '@/features/users/hooks/useProfile';

const ProfileContext = createContext<ReturnType<typeof useProfile> | null>(null);

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const profileQuery = useProfile();

  return (
    <ProfileContext.Provider value={profileQuery}>{children}</ProfileContext.Provider>
  );
}

export function useProfileContext() {
  const ctx = useContext(ProfileContext);
  if (!ctx) throw new Error('useProfileContext must be used inside ProfileProvider');
  return ctx;
}
