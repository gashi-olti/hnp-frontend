import { TFunction } from 'next-i18next';
import * as yup from 'yup';

import { MediaItemType } from '@/interfaces/media.interface';
import { url } from '@/lib/transform';
import mediaSchema from '@/interfaces/mediaSchema';
import getCompanySize from '@/config/companySize';

export type CompanyProfileForm = {
  name?: string;
  number?: string;
  industry?: string;
  size?: number | null;
  founded?: string;
  website?: string;
  description?: string;
  specialties?: string;
  // vat_id?: string; - VAT doesn't exist for non-eu countries
  city?: string;
  postal_code?: string;
  country?: string;
  phone?: string;
  cover?: MediaItemType | null;
  media?: MediaItemType[] | null;
};

export function looseZeroToNull(value: string | number, originalValue: string | number) {
  if (originalValue === 0 || originalValue === '0') {
    return null;
  }

  return value;
}

export const profileSchema = (t: TFunction) =>
  yup.object().shape({
    name: yup
      .string()
      .required(t('validation:required'))
      .max(255, t('validation:max length n', { n: 255 })),
    number: yup
      .string()
      .nullable()
      .max(255, t('validation:max length n', { n: 255 })),
    industry: yup
      .string()
      .max(255, t('validation:max length n', { n: 255 }))
      .nullable(),
    size: yup
      .number()
      .transform(looseZeroToNull)
      .nullable()
      .oneOf(
        getCompanySize(t).map((size) => size.key),
        t('validation:required')
      ),
    founded: yup
      .string()
      .max(255, t('validation:max length n', { n: 255 }))
      .nullable(),
    website: yup.string().optional().transform(url).url(t('validation:no valid url')),
    description: yup
      .string()
      .test('plaintextMax', t('validation:max length n', { n: 800 }), function (value): boolean {
        if (value) {
          if (value.replace(/<[^>]*>?/gm, '').length > 800) {
            return false;
          }
        }
        return true;
      }),
    specialties: yup
      .string()
      .max(255, t('validation:max length n', { n: 255 }))
      .nullable(),
    city: yup
      .string()
      .required(t('validation:required'))
      .max(255, t('validation:max length n', { n: 255 })),
    postal_code: yup
      .string()
      .required(t('validation:required'))
      .max(255, t('validation:max length n', { n: 255 })),
    country: yup.string().required(t('validation:required')),
    phone: yup
      .string()
      .required(t('validation:required'))
      .max(255, t('validation:max length n', { n: 255 })),
    cover: mediaSchema(t).nullable(),
    media: yup
      .array()
      .of(mediaSchema(t))
      .max(4, t('validation:items max length n', { n: 4 }))
      .nullable(),
  });
