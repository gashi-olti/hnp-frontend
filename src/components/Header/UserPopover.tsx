import * as React from 'react';
import {
  Avatar,
  Box,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from '@mui/material';
import { TFunction, useTranslation } from 'next-i18next';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import Filter3Icon from '@mui/icons-material/Filter3';
import LogoutIcon from '@mui/icons-material/Logout';

import { useAuth } from '@/providers/AuthProvider';
import { ProfileTypes } from '@/interfaces/user.interface';
import theme from '@/config/theme';

import CustomLink from '../CustomLink';

interface UserPopoverProps {}

const getSections = (t: TFunction) => {
  const companySections = [
    {
      icon: <ManageAccountsIcon fontSize="small" sx={{ color: theme.palette.text.primary }} />,
      label: t('common:my profile'),
      href: '/company/profile',
    },
    {
      icon: <Filter3Icon fontSize="small" sx={{ color: theme.palette.text.primary }} />,
      label: t('common:my posts'),
      href: '/company/posts',
    },
  ];

  return companySections;
};

const UserPopover: React.FC<UserPopoverProps> = () => {
  const { t } = useTranslation(['common', 'profile']);
  const { logout, userProfile } = useAuth();

  const anchorRef = React.useRef<HTMLButtonElement | null>(null);
  const [open, setOpen] = React.useState<boolean>(false);

  const handleOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  return (
    <>
      <Tooltip title={t('profile:account settings')} arrow>
        <IconButton onClick={handleOpen} ref={anchorRef} size="small">
          <Avatar>H</Avatar>
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={anchorRef.current}
        anchorOrigin={{
          horizontal: 'right',
          vertical: 'bottom',
        }}
        transformOrigin={{
          horizontal: 'right',
          vertical: 'top',
        }}
        keepMounted
        onClose={handleClose}
        open={open}
        PaperProps={{
          elevation: 0,
          sx: {
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            minWidth: 200,
          },
        }}
      >
        {![ProfileTypes.Admin].includes(userProfile ?? 0) &&
          getSections(t).map((link) => (
            <CustomLink key={link.label} href={link.href}>
              <MenuItem sx={{ ':hover': { backgroundColor: theme.palette.grey[200] } }}>
                <ListItemIcon>{link.icon}</ListItemIcon>
                <ListItemText
                  primary={
                    <Typography color="textPrimary" variant="subtitle2">
                      {link.label}
                    </Typography>
                  }
                />
              </MenuItem>
            </CustomLink>
          ))}
        <Box onClick={logout}>
          <MenuItem sx={{ ':hover': { backgroundColor: theme.palette.grey[200] } }}>
            <ListItemIcon>
              <LogoutIcon fontSize="small" sx={{ color: theme.palette.text.primary }} />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography color="textPrimary" variant="subtitle2">
                  {t('common:logout')}
                </Typography>
              }
            />
          </MenuItem>
        </Box>
      </Menu>
    </>
  );
};

export default UserPopover;
