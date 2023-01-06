import * as React from 'react';
import { Box, Grid, styled, useTheme, useMediaQuery, Card, CardContent } from '@mui/material';

import NewBadge from './NewBadge';

interface CommonHeroProps {
  image?: string;
  title?: string;
  altImage?: string;
  newBadge?: boolean | null;
  children?: React.ReactNode;
}

const ImageStyle = styled('img')(() => ({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
}));

export default function CommonHero({ image, title = '', newBadge, children }: CommonHeroProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Grid container alignItems="flex-start" justifyContent="center" spacing={isMobile ? 2 : 4}>
      {/* LEFTSIDE */}
      <Grid item xs={12} md={5}>
        <Box
          display="block"
          minHeight={isMobile ? '17rem' : '25rem'}
          // height="100vh"
          tw="relative overflow-hidden rounded-md"
        >
          {newBadge && <NewBadge top="32px" left="-144px" />}
          {image ? (
            <ImageStyle title={title} src={image} tw="bg-gradient-to-r from-sky to-cyan" />
          ) : (
            <Box
              tw="bg-gradient-to-r from-sky to-cyan"
              sx={{
                overflow: 'hidden',
                position: 'absolute',
                bottom: 0,
                width: '100%',
                height: '100%',
              }}
            />
          )}
        </Box>
      </Grid>

      {/* RIGHTSIDE */}
      <Grid container item xs={12} md={7}>
        <Card elevation={2}>
          <CardContent
            sx={{
              padding: 2,
            }}
          >
            {children}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
