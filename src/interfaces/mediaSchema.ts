import { TFunction } from 'next-i18next';
import * as yup from 'yup';

const mediaSchema = (t: TFunction) =>
  yup.object().shape({
    source: yup.string().max(255, t('validation:max length n', { n: 255 })),
    title: yup
      .string()
      .nullable()
      .when('source', {
        is: (source: string) => !!source,
        then: yup
          .string()
          .required(t('validation:required'))
          .max(255, t('validation:max length n', { n: 255 })),
      }),
    credit: yup
      .string()
      .max(255, t('validation:max length n', { n: 255 }))
      .nullable(),
  });

export default mediaSchema;
