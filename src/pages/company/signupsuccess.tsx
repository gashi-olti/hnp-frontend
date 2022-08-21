import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';

import AuthGuard from '@/components/Guards/AuthGuard';
import ProfileBasedGuard from '@/components/Guards/ProfileBasedGuard';
import Layout from '@/components/Layout';
import pageMetaProps from '@/config/pages';
import { ProfileTypes } from '@/interfaces/user.interface';
import SignupSuccessComponent from '@/components/Company/SignupSuccess';

export default function SingupSuccess() {
  return (
    <AuthGuard>
      <ProfileBasedGuard profiles={[ProfileTypes.Company]}>
        <Layout meta={pageMetaProps['company-profile']} my={4}>
          <SignupSuccessComponent />
        </Layout>
      </ProfileBasedGuard>
    </AuthGuard>
  );
}

export const getStaticProps = async ({ locale }: { locale: any }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'profile', 'validation', 'login-signup'])),
  },
});
