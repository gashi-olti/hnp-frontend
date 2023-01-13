import * as React from 'react';
import { useTranslation } from 'next-i18next';
import useSWR from 'swr';

import Api from '@/lib/api';
import { useNotification } from '@/providers/NotificationProvider';
import { Company } from '@/interfaces/company.interface';
import { useAuth } from '@/providers/AuthProvider';

export default function useCompanyApi() {
  const { isAuthenticated } = useAuth();
  const {
    data: company,
    mutate: mutateCompany,
    error,
  } = useSWR<Company>(isAuthenticated ? 'company' : null);

  const { t } = useTranslation(['company']);

  const { openSnackbar } = useNotification();
  const [isLoading, setIsLoading] = React.useState(false);

  const updateProfile = async (data: Company) => {
    setIsLoading(true);
    try {
      const request = {
        ...data,
        media: data.media && data.media.map((media) => ({ ...media })),
      };

      const body: Company = await Api.put('company/profile', request);
      mutateCompany({ ...company, ...body });

      openSnackbar(t('profile:company profile update success'));

      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      throw err;
    }
  };

  return {
    company,
    updateProfile,
    mutateCompany,
    error,
    isFetching: !company && !error,
    isLoading,
  };
}
