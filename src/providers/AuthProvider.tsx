/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import useSWR from 'swr';

import Api from '@/lib/api';
import { User, ProfileTypes } from '@/interfaces/user.interface';

interface AuthContextValue {
  user?: User;
  userProfile?: ProfileTypes;
  isAuthenticated: boolean;
  isInitialising: boolean;
  error: any;
  setUserProfile: React.Dispatch<React.SetStateAction<number | undefined>>;
  login: (email: string, password: string, type?: ProfileTypes) => Promise<any>;
  loginBackoffice: (email: string, password: string) => Promise<any>;
  logout: () => void;
  mutateUser: (
    data?: User | Promise<User>,
    shouldRevalidate?: boolean
  ) => Promise<User | undefined>;
}

export const AuthContext = React.createContext<AuthContextValue>({
  isAuthenticated: false,
  isInitialising: true,
  error: null,
  setUserProfile: () => {},
  login: async () => {},
  loginBackoffice: async () => {},
  logout: async () => {},
  mutateUser: async () => undefined,
});

type AuthProviderProps = {
  children: React.ReactNode;
};

export const useAuth = () => React.useContext(AuthContext);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const router = useRouter();
  const { t } = useTranslation('common');

  const { data: user, mutate: mutateUser, error, isValidating } = useSWR<User>('auth');
  const [userProfile, setUserProfile] = React.useState<ProfileTypes>();

  React.useEffect(() => {
    if (!isValidating && user?.isLoggedIn) {
      const profileFromStorage = window.localStorage.getItem('userProfile') ?? undefined;

      if (profileFromStorage) {
        setUserProfile(Number(profileFromStorage));
      }
    }
  }, [isValidating, user?.isLoggedIn]);

  React.useEffect(() => {
    if (userProfile) {
      window.localStorage.setItem('userProfile', userProfile.toString());
    }
  }, [userProfile]);

  const login = React.useCallback(
    async (email: string, password: string): Promise<void> => {
      try {
        const data: User = await Api.post('login', { email, password });
        setUserProfile(ProfileTypes.Company);
        await mutateUser(data, false);
      } catch (err) {
        mutateUser({ isLoggedIn: false }, false);

        throw err;
      }
    },
    [mutateUser, router]
  );

  const loginBackoffice = async (email: string, password: string): Promise<void> => {
    try {
      const data = await Api.post('backoffice/login', { email, password });
      setUserProfile(ProfileTypes.Admin);
      mutateUser(data, false);

      router.push('/backoffice');
    } catch (err) {
      mutateUser({ isLoggedIn: false }, false);

      throw err;
    }
  };

  const logout = async (): Promise<void> => {
    try {
      const res = await Api.delete('auth');
      mutateUser(res, false);
      setUserProfile(undefined);
      window.localStorage.removeItem('userProfile');
    } catch (err) {
      mutateUser({ isLoggedIn: false }, false);
      throw err;
    }
  };

  const value = {
    user,
    userProfile,
    isAuthenticated: Boolean(user?.isLoggedIn),
    isInitialising: Boolean(!user && !error), // App is initialising, reloading, refreshing.
    error,
    setUserProfile,
    login,
    loginBackoffice,
    logout,
    mutateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
