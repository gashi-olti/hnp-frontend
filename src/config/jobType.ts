import { TFunction } from 'next-i18next';

export interface JobTypeInterface {
  key: number | null;
  value: string;
}

const getJobType = (t: TFunction) => {
  const jobType: JobTypeInterface[] = [
    {
      key: 1,
      value: t('job:full time'),
    },
    {
      key: 2,
      value: t('job:part time'),
    },
    {
      key: 3,
      value: t('job:internship'),
    },
  ];

  return jobType;
};

export default getJobType;
