import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import Layout from '@/components/Layout';
import SignupComponent from '@/components/Signup';
import GuestGuard from '@/components/Guards/GuestGuard';
import pageMetaProps from '@/config/pages';

export default function Signup() {
  return (
    <GuestGuard>
      <Layout meta={pageMetaProps.signup} spacing={3} maxWidth="sm">
        <SignupComponent />
      </Layout>
    </GuestGuard>
  );
}

export const getStaticProps = async ({ locale }: { locale: any }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'login-signup', 'validation'])),
  },
});
