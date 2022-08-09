import { TFunction } from 'next-i18next';
import * as yup from 'yup';

export type SignupFields = {
  email: string;
  password: string;
  confirm_password: string;
  //   company_name?: string;
  //   company_size?: string;
  //   company_description?: string;
  //   vat_id?: string;
  //   city?: string;
  //   postal_code?: string;
  //   country?: string;
  //   phone?: string;
  //   website?: string;
  //   cover?: string;
  //   media?: string;
};

export const schema = (t: TFunction) =>
  yup.object().shape({
    email: yup
      .string()
      .email(t('validation:email'))
      .required(t('validation:required'))
      .max(255, t('validation:max length n', { n: 255 })),
    password: yup
      .string()
      .oneOf([yup.ref('confirm_password'), null], t('validation:passwords must match'))
      .required(t('validation:required'))
      .min(8, t('validation:password min length n', { n: 8 }))
      .max(180, t('validation:max length n', { n: 180 })),
    confirm_password: yup
      .string()
      .oneOf([yup.ref('password'), null], t('validation:passwords must match'))
      .required(t('validation:required'))
      .min(8, t('validation:password min length n', { n: 8 }))
      .max(180, t('validation:max length n', { n: 180 })),
    // company_name: yup
    //   .string()
    //   .required(t('validation:required'))
    //   .max(255, t('validation:max length n', { n: 255 })),
    // company_size: yup.string().required(t('validation:required')),
    // company_description: yup.string().nullable(),
    // vat_id: yup.string().optional().nullable(),
    // city: yup
    //   .string()
    //   .required(t('validation:required'))
    //   .max(255, t('validation:max length n', { n: 255 })),
    // postal_code: yup
    //   .string()
    //   .required(t('validation:required'))
    //   .matches(/^\d{4,5}$/g, t('validation:invalid')),
    // country: yup.string().required(t('validation:required')),
    // phone: yup
    //   .string()
    //   .required(t('validation:required'))
    //   .max(255, t('validation:max length n', { n: 255 })),
    // website: yup.string().optional().transform(url).url(t('validation:no valid url')),
    // cover: mediaSchema(t).nullable(),
    // media: yup
    //   .array()
    //   .of(mediaSchema(t))
    //   .max(4, t('validation:items max length n', { n: 4 })),
  });
