import { Container } from '@mui/material';

import HomeBanner from './HomeBanner';
import PostsList from './PostsList';

export default function Home() {
  return (
    <>
      <Container>
        <HomeBanner />
        <PostsList />
      </Container>
    </>
  );
}
