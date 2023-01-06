import { TFunction } from 'next-i18next';
import * as yup from 'yup';

export type SignupFields = {
  email: string;
  password: string;
  confirm_password?: string;
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
  });
