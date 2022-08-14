import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';

import AuthGuard from '@/components/Guards/AuthGuard';
import ProfileBasedGuard from '@/components/Guards/ProfileBasedGuard';
import Layout from '@/components/Layout';
import pageMetaProps from '@/config/pages';
import { ProfileTypes } from '@/interfaces/user.interface';
import ProfileComponent from '@/components/Company/';

export default function Profile() {
  return (
    <AuthGuard>
      <ProfileBasedGuard profiles={[ProfileTypes.Company]}>
        <Layout meta={pageMetaProps['company-profile']} my={4}>
          <ProfileComponent />
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
