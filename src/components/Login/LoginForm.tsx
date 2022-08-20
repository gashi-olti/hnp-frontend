/* eslint-disable react/jsx-props-no-spreading */
import { Button, Container, Grid, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { useAuth } from '@/providers/AuthProvider';
import useFormErrors from '@/hooks/useFormErrors';
import InputController from '@/components/Forms/InputController';
import PasswordInput from '@/components/Forms/PasswordInput';

import LoadingButton from '../LoadingButton';

import { loginSchema, LoginFields } from './schema';

type LoginProps = {
  onClick: () => void;
};

export default function LoginForm({ onClick }: LoginProps) {
  const { t } = useTranslation(['login-signup', 'common']);
  const { login, isInitialising } = useAuth();
  const router = useRouter();

  const {
    control,
    formState: { errors },
    setError,
    handleSubmit,
  } = useForm<LoginFields>({
    mode: 'onSubmit',
    resolver: yupResolver(loginSchema(t)) as any,
  });

  const { handleErrors } = useFormErrors<LoginFields>(setError);

  const submitForm = async (data: LoginFields) => {
    try {
      await login(data.email, data.password);
      router.push('/', '/', { locale: router.locale });
    } catch (error) {
      handleErrors(error, data);
    }
  };

  return (
    <Container tw="justify-center">
      <form onSubmit={handleSubmit(submitForm)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h2">{t('login-signup:login title')}</Typography>
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
          <Grid item xs={12}>
            <Button
              type="button"
              variant="text"
              color="secondary"
              size="medium"
              onClick={onClick}
              disabled={isInitialising}
            >
              {t('forgot password')}
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Link href={'/signup'} passHref>
              <Button component="a" type="button" variant="text" color="secondary" size="medium">
                {t('login-signup:no account signup')}
              </Button>
            </Link>
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
    </Container>
  );
}
