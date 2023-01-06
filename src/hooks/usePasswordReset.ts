import * as React from 'react';
import { useTranslation } from 'next-i18next';

import Api from '@/lib/api';
import { useNotification } from '@/providers/NotificationProvider';

export default function usePasswordReset() {
  const { t } = useTranslation(['login-signup']);

  const { openSnackbar } = useNotification();
  const [isLoading, setIsLoading] = React.useState(false);

  const forgotPassword = async (email: string) => {
    setIsLoading(true);
    try {
      console.log('inside forgotpassword function ');
      await Api.post('forgot', { email });

      console.log('after api ');
      openSnackbar(t('forgot password success'));
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
  };

  const resetPassword = async (password: string, token: string) => {
    setIsLoading(true);
    try {
      await Api.post('reset', { password, token });

      openSnackbar(t('reset password success'));
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
  };

  return {
    forgotPassword,
    resetPassword,
    isLoading,
  };
}
