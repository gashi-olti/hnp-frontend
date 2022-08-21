import * as React from 'react';
import { useTranslation } from 'next-i18next';
import { Button, Container, Grid, Typography } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import { useAuth } from '@/providers/AuthProvider';
import theme from '@/config/theme';
import useSignup from '@/hooks/useSignup';

interface ICountdown {
  seconds: number;
}

export default function SingupSuccess() {
  const { t } = useTranslation(['profile', 'common', 'validation']);
  const [disableButton, setDisableButton] = React.useState(false);
  const [time, setTime] = React.useState<ICountdown>({ seconds: 59 });
  const { user } = useAuth();
  const { resendEmail } = useSignup();

  const tick = () => {
    const timer = setInterval(() => {
      setTime({ seconds: time.seconds-- });
      setDisableButton(true);

      if (time.seconds < 0) {
        setDisableButton(false);
        setTime({ seconds: 59 });
        clearInterval(timer);
      }
    }, 1000);
  };

  const formatTime = (data: ICountdown) => {
    return data.seconds + ' ' + t('common:seconds');
  };

  const submitForm = async () => {
    try {
      if (user && user.email) {
        await resendEmail(user.email);
      }
      // eslint-disable-next-line no-empty
    } catch (error) {}
  };

  return (
    <Container>
      <Grid container spacing={2} my={4} mb={12}>
        <Grid container item>
          <Grid container item tw="items-center">
            <Typography variant="h2">{t('profile:company profile create success')}</Typography>
            <CheckCircleIcon sx={{ color: theme.palette.success.dark }} tw="mr-0 sm:ml-4" />
          </Grid>
          <Typography variant="h4" paragraph>
            {t('profile:company profile create success notice')}
          </Typography>
          {!user?.isVerified && (
            <>
              <Grid container item mt={4}>
                <InfoIcon
                  fontSize="small"
                  tw="mr-0 sm:mr-2"
                  sx={{ color: theme.palette.error.dark }}
                />
                <Typography paragraph>
                  {t('profile:company profile create verify email notice')}
                </Typography>
              </Grid>
              <Grid container item alignItems="center" xs={12}>
                <Grid item>
                  <Typography variant="body1">{t('profile:send verification link')}</Typography>
                </Grid>
                {disableButton && (
                  <Grid item ml={2}>
                    <Typography variant="h4">{`${t('profile:resend again in')}: ${formatTime(
                      time
                    )}`}</Typography>
                  </Grid>
                )}
                <Grid item ml={2}>
                  <Button
                    size="small"
                    variant="text"
                    disabled={disableButton}
                    onClick={() => {
                      tick();
                      submitForm();
                    }}
                  >
                    {t('profile:resend verification email')}
                  </Button>
                </Grid>
              </Grid>
            </>
          )}
        </Grid>
      </Grid>
    </Container>
  );
}
