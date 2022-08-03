import * as React from 'react';
import { Box, Button, ListItemText, MenuItem, Popover, Typography } from '@mui/material';
import { TFunction, useTranslation } from 'next-i18next';
import PersonIcon from '@mui/icons-material/Person';

import { useAuth } from '@/providers/AuthProvider';
import { ProfileTypes } from '@/interfaces/user.interface';

import CustomLink from '../CustomLink';

interface UserPopoverProps {}

const getSections = (t: TFunction) => {
  const companySections = [
    {
      label: t('common:my profile'),
      href: '/company/profile',
    },
    {
      label: t('common:my posts'),
      href: '/company/posts',
    },
  ];

  return companySections;
};

const UserPopover: React.FC<UserPopoverProps> = () => {
  const { t } = useTranslation(['common']);
  const { logout, userProfile } = useAuth();

  const anchorRef = React.useRef<HTMLButtonElement | null>(null);
  const [open, setOpen] = React.useState<boolean>(false);

  const handleOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  if (!userProfile) return null;

  return (
    <>
      <Button onClick={handleOpen} ref={anchorRef} variant="buttonSuccess">
        <PersonIcon />
      </Button>

      <Popover
        anchorEl={anchorRef.current}
        anchorOrigin={{
          horizontal: 'center',
          vertical: 'bottom',
        }}
        keepMounted
        onClose={handleClose}
        open={open}
      >
        {![ProfileTypes.Admin].includes(userProfile) &&
          getSections(t).map((link) => (
            <CustomLink key={link.label} href={link.href}>
              <MenuItem sx={{ ':hover': { backgroundColor: '#fddbba' } }}>
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
          <MenuItem sx={{ ':hover': { backgroundColor: '#fddbba' } }}>
            <ListItemText
              primary={
                <Typography color="textPrimary" variant="subtitle2">
                  {t('common:logout')}
                </Typography>
              }
            />
          </MenuItem>
        </Box>
      </Popover>
    </>
  );
};

export default UserPopover;
