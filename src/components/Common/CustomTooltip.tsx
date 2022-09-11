import { Box, Popover, Typography } from '@mui/material';
import React from 'react';
import HelpIcon from '@mui/icons-material/Help';

import theme from '@/config/theme';

interface CustomTooltipProps {
  heading?: string;
  children: React.ReactNode;
  size?: 'inherit' | 'large' | 'medium' | 'small' | undefined;
  disableGutters?: boolean;
}

export default function CustomTooltip({
  heading,
  children,
  size = 'small',
  disableGutters,
}: CustomTooltipProps) {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Box onMouseEnter={handlePopoverOpen} onMouseLeave={handlePopoverClose} component="span">
        <HelpIcon
          fontSize={size}
          sx={{
            marginX: (!disableGutters && 1) || undefined,
            cursor: 'pointer',
            color: theme.palette.text.secondary,
            '&:hover': {
              color: theme.palette.grey[600],
            },
          }}
        />
      </Box>
      <Popover
        style={{ marginLeft: theme.spacing(5) }}
        id="mouse-over-popup"
        sx={{ pointerEvents: 'none' }}
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'left',
        }}
        onClose={handlePopoverClose}
        PaperProps={{
          sx: { maxWidth: 350, borderRadius: 0, padding: 2 },
        }}
      >
        <Typography variant="h5">{heading}</Typography>
        <Typography variant="body2">{children}</Typography>
      </Popover>
    </>
  );
}
