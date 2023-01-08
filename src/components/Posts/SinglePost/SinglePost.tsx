import * as React from 'react';
import { Container, Grid, useTheme, useMediaQuery } from '@mui/material';

import { PostModel } from '@/interfaces/post.interface';

import Hero from './Hero';
import EmployementDescription from './EmployementDescription';

interface SinglePostProps {
  post: PostModel;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function SinglePost({ post }: SinglePostProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Container sx={{ mb: { xs: 2, md: 4 }, mt: { xs: 0, md: 2 } }}>
      <Grid container rowSpacing={isMobile ? 2 : 4}>
        <Grid item xs={12}>
          <Hero data={post} />
        </Grid>

        <Grid item xs={12}>
          <EmployementDescription uuid={post.company?.uuid} data={post.description} />
        </Grid>
      </Grid>
    </Container>
  );
}
