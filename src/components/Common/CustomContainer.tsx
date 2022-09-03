import { Container, useTheme, useMediaQuery } from '@mui/material';
import * as React from 'react';

interface CustomContainerProps {
  padding?: number;
  children: React.ReactNode;
}

export default function CustomContainer({ padding = 4, children }: CustomContainerProps) {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <Container
      sx={{
        border: isDesktop ? `1px solid ${theme.palette.grey[300]}` : 'none',
        borderRadius: 0.4,
        padding: isDesktop ? padding : 2,
        // boxShadow: '0px 0px 1px 0px rgba(0,0,0,0.75)',
      }}
    >
      {children}
    </Container>
  );
}
