import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import Layout from '@/components/Layout';
import LoginComponent from '@/components/Login';
import GuestGuard from '@/components/Guards/GuestGuard';
import pageMetaProps from '@/config/pages';

export default function Login() {
  return (
    <GuestGuard>
      <Layout meta={pageMetaProps.home} spacing={3} maxWidth="sm">
        <LoginComponent />
      </Layout>
    </GuestGuard>
  );
}

export const getStaticProps = async ({ locale }: { locale: any }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'login-signup', 'validation'])),
  },
});
