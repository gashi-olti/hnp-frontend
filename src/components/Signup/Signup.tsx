import { Grid, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

import useFormErrors from '@/hooks/useFormErrors';
import useSignup from '@/hooks/useSignup';
import { ProfileTypes } from '@/interfaces/user.interface';

import InputController from '../Forms/InputController';
import PasswordInput from '../Forms/PasswordInput';
import LoadingButton from '../LoadingButton';
import CustomContainer from '../Common/CustomContainer';

import { schema, SignupFields } from './signupSchema';

type SignupProps = {
  profileType: ProfileTypes;
};

export default function Signup({ profileType }: SignupProps) {
  const { t } = useTranslation(['common', 'validation', 'login-signup']);
  const { register, isLoading } = useSignup();
  const router = useRouter();

  const {
    control,
    formState: { errors },
    setError,
    handleSubmit,
  } = useForm<SignupFields>({
    mode: 'onSubmit',
    resolver: yupResolver(schema(t)) as any,
  });

  const { handleErrors } = useFormErrors<SignupFields>(setError);

  const submitForm = async (data: SignupFields) => {
    try {
      await register(data, profileType);

      if (profileType === ProfileTypes.Company) {
        router.push({
          pathname: '/company/profile',
          query: {
            from_page: 'signup',
          },
        });
      }
    } catch (error) {
      handleErrors(error, data);
    }
  };

  return (
    <CustomContainer tw="justify-center">
      <form onSubmit={handleSubmit(submitForm)}>
        <Grid container spacing={2} maxWidth="xl">
          <Grid item xs={12}>
            <Typography variant="h2" component="span">
              {t('login-signup:signup title')}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <InputController
              control={control}
              errors={errors}
              label={t('common:email')}
              name="email"
              autoFocus
              disabled={isLoading}
            />
          </Grid>
          <Grid item xs={12}>
            <PasswordInput
              control={control}
              errors={errors}
              label={t('common:password')}
              name="password"
              disabled={isLoading}
            />
          </Grid>
          <Grid item xs={12}>
            <PasswordInput
              control={control}
              errors={errors}
              label={t('common:confirm password')}
              name="confirm_password"
              disabled={isLoading}
            />
          </Grid>
          <Grid container item xs={12} justifyContent="flex-end">
            <LoadingButton type="submit" color="primary" variant="contained" isLoading={isLoading}>
              {t('login-signup:signup button')}
            </LoadingButton>
          </Grid>
        </Grid>
      </form>
    </CustomContainer>
  );
}
