import * as React from 'react';
import { UseFormSetError } from 'react-hook-form';
import { useTranslation } from 'next-i18next';

import parseValidationErrors from '@/lib/parseValidationErrors';
import { useNotification } from '@/providers/NotificationProvider';

export default function useFormErrors<TFieldValues>(setError: UseFormSetError<TFieldValues>) {
  const { openSnackbar } = useNotification();
  const { t } = useTranslation('common');

  const handleErrors = React.useCallback(
    (error: any, data: TFieldValues) => {
      const backendErrors = parseValidationErrors(error?.data?.errors);
      if (backendErrors) {
        const unattachedErrors: string[] = [];
        Object.keys(backendErrors).forEach((key) => {
          if (key in data) {
            setError(key as any, {
              type: 'manual',
              message: backendErrors[key][0],
            });
          } else if (key.includes('.')) {
            const arrayKey = key.split('.');
            if (arrayKey[0] in data) {
              setError(key as any, {
                type: 'manual',
                message: backendErrors[key][0],
              });
            }
          } else {
            unattachedErrors.push(backendErrors[key][0]);
          }
        });
        if (unattachedErrors.length > 0) {
          openSnackbar(unattachedErrors[0], 'error');
        }
      } else if (error.status === 404) {
        openSnackbar(t('not found'), 'error');
      } else if (error?.status && error?.message) {
        openSnackbar(error.message, 'error');
      } else {
        openSnackbar(t('something went wrong'), 'error');
      }
    },
    [openSnackbar, setError, t]
  );

  return {
    handleErrors,
  };
}
