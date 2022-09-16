import { TFunction } from 'next-i18next';

export interface JobCategoryInterface {
  key: number | null;
  value: string;
}

const getJobCategory = (t: TFunction) => {
  const jobCategories = [
    {
      key: 1,
      value: t('job:administration'),
    },
    {
      key: 2,
      value: t('job:education'),
    },
    {
      key: 3,
      value: t('job:agronomy'),
    },
    {
      key: 4,
      value: t('job:it'),
    },
  ];

  return jobCategories;
};

export default getJobCategory;
