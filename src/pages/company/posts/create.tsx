import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import AuthGuard from '@/components/Guards/AuthGuard';
import ProfileBasedGuard from '@/components/Guards/ProfileBasedGuard';
import Layout from '@/components/Layout';
import { ProfileTypes } from '@/interfaces/user.interface';
import CreateOrUpdate from '@/components/Company/Posts/CreateOrUpdate';

export default function Create() {
  const { t } = useTranslation(['profile']);

  return (
    <AuthGuard>
      <ProfileBasedGuard profiles={[ProfileTypes.Company]}>
        <Layout meta={{ title: t('post:create post title') }} my={8}>
          <CreateOrUpdate />
        </Layout>
      </ProfileBasedGuard>
    </AuthGuard>
  );
}

export const getStaticProps = async ({ locale }: { locale: any }) => ({
  props: {
    ...(await serverSideTranslations(locale, [
      'post',
      'common',
      'job',
      'validation',
      'profile',
      'login-signup',
    ])),
  },
});
