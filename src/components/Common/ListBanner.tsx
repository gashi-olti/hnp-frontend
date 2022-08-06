import { Box, Grid, Typography } from '@mui/material';
import { ReactNode } from 'react';

interface ListBannerProps {
  header: string;
  subHeader: string;
  content: string;
  children?: ReactNode;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function ListBanner({ header, subHeader, content, children }: ListBannerProps) {
  return (
    <Box
      mb={8}
      tw="bg-gradient-to-r from-sky to-cyan"
      sx={{ position: 'relative', overflow: 'hidden' }}
    >
      <Grid container alignItems="center" sx={{ py: 10 }}>
        <Grid item xs={10} sx={{ mx: { xs: 2, md: 6 } }}>
          <Typography tw="text-white font-bold text-3xl lg:text-7xl" paragraph>
            {header}
          </Typography>
          <Typography tw="text-white font-extrabold text-sm lg:text-xl" component="span">
            {subHeader}{' '}
          </Typography>
          <Typography tw="text-white text-sm lg:text-xl" component="span">
            {content}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}
