import { Box, Grid, Pagination } from '@mui/material';
import { useRouter } from 'next/router';
import { FormProvider, useForm } from 'react-hook-form';

import List from '@/components/Posts';
import { JobModel } from '@/interfaces/job.interface';

import JobsFilter from './JobsFilter';

const data = [
  {
    uuid: 'test12345',
    title: 'Job Post 1',
    description: 'This is first job post...',
    new_post: true,
  },
  {
    uuid: 'test123456',
    title: 'Job Post 2',
    description: 'This is the second job post...',
    new_post: true,
  },
  {
    uuid: 'test123457',
    title: 'this is a post',
    description: 'This is the third job post...',
    new_post: false,
  },
];

interface FieldValues {
  query: string;
  jobposition: string;
  jobtype: string;
  city: string;
  country: string;
}

export default function PostsList() {
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
      <Box my={4}>
        <FormProvider {...methods}>
          <JobsFilter />
        </FormProvider>
      </Box>

      <Grid container spacing={3} my={1}>
        {data.map((jobPost: JobModel) => (
          <Grid key={jobPost.uuid} item xs={12} md={6} lg={3}>
            <List data={jobPost} />
          </Grid>
        ))}
      </Grid>

      <div tw="flex justify-end my-10">
        <Pagination variant="outlined" count={12} page={1} />
      </div>
    </>
  );
}
