import * as React from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { useAuth } from '@/providers/AuthProvider';
import Layout from '@/components/Layout';
import ResetPassword from '@/components/Login/ResetPassword';

export default function Reset() {
  const { isAuthenticated, isInitialising } = useAuth();
  const router = useRouter();
  const { t } = useTranslation(['login-signup']);

  React.useEffect(() => {
    if (router.isReady && !isInitialising && (isAuthenticated || !router.query.token)) {
      router.push('/');
    }
  }, [isInitialising, isAuthenticated, router]);

  if (!router.isReady || isInitialising || isAuthenticated || !router.query.token) {
    return null;
  }

  return (
    <Layout meta={{ title: t('reset password title') }} my={8} maxWidth="sm">
      <ResetPassword />
    </Layout>
  );
}

export const getStaticProps = async ({ locale }: { locale: any }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'login-signup', 'validation'])),
  },
});
