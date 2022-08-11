import * as React from 'react';
import { useTranslation } from 'next-i18next';

import Api from '@/lib/api';
import { useNotification } from '@/providers/NotificationProvider';
import { SignupFields } from '@/components/Signup/signupSchema';
import { ProfileTypes } from '@/interfaces/user.interface';
import { useAuth } from '@/providers/AuthProvider';

export default function useSignup() {
  const { t } = useTranslation(['login-signup']);

  const { mutateUser } = useAuth();
  const { openSnackbar } = useNotification();
  const [isLoading, setIsLoading] = React.useState(false);

  const register = async (data: SignupFields, type: ProfileTypes = 1) => {
    setIsLoading(true);

    try {
      const user = await Api.post('register', {
        email: data.email,
        password: data.password,
        profile_type: type,
      });
      mutateUser(user);

      openSnackbar(t('login-signup:signup success'));
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
  };

  return {
    register,
    isLoading,
  };
}
