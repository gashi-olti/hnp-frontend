import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import NotesIcon from '@mui/icons-material/Notes';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import Filter3Icon from '@mui/icons-material/Filter3';
import LogoutIcon from '@mui/icons-material/Logout';
import CloseIcon from '@mui/icons-material/Close';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import { TFunction, useTranslation } from 'next-i18next';
import * as React from 'react';

import theme from '@/config/theme';
import { ProfileTypes } from '@/interfaces/user.interface';
import { useAuth } from '@/providers/AuthProvider';

import CustomLink from '../CustomLink';

import LanguageSelector from './LanguageSelector';

interface MobileHeaderProps {
  handleDrawerToggle: () => void;
  mobileOpen: boolean;
}

const getPages = (t: TFunction) => {
  const pages = [
    {
      icon: <HomeOutlinedIcon sx={{ color: theme.palette.text.primary }} />,
      label: t('common:home'),
      href: '/',
    },
    {
      icon: <AddCircleOutlineOutlinedIcon sx={{ color: theme.palette.text.primary }} />,
      label: t('common:create post'),
      href: '/company/post/create',
    },
    {
      icon: <NotesIcon sx={{ color: theme.palette.text.primary }} />,
      label: t('common:contact'),
      href: '/contact',
    },
  ];

  return pages;
};

const getEntries = (t: TFunction) => {
  const entries = [
    {
      icon: <LoginOutlinedIcon sx={{ color: theme.palette.text.primary }} />,
      label: t('common:sign in'),
      href: '/login',
    },
    {
      icon: <PersonAddAltOutlinedIcon sx={{ color: theme.palette.text.primary }} />,
      label: t('common:sign up'),
      href: '/signup',
    },
  ];

  return entries;
};

const getSections = (t: TFunction) => {
  const companySections = [
    {
      icon: <ManageAccountsOutlinedIcon sx={{ color: theme.palette.text.primary }} />,
      label: t('common:my profile'),
      href: '/company/profile',
    },
    {
      icon: <Filter3Icon sx={{ color: theme.palette.text.primary }} />,
      label: t('common:my posts'),
      href: '/company/posts',
    },
  ];

  return companySections;
};

export default function MobileHeader({ handleDrawerToggle, mobileOpen }: MobileHeaderProps) {
  const { t } = useTranslation(['common']);
  const { isAuthenticated, logout, userProfile } = useAuth();

  return (
    <Box sx={{ display: 'flex ' }}>
      <Box component="nav" sx={{ width: { sm: '80%' }, flexShrink: { sm: 0 } }}>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open perfomance on mobile
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: '80%' },
          }}
        >
          <div>
            <Toolbar tw="bg-gradient-to-r from-sky to-cyan">
              <Stack
                width={1}
                direction="row"
                justifyContent="space-between"
                alignContent="center"
                paddingY={2.5}
              >
                <Box tw="mt-1">
                  <LanguageSelector />
                </Box>
                <IconButton
                  onClick={handleDrawerToggle}
                  sx={{ color: theme.palette.primary.contrastText }}
                >
                  <CloseIcon />
                </IconButton>
              </Stack>
            </Toolbar>
            {isAuthenticated && (
              <List>
                {![ProfileTypes.Admin].includes(userProfile ?? 0) &&
                  getSections(t).map((link) => (
                    <CustomLink key={link.label} href={link.href}>
                      <MenuItem sx={{ ':hover': { backgroundColor: theme.palette.grey[200] } }}>
                        <ListItemIcon sx={{ ml: 1 }}>{link.icon}</ListItemIcon>
                        <ListItemText
                          sx={{ ml: 2 }}
                          primary={
                            <Typography color="textPrimary" variant="subtitle2" tw="text-lg">
                              {link.label}
                            </Typography>
                          }
                        />
                      </MenuItem>
                    </CustomLink>
                  ))}
              </List>
            )}
            <Divider />
            <List>
              {getPages(t).map((link) => (
                <CustomLink key={link.label} href={link.href}>
                  <MenuItem sx={{ ':hover': { backgroundColor: theme.palette.grey[200] } }}>
                    <ListItemIcon sx={{ ml: 1 }}>{link.icon}</ListItemIcon>
                    <ListItemText
                      sx={{ ml: 2 }}
                      primary={
                        <Typography color="textPrimary" variant="subtitle2" tw="text-lg">
                          {link.label}
                        </Typography>
                      }
                    />
                  </MenuItem>
                </CustomLink>
              ))}
            </List>
            <Divider />
            <List>
              {isAuthenticated ? (
                <Box onClick={logout}>
                  <MenuItem sx={{ ':hover': { backgroundColor: theme.palette.grey[200] } }}>
                    <ListItemIcon sx={{ ml: 1 }}>
                      <LogoutIcon sx={{ color: theme.palette.text.primary }} />
                    </ListItemIcon>
                    <ListItemText
                      sx={{ ml: 2 }}
                      primary={
                        <Typography color="textPrimary" variant="subtitle2" tw="text-lg">
                          {t('common:logout')}
                        </Typography>
                      }
                    />
                  </MenuItem>
                </Box>
              ) : (
                <>
                  {getEntries(t).map((link) => (
                    <CustomLink key={link.label} href={link.href}>
                      <MenuItem sx={{ ':hover': { backgroundColor: theme.palette.grey[200] } }}>
                        <ListItemIcon sx={{ ml: 1 }}>{link.icon}</ListItemIcon>
                        <ListItemText
                          sx={{ ml: 2 }}
                          primary={
                            <Typography color="textPrimary" variant="subtitle2" tw="text-lg">
                              {link.label}
                            </Typography>
                          }
                        />
                      </MenuItem>
                    </CustomLink>
                  ))}
                </>
              )}
            </List>
            <Divider />
          </div>
        </Drawer>
      </Box>
    </Box>
  );
}
