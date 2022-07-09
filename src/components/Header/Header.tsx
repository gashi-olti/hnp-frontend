import * as React from 'react';
import { Container, Grid, Typography } from '@mui/material';
import Image from 'next/image';
import CustomLink from '../CustomLink';
import { Images } from '../Icons/Images';
import LinkButton from '../LinkButton';
import Navigation from './Navigation';
import PersonIcon from '@mui/icons-material/Person';
import AddPersonIcon from '@mui/icons-material/PersonAddAlt1';
import theme from '@/config/theme';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/providers/AuthProvider';
import UserPopover from './UserPopover';

export default function Header() {
  const { t } = useTranslation(['common']);
  const { isAuthenticated, isInitialising } = useAuth();

  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div tw="w-full bg-gradient-to-r from-sky to-cyan mb-4">
      <Container tw="py-2">
        <Grid
          container
          item
          alignItems="center"
          justifyContent="space-between"
          tw="flex flex-col flex-col-reverse items-stretch lg:(flex-row items-center)"
        >
          <div tw="flex flex-col sm:(flex-row items-center)">
            <Grid item>
              <h1 tw="py-2 lg:py-4">
                <CustomLink href="/">
                  <Image src={Images.Logo} alt="logo" width={150} height={49} />
                </CustomLink>
              </h1>
            </Grid>
            <Grid item>
              <Navigation />
            </Grid>
          </div>
          {mounted && !isInitialising && (
            <div tw="flex flex-row justify-end my-4 lg:(my-0)">
              {!isAuthenticated ? (
                <>
                  <Grid item mr={2}>
                    <LinkButton variant="buttonLight" href="/signup">
                      <Typography variant="h5" color="inherit">
                        {t('common:signup')}
                      </Typography>
                      <AddPersonIcon
                        color="inherit"
                        sx={{
                          marginLeft: theme.spacing(1),
                        }}
                      />
                    </LinkButton>
                  </Grid>
                  <Grid item>
                    <LinkButton variant="buttonWhite" href="/login">
                      <Typography variant="h5" color="inherit">
                        {t('common:login')}
                      </Typography>
                      <PersonIcon color="inherit" sx={{ marginLeft: theme.spacing(1) }} />
                    </LinkButton>
                  </Grid>
                </>
              ) : (
                <Grid item>
                  <UserPopover />
                </Grid>
              )}
            </div>
          )}
        </Grid>
      </Container>
    </div>
  );
}
