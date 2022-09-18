import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

import Layout from '@/components/Layout';
import PostsComponent from '@/components/Company/Posts';
import AuthGuard from '@/components/Guards/AuthGuard';
import ProfileBasedGuard from '@/components/Guards/ProfileBasedGuard';
import { ProfileTypes } from '@/interfaces/user.interface';

export default function Posts() {
  const { t } = useTranslation(['profile']);

  return (
    <AuthGuard>
      <ProfileBasedGuard profiles={[ProfileTypes.Company]}>
        <Layout meta={{ title: t('posts:my posts') }} my={4}>
          <PostsComponent />
        </Layout>
      </ProfileBasedGuard>
    </AuthGuard>
  );
}

export const getStaticProps = async ({ locale }: { locale: any }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'post', 'company'])),
  },
});
