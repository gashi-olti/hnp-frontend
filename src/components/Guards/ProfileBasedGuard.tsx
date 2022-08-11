import { FC } from 'react';
import { useRouter } from 'next/router';
import React from 'react';

import { ProfileTypes } from '@/interfaces/user.interface';
import { useAuth } from '@/providers/AuthProvider';

import LoadingSpinner from '../LoadingSpinner';

interface ProfileBasedGuardProps {
  profiles: ProfileTypes[];
  redirectTo?: string;
  children: React.ReactNode;
}

const ProfileBasedGuard: FC<ProfileBasedGuardProps> = (props) => {
  const { profiles, redirectTo, children } = props;

  const { userProfile, isInitialising, isAuthenticated } = useAuth();
  const router = useRouter();

  if (isInitialising) {
    return <LoadingSpinner />;
  }

  if (!isAuthenticated) {
    return null;
  }

  if (userProfile && !profiles.includes(userProfile)) {
    if (userProfile === ProfileTypes.Company) router.push(redirectTo ? redirectTo : '/company');
    if (userProfile === ProfileTypes.Admin) router.push(redirectTo ? redirectTo : '/backoffice');
    return null;
  }

  return <>{children}</>;
};

export default ProfileBasedGuard;