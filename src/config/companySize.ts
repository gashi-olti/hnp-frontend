import { TFunction } from 'next-i18next';

export interface CompanySizeInterface {
  key: number | null;
  value: string;
}

const getCompanySize = (t: TFunction) => {
  const companySize: CompanySizeInterface[] = [
    {
      key: null,
      value: `1 ${t('common:employee')}`,
    },
    {
      key: 1,
      value: `2-10 ${t('common:employees')}`,
    },
    {
      key: 2,
      value: `11-50 ${t('common:employees')}`,
    },
    {
      key: 3,
      value: `51-200 ${t('common:employees')}`,
    },
    {
      key: 4,
      value: `201-1000 ${t('common:employees')}`,
    },
    {
      key: 5,
      value: `1,001-5,000 ${t('common:employees')}`,
    },
    {
      key: 6,
      value: `5,001+ ${t('common:employees')}`,
    },
  ];

  return companySize;
};

export default getCompanySize;
