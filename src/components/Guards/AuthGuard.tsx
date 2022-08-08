import { useRouter } from 'next/router';
import React, { FC, ReactNode } from 'react';

import { useAuth } from '@/providers/AuthProvider';

import LoadingSpinner from '../LoadingSpinner';

interface AuthGuardProps {
  children: ReactNode;
}

const AuthGuard: FC<AuthGuardProps> = (props) => {
  const { children } = props;

  const { isAuthenticated, isInitialising } = useAuth();

  const router = useRouter();

  const [requestedLocation, setRequestedLocation] = React.useState<string | null>(null);

  if (isInitialising) {
    return <LoadingSpinner />;
  }

  if (!isAuthenticated) {
    if (router.pathname !== requestedLocation) {
      setRequestedLocation(router.pathname);
    }
    router.push('/', '/', { locale: router.locale });
  }

  // In case the route changes during request, we navigate to the initially
  // requested route.
  if (requestedLocation && router.pathname !== requestedLocation) {
    setRequestedLocation(null);
    router.push(requestedLocation);
    return null;
  }

  return <>{children}</>;
};

export default AuthGuard;
