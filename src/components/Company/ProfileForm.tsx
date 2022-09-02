import * as React from 'react';
import { useTranslation } from 'next-i18next';
import { Grid, MenuItem, Typography } from '@mui/material';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import dynamic from 'next/dynamic';

import { CompanyProfile } from '@/interfaces/company.interface';
import useFormErrors from '@/hooks/useFormErrors';
import InputController from '@/components/Forms/InputController';
import SelectController from '@/components/Forms/SelectController';
import companySize, { CompanySizeInterface } from '@/config/companySize';
import LoadingButton from '@/components/LoadingButton';

import CountrySelector from '../Forms/CountrySelector';
import MediaSingle from '../MediaUpload/MediaSingle';
import MediaMulti from '../MediaUpload/MediaMulti';
import CustomTooltip from '../Common/CustomTooltip';
import CustomContainer from '../Common/CustomContainer';

import { CompanyProfileForm, profileSchema } from './schema';

const ReactRTE = dynamic(() => import('@/components/Forms/RteInputController'), {
  ssr: false,
});

type ProfileFormProps = {
  company?: CompanyProfile;
};

export default function ProfileForm({ company }: ProfileFormProps) {
  const { t } = useTranslation(['profile', 'common', 'validation']);

  const defaultValues = React.useMemo(
    () => ({
      ...company,
      name: company?.name ?? '',
      number: company?.number ?? '',
      industry: company?.industry ?? '',
      size: company?.size ?? '',
      founded: company?.founded ?? '',
      website: company?.website ?? '',
      description: company?.description ?? '',
      specialties: company?.specialties ?? '',
      city: company?.city ?? '',
      postal_code: company?.postal_code ?? '',
      country: company?.country ?? '',
      phone: company?.phone ?? '',
      cover: company?.cover ?? null,
      media: company?.media?.sort((a, b) => (a?.order || 0) - (b?.order || 0)),
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
      // await updateProfile(data);
    } catch (err) {
      handleErrors(err, data);
    }
  };

  return (
    <CustomContainer>
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
          <Grid container columnSpacing={2}>
            <Grid item xs={12} mb={4}>
              <Typography variant="h2">{t('profile:profile title')}</Typography>
            </Grid>
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
              <SelectController
                control={control}
                errors={errors}
                label={t('profile:company size')}
                name="size"
              >
                <MenuItem value="" tw="hidden"></MenuItem>
                {companySize.map((size: CompanySizeInterface) => (
                  <MenuItem key={size.key} value={size.value}>
                    {size.value}
                  </MenuItem>
                ))}
              </SelectController>
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
              />
            </Grid>
            <Grid item xs={12} my={2}>
              <Typography variant="h3">
                {t('profile:company logo')}
                {/* <CustomTooltip>{t('profile:company logo description')}</CustomTooltip> */}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <MediaSingle entity="cover" name="cover" />
            </Grid>
            <Grid item xs={12} mt={4}>
              <Typography variant="h3">
                {t('profile:company logo')}
                <CustomTooltip>{t('profile:company logo description')}</CustomTooltip>
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <MediaMulti entity="cover" name="media" maxItems={4} />
            </Grid>
            <Grid item container mt={4} xs={12} justifyContent="flex-end">
              <LoadingButton type="submit" color="primary" variant="contained" isLoading={false}>
                {t('profile:save profile')}
              </LoadingButton>
            </Grid>
          </Grid>
        </form>
      </FormProvider>
    </CustomContainer>
  );
}
