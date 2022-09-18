import { TFunction } from 'next-i18next';
import * as yup from 'yup';
import { DateTime } from 'luxon';

import getJobType from '@/config/jobType';
import getJobCategory from '@/config/jobCategory';

export type PostFields = {
  title?: string;
  description?: string;
  type?: number | null;
  category?: number | null;
  location?: string;
  positions?: number;
  experience?: string;
  salary?: string;
};

export const postSchema = (t: TFunction) =>
  yup.object().shape({
    title: yup
      .string()
      .required(t('validation:required'))
      .max(80, t('validation:max length n', { n: 30 })),
    description: yup
      .string()
      .test('plaintextMax', t('validation:max length n', { n: 1600 }), function (value): boolean {
        if (value) {
          if (value.replace(/<[^>]*>?/gm, '').length > 1600) {
            return false;
          }
        }
        return true;
      }),
    type: yup
      .number()
      .required(t('validation:required'))
      .oneOf(
        getJobType(t).map((type) => type.key),
        t('validation:select job type')
      ),
    category: yup
      .number()
      .required(t('validation:required'))
      .oneOf(
        getJobCategory(t).map((category) => category.key),
        t('validation:select job category')
      ),
    location: yup
      .string()
      .required(t('validation:required'))
      .max(80, t('validation:max length n', { n: 80 })),
    positions: yup.number().required(t('validation:required')),
    experience: yup
      .string()
      .nullable()
      .max(80, t('validation:max length n', { n: 80 })),
    salary: yup
      .string()
      .nullable()
      .max(50, t('validation:max length n', { n: 50 })),
    ends: yup
      .date()
      .required(t('validation:required'))
      .test('dateMax', t('validation:date max'), function (value): boolean {
        if (value) {
          const dateMax = DateTime.fromJSDate(value as Date).plus({ month: 1 });

          if (value > new Date(dateMax.toString())) return false;
        }
        return true;
      }),
  });
