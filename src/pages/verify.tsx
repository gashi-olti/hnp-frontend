import * as React from 'react';
import { useRouter } from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { Typography } from '@mui/material';

import useSignup from '@/hooks/useSignup';
import Layout from '@/components/Layout';
import LoadingSpinner from '@/components/LoadingSpinner';
import ErrorComponent from '@/components/ErrorComponent';
import { useAuth } from '@/providers/AuthProvider';
import { ProfileTypes } from '@/interfaces/user.interface';

export default function Verify() {
  const { user, isInitialising: isFetchingUser, mutateUser } = useAuth();
  const { t } = useTranslation(['common', 'login-signup']);
  const { verify, isLoading: isVerifying } = useSignup();

  const router = useRouter();

  const [verifyError, setVerifyError] = React.useState(false);

  const verifyUser = React.useCallback(
    async (redirectTo = '') => {
      try {
        const data = await verify({
          email: router.query.email as string,
          token: router.query.token as string,
        });
        await mutateUser(data);
        router.push(redirectTo);
      } catch (error) {
        setVerifyError(true);
      }
    },
    [verify, router, mutateUser]
  );

  React.useEffect(() => {
    if (!router.isReady || isFetchingUser || isVerifying || verifyError) return;

    if (!router.query.email || !router.query.token) {
      router.push('/');
      return;
    }

    let redirectTo = '/';
    if (user?.profile_type === ProfileTypes.Company) {
      redirectTo = '/company';
    }
    verifyUser(redirectTo);
  }, [router, verifyUser, isFetchingUser, isVerifying, verifyError, user?.profile_type, user]);

  if (!router.isReady || isFetchingUser) {
    return (
      <Layout>
        <LoadingSpinner />
      </Layout>
    );
  }

  if (router.isReady && (!router.query.email || !router.query.token)) {
    return (
      <Layout>
        <></>
      </Layout>
    );
  }

  return (
    <Layout>
      <Typography variant="h2">{t('login-signup:verify email title')}</Typography>
      {isVerifying && <LoadingSpinner />}
      {verifyError && (
        <ErrorComponent
          title={t('login-signup:verify email title')}
          message={t('login-signup:verify email error')}
        />
      )}
    </Layout>
  );
}

export const getStaticProps = async ({ locale }: { locale: any }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'login-signup', 'validation'])),
  },
});
