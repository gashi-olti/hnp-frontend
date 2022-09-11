import * as React from 'react';

import useCompanyApi from '@/hooks/useCompanyApi';
import LoadingSpinner from '@/components/LoadingSpinner';

import ProfileForm from './ProfileForm';

export default function Company() {
  const { company, isFetching } = useCompanyApi();

  if (isFetching && !company) {
    return <LoadingSpinner />;
  }

  return <ProfileForm company={company} />;
}
