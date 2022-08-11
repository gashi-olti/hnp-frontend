import * as React from 'react';
import {
  Button,
  Dialog,
  Typography,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { useTranslation } from 'next-i18next';

import LoadingButton from '@/components/LoadingButton';

type Props = {
  buttonDisabled?: boolean;
  content: string;
  confirmationButtonText?: string;
  hideCancel?: boolean;
  isLoading?: boolean;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
  open: boolean;
  title?: string;
  onConfirm: () => Promise<void>;
  onClose: (event: {}, reason?: 'backdropClick' | 'escapeKeyDown') => void;
};

export default function ActionDialog({
  buttonDisabled = false,
  content,
  confirmationButtonText,
  hideCancel = false,
  isLoading = false,
  maxWidth = 'sm',
  open,
  title,
  onConfirm,
  onClose,
}: Props) {
  const { t } = useTranslation();

  return (
    <Dialog open={open} maxWidth={maxWidth} onClose={onClose} aria-labelledby="action-dialog">
      <div tw="flex flex-col overflow-auto">
        <DialogTitle>
          <Typography variant="h2" component="span">
            {title}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <div tw="text-center" id="action-dialog-description">
            {content}
          </div>
        </DialogContent>
      </div>
      <DialogActions>
        {!hideCancel && (
          <Button variant="text" onClick={onClose}>
            {t('common:cancel')}
          </Button>
        )}
        <LoadingButton
          variant="contained"
          color="primary"
          disabled={buttonDisabled}
          isLoading={isLoading}
          onClick={onConfirm}
        >
          {confirmationButtonText ?? t('common:ok')}
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}
