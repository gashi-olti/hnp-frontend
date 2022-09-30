import * as React from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import useSWR from 'swr';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { DateTime } from 'luxon';
import { Button, Grid } from '@mui/material';
import EuroIcon from '@mui/icons-material/Euro';
import dynamic from 'next/dynamic';

import { PostModel } from '@/interfaces/post.interface';
import usePostApi from '@/hooks/usePostApi';
import useFormErrors from '@/hooks/useFormErrors';
import ErrorComponent from '@/components/ErrorComponent';
import LoadingSpinner from '@/components/LoadingSpinner';
import CustomContainer from '@/components/Common/CustomContainer';
import InputController from '@/components/Forms/InputController';
import DatePickerController from '@/components/Forms/DatePickerController';
import JobCategorySelector from '@/components/Forms/JobCategorySelector';
import JobTypeSelector from '@/components/Forms/JobTypeSelector';
import LoadingButton from '@/components/LoadingButton';
import theme from '@/config/theme';

import { postSchema } from './schema';

const ReactRTE = dynamic(() => import('@/components/Forms/RteInputController'), {
  ssr: false,
});

type Props = {
  uuid?: string;
};

export default function CreateOrUpdate({ uuid }: Props) {
  const { t } = useTranslation(['post', 'common', 'validation', 'job']);
  const router = useRouter();
  const { data: post, error: postError } = useSWR<PostModel>(uuid ? `company/posts/${uuid}` : null);
  const { createPost, updatePost, isLoading } = usePostApi();

  const defaultValues = React.useMemo(
    () => ({
      ...post,
      title: post?.title ?? '',
      description: post?.description ?? '',
      type: post?.type ?? null,
      category: post?.category ?? null,
      location: post?.location ?? '',
      positions: post?.positions ?? 0,
      experience: post?.experience ?? '',
      salary: post?.salary ?? '',
      ends: post?.ends ?? DateTime.now().toFormat('dd-MM-yyyy'),
    }),
    [post]
  );

  const { formState, setError, setValue, reset, getValues, handleSubmit, ...methods } =
    useForm<PostModel>({
      mode: 'onBlur',
      resolver: yupResolver(postSchema(t)) as any,
      defaultValues,
    });

  const { handleErrors } = useFormErrors<PostModel>(setError);

  React.useEffect(() => {
    reset({ ...getValues(), ...defaultValues });
  }, [defaultValues, getValues, reset]);

  const submitForm = async (data: PostModel) => {
    try {
      if (post?.uuid) {
        await updatePost(post.uuid, data);
      } else {
        await createPost(data);
      }

      router.push('/company', '/company', { locale: router.locale });
    } catch (err) {
      handleErrors(err, data as PostModel);
    }
  };

  if (uuid && postError) {
    return <ErrorComponent title={t('common:error')} message={t('common:something went wrong')} />;
  }

  if (uuid && !post && !postError) {
    return <LoadingSpinner />;
  }

  return (
    <CustomContainer title={uuid ? t('post:update post title') : t('post:create post title')}>
      <FormProvider
        setError={setError}
        handleSubmit={handleSubmit}
        setValue={setValue}
        getValues={getValues}
        formState={formState}
        reset={reset}
        {...methods}
      >
        <form onSubmit={handleSubmit(submitForm)}>
          <Grid container columnSpacing={2.5}>
            <Grid item xs={12} md={6}>
              <InputController
                control={methods.control}
                errors={formState.errors}
                label={t('post:post title')}
                name="title"
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <JobCategorySelector
                control={methods.control}
                errors={formState.errors}
                setValue={setValue}
                defaultValue={post?.category}
                name="category"
                label={t('post:job category')}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <JobTypeSelector
                control={methods.control}
                errors={formState.errors}
                setValue={setValue}
                defaultValue={post?.type}
                name="type"
                label={t('post:job type')}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <InputController
                control={methods.control}
                errors={formState.errors}
                name="location"
                label={t('post:job location')}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <InputController
                control={methods.control}
                errors={formState.errors}
                name="positions"
                label={t('post:positions')}
                type="number"
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <InputController
                control={methods.control}
                errors={formState.errors}
                name="experience"
                label={t('post:experience')}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <InputController
                control={methods.control}
                errors={formState.errors}
                name="salary"
                label={t('post:salary')}
                InputProps={{
                  endAdornment: (
                    <EuroIcon fontSize="small" sx={{ color: theme.palette.grey[600] }} />
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <DatePickerController
                name="ends"
                label={t('post:deadline')}
                control={methods.control}
                errors={formState.errors}
                views={['year', 'month', 'day']}
                inputFormat={'dd/MM/yyyy'}
                maxDate={new Date(DateTime.local().plus({ month: 1 }).toString())}
                minDate={new Date()}
                required
                disabled={uuid ? true : false}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="description"
                control={methods.control}
                render={({ field: { onChange, value, onBlur }, fieldState: { error } }) => (
                  <ReactRTE
                    onBlur={onBlur}
                    errors={error}
                    initialValue={value}
                    onChange={(data: any) => onChange(data)}
                    placeholder={t('post:description')}
                  />
                )}
              />
            </Grid>
            <Grid
              container
              item
              justifyContent="flex-end"
              spacing={2}
              sx={{ marginY: theme.spacing(2) }}
            >
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => router.push('/company', '/company', { locale: router.locale })}
                >
                  {t('common:cancel')}
                </Button>
              </Grid>
              <Grid item>
                <LoadingButton
                  type="submit"
                  variant="contained"
                  color="primary"
                  isLoading={isLoading}
                >
                  {uuid ? t('post:update post') : t('post:create post')}
                </LoadingButton>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </FormProvider>
    </CustomContainer>
  );
}
