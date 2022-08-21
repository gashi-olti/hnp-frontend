import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { Container, Grid, Typography } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import { useAuth } from '@/providers/AuthProvider';
import theme from '@/config/theme';

export default function ProfileForm() {
  const { t } = useTranslation(['profile', 'common', 'validation']);
  const { user } = useAuth();
  const router = useRouter();

  return (
    <Container>
      {router.query.from_page === 'signup' && (
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
            )}
          </Grid>
        </Grid>
      )}
    </Container>
  );
}
