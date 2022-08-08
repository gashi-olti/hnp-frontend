import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import Layout from '@/components/Layout';
import pageMetaProps from '@/config/pages';
import HomeComponent from '@/components/Home';

export default function Home() {
  return (
    <Layout meta={pageMetaProps.home} maxWidth="lg">
      <HomeComponent />
    </Layout>
  );
}

export const getStaticProps = async ({ locale }: { locale: any }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'job'])),
  },
});
