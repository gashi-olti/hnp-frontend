import { useRouter } from 'next/router';
import { FC, ReactNode } from 'react';
import React from 'react';

import { useAuth } from '@/providers/AuthProvider';

interface GuestGuardProps {
  children: ReactNode;
}

const GuestGuard: FC<GuestGuardProps> = ({ children }) => {
  const { isAuthenticated, user } = useAuth();
  const router = useRouter();

  if (isAuthenticated) {
    if (user) {
      if (!user.isVerified) {
        router.push({
          pathname: '/company/signupsuccess',
        });
        return null;
      }

      router.push('/company', '/company', { locale: router.locale });
      return null;
    }

    return null;
  }

  return <>{children}</>;
};

export default GuestGuard;
