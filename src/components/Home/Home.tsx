import { Container } from '@mui/material';
import { useRouter } from 'next/router';
import { FormProvider, useForm } from 'react-hook-form';

import HomeBanner from './HomeBanner';
import HomeFilter from './HomeFilter';

interface FieldValues {
  query: string;
  jobposition: string;
  jobtype: string;
  city: string;
  country: string;
}

export default function Home() {
  const router = useRouter();

  const { ...methods } = useForm<FieldValues>({
    mode: 'onBlur',
    defaultValues: {
      query: (router.query.query as string) ?? '',
      jobposition: (router.query.query as string) ?? '',
      jobtype: (router.query.query as string) ?? '',
      city: (router.query.query as string) ?? '',
      country: (router.query.query as string) ?? '',
    },
  });

  return (
    <>
      <Container>
        <HomeBanner />
        <FormProvider {...methods}>
          <HomeFilter />
        </FormProvider>
      </Container>
    </>
  );
}
