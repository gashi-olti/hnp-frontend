import Layout from '@/components/Layout';
import pageMetaProps from '@/config/pages';

export default function Home() {
  return (
    <Layout meta={pageMetaProps.home} maxWidth="lg">
      <div>TEST</div>
    </Layout>
  );
}
