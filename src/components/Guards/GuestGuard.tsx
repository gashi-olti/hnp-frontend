import { useRouter } from 'next/router';
import { FC, ReactNode } from 'react';
import React from 'react';

import { useAuth } from '@/providers/AuthProvider';

interface GuestGuardProps {
  children: ReactNode;
}

const GuestGuard: FC<GuestGuardProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  if (isAuthenticated) {
    router.push('/', '/', { locale: router.locale });
    return null;
  }

  return <>{children}</>;
};

export default GuestGuard;
