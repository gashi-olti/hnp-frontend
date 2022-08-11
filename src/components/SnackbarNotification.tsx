import { Alert, AlertColor, AlertTitle, Snackbar } from '@mui/material';
import * as React from 'react';
import CancelIcon from '@mui/icons-material/Cancel';
import ErrorIcon from '@mui/icons-material/Error';
import InfoIcon from '@mui/icons-material/Info';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

type SnackbarNotificationProps = {
  duration?: number;
  id: string | undefined;
  message: string;
  open: boolean;
  type?: AlertColor;
  title?: string;
  onClose: () => void;
};

export default function SnackbarNotification({
  duration = 6000,
  message,
  id,
  open = false,
  type = 'success',
  onClose,
  title = '',
}: SnackbarNotificationProps) {
  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      autoHideDuration={duration}
      ContentProps={{
        'aria-describedby': 'message-id',
      }}
      key={id}
      open={open}
      onClose={onClose}
    >
      <Alert
        variant="secondary"
        severity={type}
        onClose={onClose}
        iconMapping={{
          error: <CancelIcon />,
          warning: <ErrorIcon />,
          info: <InfoIcon />,
          success: <CheckCircleIcon />,
        }}
      >
        {title && <AlertTitle>{title}</AlertTitle>}
        {message}
      </Alert>
    </Snackbar>
  );
}
