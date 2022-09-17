import * as React from 'react';
import { useTranslation } from 'next-i18next';
import { DateTime } from 'luxon';

import Api from '@/lib/api';
import { useNotification } from '@/providers/NotificationProvider';
import { PostModel } from '@/interfaces/post.interface';

export default function usePostApi() {
  const { t } = useTranslation(['common', 'post']);
  const [isLoading, setIsLoading] = React.useState(false);
  const { openSnackbar } = useNotification();

  const transformDates = (body: PostModel) => {
    if (body.ends) {
      body.ends = DateTime.fromObject(body.ends as unknown as DateTime).toFormat('dd-MM-yyyy');
    }

    return body;
  };

  const createPost = async (body: PostModel) => {
    setIsLoading(true);
    try {
      const data: PostModel = await Api.post('posts', { ...transformDates(body) });

      openSnackbar(t('post:post create success'));
      setIsLoading(false);

      return data;
    } catch (err) {
      setIsLoading(false);
      throw err;
    }
  };

  return {
    createPost,
    isLoading,
  };
}
