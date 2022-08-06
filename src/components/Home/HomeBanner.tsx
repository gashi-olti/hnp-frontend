import { useTranslation } from 'react-i18next';

import ListBanner from '../Common/ListBanner';

export default function HomeBanner() {
  const { t } = useTranslation(['job']);

  return (
    <ListBanner
      header={t('job:all jobs')}
      subHeader={t('job:jobs banner subtitle')}
      content={t('job:jobs banner content')}
    />
  );
}
