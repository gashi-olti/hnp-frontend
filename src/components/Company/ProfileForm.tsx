import * as React from 'react';
import { useTranslation } from 'next-i18next';
import { Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import dynamic from 'next/dynamic';

import { Company } from '@/interfaces/company.interface';
import useFormErrors from '@/hooks/useFormErrors';
import InputController from '@/components/Forms/InputController';
import LoadingButton from '@/components/LoadingButton';
import useCompanyApi from '@/hooks/useCompanyApi';
import CountrySelector from '@/components/Forms/CountrySelector';
import MediaSingle from '@/components/MediaUpload/MediaSingle';
import MediaMulti from '@/components/MediaUpload/MediaMulti';
import CustomTooltip from '@/components/Common/CustomTooltip';
import CustomContainer from '@/components/Common/CustomContainer';
import CompanySizeSelector from '@/components/Forms/CompanySizeSelector';

import { CompanyProfileForm, profileSchema } from './schema';

const ReactRTE = dynamic(() => import('@/components/Forms/RteInputController'), {
  ssr: false,
});

type ProfileFormProps = {
  company?: Company;
};

export default function ProfileForm({ company }: ProfileFormProps) {
  const { t } = useTranslation(['profile', 'common', 'validation']);
  const { updateProfile, isLoading } = useCompanyApi();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));

  const defaultValues = React.useMemo(
    () => ({
      ...company,
      name: company?.name ?? '',
      number: company?.number ?? '',
      industry: company?.industry ?? '',
      size: company?.size ?? null,
      founded: company?.founded ?? '',
      website: company?.website ?? '',
      description: company?.description ?? '',
      specialties: company?.specialties ?? '',
      city: company?.city ?? '',
      postal_code: company?.postal_code ?? '',
      country: company?.country ?? '',
      phone: company?.phone ?? '',
      cover: company?.cover ?? null,
      media: company?.media?.sort((a, b) => (a?.order || 0) - (b?.order || 0)) ?? [],
    }),
    [company]
  );

  const { control, formState, getValues, reset, setValue, handleSubmit, ...methods } =
    useForm<CompanyProfileForm>({
      mode: 'onBlur',
      resolver: yupResolver(profileSchema(t)) as any,
      defaultValues,
    });

  const { errors } = formState;

  const { handleErrors } = useFormErrors<CompanyProfileForm>(methods.setError);

  React.useEffect(() => {
    reset({ ...getValues(), ...defaultValues });
  }, [defaultValues, getValues, reset]);

  const submitForm = async (data: CompanyProfileForm) => {
    try {
      await updateProfile(data);
    } catch (err) {
      handleErrors(err, data);
    }
  };

  return (
    <CustomContainer title={t('profile:profile title')}>
      <FormProvider
        {...methods}
        control={control}
        setValue={setValue}
        getValues={getValues}
        formState={formState}
        reset={reset}
        handleSubmit={handleSubmit}
      >
        <form onSubmit={handleSubmit(submitForm)}>
          <Grid container columnSpacing={2} mt={isDesktop ? 2 : 0}>
            <Grid item xs={12}>
              <Typography variant="h3">
                {t('profile:company information')}
                <CustomTooltip>{t('profile:company information description')}</CustomTooltip>
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputController
                control={control}
                errors={errors}
                label={t('profile:company name')}
                name="name"
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputController
                control={control}
                errors={errors}
                label={t('profile:company number')}
                name="number"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputController
                control={control}
                errors={errors}
                label={t('profile:company industry')}
                name="industry"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CompanySizeSelector
                defaultValue={defaultValues.size ?? null}
                control={control}
                errors={errors}
                setValue={setValue}
                name="size"
                label={t('profile:company size')}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputController
                control={control}
                errors={errors}
                label={t('profile:company founded')}
                name="founded"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputController
                control={control}
                errors={errors}
                label={t('profile:company website')}
                name="website"
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="description"
                control={control}
                render={({ field: { onChange, value, onBlur }, fieldState: { error } }) => (
                  <ReactRTE
                    onBlur={onBlur}
                    errors={error}
                    initialValue={value}
                    onChange={(data: any) => onChange(data)}
                    placeholder={t('profile:company description')}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <InputController
                control={control}
                errors={errors}
                label={t('profile:company specialties')}
                name="specialties"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputController
                control={control}
                errors={errors}
                label={t('common:city')}
                name="city"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputController
                control={control}
                errors={errors}
                label={t('common:postal code')}
                name="postal_code"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CountrySelector
                defaultValue={company?.country}
                control={control}
                displayAllCountries={true}
                errors={errors}
                setValue={setValue}
                name="country"
                label={t('common:country')}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputController
                control={control}
                errors={errors}
                label={t('common:phone number')}
                name="phone"
                type="tel"
              />
            </Grid>
            <Grid item xs={12} my={2}>
              <Typography variant="h3">
                {t('profile:company logo')}
                <CustomTooltip>{t('common:cover tooltip')}</CustomTooltip>
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <MediaSingle entity="company" name="cover" />
            </Grid>
            <Grid item xs={12} mt={4}>
              <Typography variant="h3">
                {t('profile:company media', { count: 4 - (getValues('media')?.length || 0) })}
                <CustomTooltip>{t('common:company media items')}</CustomTooltip>
              </Typography>
            </Grid>
            <Grid item xs={12} mt={2}>
              <MediaMulti entity="company" name="media" maxItems={4} />
            </Grid>
            <Grid item container mt={4} xs={12} justifyContent="flex-end">
              <LoadingButton
                type="submit"
                color="primary"
                variant="contained"
                isLoading={isLoading}
              >
                {t('profile:save profile')}
              </LoadingButton>
            </Grid>
          </Grid>
        </form>
      </FormProvider>
    </CustomContainer>
  );
}
