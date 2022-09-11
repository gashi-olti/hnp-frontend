import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Grid, Typography, useTheme, useMediaQuery } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { useForm } from 'react-hook-form';

import useFormErrors from '@/hooks/useFormErrors';
import useForgotPassword from '@/hooks/usePasswordReset';
import InputController from '@/components/Forms/InputController';
import LoadingButton from '@/components/LoadingButton';

import CustomContainer from '../Common/CustomContainer';

import { forgotSchema } from './schema';

type ForgotPasswordProps = {
  onClick: () => void;
  onSuccess: () => void;
};

type ForgotPasswordFields = {
  email: string;
};

export default function ForgotPasswordForm({ onClick, onSuccess }: ForgotPasswordProps) {
  const { t } = useTranslation(['login-signup', 'common']);
  const { forgotPassword, isLoading } = useForgotPassword();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));

  const {
    control,
    formState: { errors },
    setError,
    handleSubmit,
  } = useForm<ForgotPasswordFields>({
    mode: 'onBlur',
    resolver: yupResolver(forgotSchema(t)) as any,
  });

  const { handleErrors } = useFormErrors<ForgotPasswordFields>(setError);

  const submitForm = async (data: ForgotPasswordFields) => {
    try {
      await forgotPassword(data.email);
      onSuccess();
    } catch (error) {
      handleErrors(error, data);
    }
  };

  return (
    <CustomContainer title={t('login-signup:forgot password title')}>
      <form onSubmit={handleSubmit(submitForm)}>
        <Grid container spacing={2} mt={isDesktop ? 1 : 0}>
          <Grid item xs={12}>
            <Typography variant="body1">{t('login-signup:forgot password description')}</Typography>
          </Grid>
          <Grid item xs={12}>
            <InputController
              control={control}
              errors={errors}
              label={t('common:email')}
              name="email"
              type="email"
              disabled={isLoading}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="button"
              variant="text"
              color="secondary"
              size="medium"
              onClick={onClick}
              disabled={isLoading}
            >
              {t('back to login')}
            </Button>
          </Grid>
          <Grid container item xs={12} justifyContent="flex-end">
            <LoadingButton type="submit" color="primary" variant="contained" isLoading={isLoading}>
              {t('forgot password button')}
            </LoadingButton>
          </Grid>
        </Grid>
      </form>
    </CustomContainer>
  );
}
