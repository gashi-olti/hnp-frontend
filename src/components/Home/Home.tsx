import { Container } from '@mui/material';

import HomeBanner from './HomeBanner';
import JobsList from './JobsList';

export default function Home() {
  return (
    <>
      <Container>
        <HomeBanner />
        <JobsList />
      </Container>
    </>
  );
}
