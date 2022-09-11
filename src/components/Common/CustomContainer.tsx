import { Container, useTheme, useMediaQuery, Typography, Box } from '@mui/material';
import * as React from 'react';

interface CustomContainerProps {
  title: string;
  padding?: number;
  children: React.ReactNode;
}

export default function CustomContainer({ title, padding = 4, children }: CustomContainerProps) {
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
      <Box
        sx={{
          position: isDesktop ? 'absolute' : 'inline-block',
          marginTop: isDesktop ? -6.1 : -4,
          paddingX: isDesktop ? 1 : 0,
          backgroundColor: 'white',
          paddingBottom: !isDesktop ? 2 : 0,
        }}
      >
        <Typography variant="h2" component="span">
          {title}
        </Typography>
      </Box>
      {children}
    </Container>
  );
}
