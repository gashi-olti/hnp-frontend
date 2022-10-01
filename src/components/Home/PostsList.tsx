import { Box, Grid, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import { useTranslation } from 'next-i18next';
import useSWR from 'swr';

import useDebounce from '@/hooks/useDebounce';
import { PostModel } from '@/interfaces/post.interface';

import ErrorComponent from '../ErrorComponent';
import LoadingSpinner from '../LoadingSpinner';
import List from '../Posts/List';

import PostsFilter from './PostsFilter';

interface FieldValues {
  query: string;
  category: string[];
  type: string[];
}

export default function PostsList() {
  const { t } = useTranslation('common');
  const router = useRouter();

  const { ...methods } = useForm<FieldValues>({
    mode: 'onBlur',
    defaultValues: {
      query: (router.query.query as string) ?? '',
      category: (router.query.category as string[]) ?? '',
      type: (router.query.type as string[]) ?? '',
    },
  });

  const { query, category, type } = useWatch({
    control: methods.control,
  });

  const searchTermDebounce = useDebounce(query, 500);

  const { data: posts, error } = useSWR<PostModel[]>(
    `posts?category=${category}&type=${type}&q=${searchTermDebounce}`
  );

  const loading = !posts && !error;
  const empty = posts && !error && !posts.length;

  if (error) {
    return <ErrorComponent title={t('common:error')} message={t('common:something went wrong')} />;
  }

  return (
    <>
      <Box my={1}>
        <FormProvider {...methods}>
          <PostsFilter />
        </FormProvider>
      </Box>

      {empty && (
        <Grid container>
          {query && searchTermDebounce ? (
            <Typography tw="text-lg font-bold">{t('common:no results for', { query })}</Typography>
          ) : (
            <Typography tw="text-lg font-bold">{t('common:no results')}</Typography>
          )}
        </Grid>
      )}

      {searchTermDebounce && !empty && query && (
        <Grid container>
          <Grid item>
            <Typography tw="text-lg font-bold mb-4">
              {t('common:returned results for', { query })}
            </Typography>
          </Grid>
        </Grid>
      )}

      {loading ? (
        <LoadingSpinner />
      ) : (
        <Grid container spacing={3} my={1} mb={4}>
          {posts?.map((post: PostModel) => (
            <Grid key={post.uuid} item xs={12} sm={6} md={4} lg={3}>
              <List data={post} />
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
}
