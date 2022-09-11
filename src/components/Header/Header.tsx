import * as React from 'react';
import { Container, Grid, Typography, useTheme, useMediaQuery, IconButton } from '@mui/material';
import Image from 'next/image';
import PersonIcon from '@mui/icons-material/Person';
import AddPersonIcon from '@mui/icons-material/PersonAddAlt1';
import MenuIcon from '@mui/icons-material/Menu';
import { useTranslation } from 'react-i18next';

import theme from '@/config/theme';
import { useAuth } from '@/providers/AuthProvider';

import CustomLink from '../CustomLink';
import { Images } from '../Icons/Images';
import LinkButton from '../LinkButton';

import Navigation from './Navigation';
import UserPopover from './UserPopover';
import LanguageSelector from './LanguageSelector';
import MobileHeader from './MobileHeader';

export default function Header() {
  const { t } = useTranslation(['common']);
  const { isAuthenticated, isInitialising } = useAuth();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const muiTheme = useTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('sm'));

  const [mounted, setMounted] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

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
          tw="flex flex-row justify-between lg:(flex-row items-center)"
        >
          {!isMobile && (
            <Grid container item xs={12} justifyContent="flex-end">
              <LanguageSelector />
            </Grid>
          )}
          <div tw="w-full flex flex-row justify-between items-center sm:(w-auto)">
            <Grid item>
              <h1 tw="py-2 lg:py-4">
                <CustomLink href="/">
                  <Image src={Images.Logo} alt="logo" width={150} height={49} />
                </CustomLink>
              </h1>
            </Grid>
            {isMobile && (
              <Grid item>
                <IconButton
                  aria-label="open drawer"
                  edge="start"
                  onClick={handleDrawerToggle}
                  sx={{ display: { sm: 'none' }, color: theme.palette.primary.contrastText }}
                >
                  <MenuIcon />
                </IconButton>
              </Grid>
            )}
          </div>
          {!isMobile && mounted && !isInitialising && (
            <div tw="flex flex-row justify-end items-center my-4 lg:(my-0)">
              {!isAuthenticated ? (
                <>
                  <Grid item mr={1}>
                    <LinkButton variant="buttonLight" href="/signup">
                      <Typography variant="h5" color="inherit">
                        {t('common:sign up')}
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
                        {t('common:sign in')}
                      </Typography>
                      <PersonIcon color="inherit" sx={{ marginLeft: theme.spacing(1) }} />
                    </LinkButton>
                  </Grid>
                </>
              ) : (
                <>
                  <Grid item>
                    <Navigation />
                  </Grid>
                  <Grid item>
                    <UserPopover />
                  </Grid>
                </>
              )}
            </div>
          )}
          {isMobile && (
            <MobileHeader handleDrawerToggle={handleDrawerToggle} mobileOpen={mobileOpen} />
          )}
        </Grid>
      </Container>
    </div>
  );
}
