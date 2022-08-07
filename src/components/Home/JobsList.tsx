import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

interface FieldValues {
  query: string;
  jobposition: string;
  jobtype: string;
  city: string;
  country: string;
}

export default function JobsList() {
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
      <FormProvider {...methods}>
        <HomeFilter />
      </FormProvider>
    </>
  );
}
