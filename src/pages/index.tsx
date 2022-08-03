import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Layout from '@/components/Layout';
import pageMetaProps from '@/config/pages';

export default function Home() {
  return (
    <Layout meta={pageMetaProps.home} maxWidth="lg">
      <div>TEST</div>
    </Layout>
  );
}

export const getStaticProps = async ({ locale }: { locale: any }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
});
