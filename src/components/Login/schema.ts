import * as yup from 'yup';
import { TFunction } from 'next-i18next';

export type LoginFields = {
  email: string;
  password: string;
};

export const loginSchema = (t: TFunction) =>
  yup.object().shape({
    email: yup
      .string()
      .email(t('validation:email'))
      .required(t('validation:required'))
      .max(255, t('validation:max length n', { n: 255 })),
    password: yup
      .string()
      .required(t('validation:required'))
      .max(180, t('validation:max length n', { n: 180 })),
  });

export const forgotSchema = (t: TFunction) =>
  yup.object().shape({
    email: yup
      .string()
      .email(t('validation:email'))
      .required(t('validation:required'))
      .max(255, t('validation:max length n', { n: 255 })),
  });

export const resetSchema = (t: TFunction) =>
  yup.object().shape({
    password: yup
      .string()
      .required(t('validation:required'))
      .min(8, t('validation:password min length n', { n: 8 }))
      .max(180, t('validation:max length n', { n: 180 })),
    passwordRepeat: yup
      .string()
      .oneOf([yup.ref('password'), null], t('validation:passwords must match'))
      .required(t('validation:required')),
  });
