import { useRouter } from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import useSWR from 'swr';

import LoadingSpinner from '@/components/LoadingSpinner';
import ErrorComponent from '@/components/ErrorComponent';
import Layout from '@/components/Layout';
import { SinglePostComponent } from '@/components/Posts';
import { PostModel } from '@/interfaces/post.interface';

export default function Post() {
  const { t } = useTranslation('common');

  const router = useRouter();
  const { slug } = router.query;

  const { data: post, error } = useSWR<PostModel>(slug ? `posts/${slug as string}` : null);

  if (!post && !error) return <LoadingSpinner />;

  if (error)
    return <ErrorComponent title={t('common:error')} message={t('common:something went wrong')} />;

  if (!post) return <ErrorComponent title={t('common:not found')} message={t('post not found')} />;

  return (
    <Layout meta={{ title: post.title, description: post.description_plain }} maxWidth="xl">
      <SinglePostComponent post={post} />
    </Layout>
  );
}

export const getServerSideProps = async ({ locale }: { locale: any }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'post'])),
  },
});
