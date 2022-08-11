import * as React from 'react';
import { Button, ButtonProps, CircularProgress, styled } from '@mui/material';

const CircularProgressButton = styled(CircularProgress)(() => ({
  position: 'absolute',
  color: 'inherit !important',
}));

type LoadingButtonProps = {
  disabled?: boolean;
  isLoading: boolean;
};

export default function LoadingButton({
  children,
  isLoading,
  disabled,
  ...allTheProps
}: React.PropsWithChildren<LoadingButtonProps & ButtonProps>) {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Button disabled={isLoading || disabled} {...allTheProps} tw="relative">
      {children}
      {isLoading && <CircularProgressButton size={20} />}
    </Button>
  );
}
