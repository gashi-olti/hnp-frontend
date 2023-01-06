import * as React from 'react';
import { useTranslation } from 'next-i18next';

import Api from '@/lib/api';
import { useNotification } from '@/providers/NotificationProvider';
import { MediaItemType } from '@/interfaces/media.interface';

export default function useMediaApi(entity: string) {
  const { t } = useTranslation(['media']);
  const { openSnackbar } = useNotification();

  const [isLoading, setIsLoading] = React.useState(false);

  const uploadImage = React.useCallback(
    async (file: File, type: string): Promise<MediaItemType | null> => {
      if (!file) return null;

      setIsLoading(true);
      try {
        const formData = new FormData();
        formData.append('file', file);

        const data = await Api.upload(`upload/${entity}/type/${type}`, formData);

        setIsLoading(false);
        return {
          src: URL.createObjectURL(file),
          source: data.file,
          title: file.name,
          credit: '',
        };
      } catch (error: any) {
        openSnackbar(
          error?.data?.message ? error.data.message : t('media:error while uploading'),
          'error'
        );
        setIsLoading(false);
        throw error;
      }
    },
    [entity, openSnackbar, t]
  );

  const uploadFile = React.useCallback(
    async (file: File, type: string): Promise<MediaItemType | null> => {
      if (!file) return null;

      setIsLoading(true);
      try {
        const formData = new FormData();
        formData.append('file', file);

        const data = await Api.upload(`upload/${entity}/type/${type}/file`, formData);

        setIsLoading(false);
        return {
          src: URL.createObjectURL(file),
          source: data.file,
          title: file.name,
          credit: '',
        };
      } catch (error: any) {
        openSnackbar(
          error?.data?.message ? error.data.message : t('media:error while uploading'),
          'error'
        );
        setIsLoading(false);
        throw error;
      }
    },
    [entity, openSnackbar, t]
  );

  return {
    uploadImage,
    uploadFile,
    isLoading,
  };
}
