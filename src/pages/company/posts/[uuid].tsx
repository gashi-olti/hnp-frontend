import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';

import AuthGuard from '@/components/Guards/AuthGuard';
import ProfileBasedGuard from '@/components/Guards/ProfileBasedGuard';
import Layout from '@/components/Layout';
import { ProfileTypes } from '@/interfaces/user.interface';
import CreateOrUpdate from '@/components/Company/Posts/CreateOrUpdate';

export default function Create() {
  const { t } = useTranslation(['post']);

  const router = useRouter();
  const { uuid } = router.query;

  return (
    <AuthGuard>
      <ProfileBasedGuard profiles={[ProfileTypes.Company]}>
        <Layout meta={{ title: t('post:update post title') }} my={8}>
          <CreateOrUpdate uuid={uuid as string} />
        </Layout>
      </ProfileBasedGuard>
    </AuthGuard>
  );
}

export const getServerSideProps = async ({ locale }: { locale: any }) => ({
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
