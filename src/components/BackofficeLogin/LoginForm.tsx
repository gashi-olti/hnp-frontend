import { Grid, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'next-i18next';

import InputController from '@/components/Forms/InputController';
import PasswordInput from '@/components/Forms/PasswordInput';
import { useAuth } from '@/providers/AuthProvider';
import useFormErrors from '@/hooks/useFormErrors';

import LoadingButton from '../LoadingButton';

import { loginSchema, LoginFields } from './schema';

export default function LoginForm() {
  const { t } = useTranslation(['common', 'login-signup']);
  const { loginBackoffice, isInitialising } = useAuth();

  const {
    control,
    formState: { errors },
    setError,
    handleSubmit,
  } = useForm<LoginFields>({
    mode: 'onBlur',
    resolver: yupResolver(loginSchema(t)) as any,
  });

  const { handleErrors } = useFormErrors<LoginFields>(setError);

  const submitForm = async (data: LoginFields) => {
    try {
      await loginBackoffice(data.email, data.password);
    } catch (error) {
      handleErrors(error, data);
    }
  };

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      <Grid container spacing={2}>
        <Grid item>
          <Typography variant="h2">{t('back office login title')}</Typography>
        </Grid>
        <Grid item xs={12}>
          <InputController
            control={control}
            errors={errors}
            label={t('common:email')}
            name="email"
            autoFocus
            disabled={isInitialising}
          />
        </Grid>
        <Grid item xs={12}>
          <PasswordInput
            control={control}
            errors={errors}
            label={t('common:password')}
            name="password"
            disabled={isInitialising}
          />
        </Grid>
        <Grid container item xs={12} justifyContent="flex-end">
          <LoadingButton
            type="submit"
            color="primary"
            variant="contained"
            isLoading={isInitialising}
          >
            {t('login button')}
          </LoadingButton>
        </Grid>
      </Grid>
    </form>
  );
}
