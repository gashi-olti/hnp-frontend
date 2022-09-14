import * as React from 'react';
import {
  Avatar,
  Box,
  Divider,
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

function stringToColor(string: string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name: string) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(' ')[0][0]}`,
  };
}

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
      href: '/company',
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
          <Avatar {...stringAvatar('Hajdenpun')} tw="shadow-2xl" />
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
              <Divider />
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
