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
      value: t('job:architecture and design'),
    },
    {
      key: 5,
      value: t('job:bank and finance'),
    },
    {
      key: 6,
      value: t('job:call center'),
    },
    {
      key: 6,
      value: t('job:hotel and turism'),
    },
    {
      key: 7,
      value: t('job:engineering'),
    },
    {
      key: 8,
      value: t('job:automotive industry'),
    },
    {
      key: 9,
      value: t('job:juridical'),
    },
    {
      key: 10,
      value: t('job:logistics'),
    },
    {
      key: 11,
      value: t('job:accountability'),
    },
    {
      key: 12,
      value: t('job:construction'),
    },
    {
      key: 13,
      value: t('job:media'),
    },
    {
      key: 14,
      value: t('job:marketing and advertising'),
    },
    {
      key: 15,
      value: t('job:production'),
    },
    {
      key: 16,
      value: t('job:it'),
    },
    {
      key: 17,
      value: t('job:telecommunication'),
    },
    {
      key: 18,
      value: t('job:sport'),
    },
    {
      key: 18,
      value: t('job:health services'),
    },
    {
      key: 19,
      value: t('job:sales'),
    },
    {
      key: 20,
      value: t('job:others'),
    },
  ];

  return jobCategories;
};

export default getJobCategory;
