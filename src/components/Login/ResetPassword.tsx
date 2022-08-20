import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Container, Grid, Typography } from '@mui/material';

import usePasswordReset from '@/hooks/usePasswordReset';
import useFormErrors from '@/hooks/useFormErrors';

import PasswordInput from '../Forms/PasswordInput';
import LoadingButton from '../LoadingButton';

import { resetSchema } from './schema';

type ResetPasswordField = {
  password: string;
  passwordRepeat: string;
};

export default function ResetPassword() {
  const { t } = useTranslation(['common', 'login-signup']);
  const { query, push } = useRouter();
  const { resetPassword, isLoading } = usePasswordReset();

  const {
    control,
    formState: { errors },
    setError,
    handleSubmit,
  } = useForm<ResetPasswordField>({
    mode: 'onBlur',
    resolver: yupResolver(resetSchema(t)) as any,
  });

  const { handleErrors } = useFormErrors<ResetPasswordField>(setError);

  const submitForm = async (data: ResetPasswordField) => {
    try {
      await resetPassword(data.password, query.token as string);
      push('/'); // should change to /company or /company/profile
    } catch (error) {
      handleErrors(error, data);
    }
  };

  return (
    <Container>
      <form onSubmit={handleSubmit(submitForm)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h2">{t('login-signup:reset password title')}</Typography>
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
              name="passwordRepeat"
              disabled={isLoading}
            />
          </Grid>
          <Grid container item xs={12} justifyContent="flex-end">
            <LoadingButton type="submit" color="primary" variant="contained" isLoading={isLoading}>
              {t('login-signup:reset password button')}
            </LoadingButton>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}
