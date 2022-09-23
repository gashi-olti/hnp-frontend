import * as React from 'react';
import {
  Grid,
  GridProps,
  InputAdornment,
  Tooltip,
  useTheme,
  useMediaQuery,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'next-i18next';
import useSWR from 'swr';
import SearchIcon from '@mui/icons-material/Search';

import { Location } from '@/interfaces/city.interface';
import getJobCategory from '@/config/jobCategory';
import getJobType from '@/config/jobType';

import InputController from '../Forms/InputController';
import CountryFilterSelector from '../Forms/CountryFilterSelector';
import JobCategoryFilterSelector from '../Forms/JobCategoryFilterSelector';
import JobTypeFilterSelector from '../Forms/JobTypeFilterSelector';
import CityFilterSelector from '../Forms/CityFilterSelector';

const getCitiesList = (data: Location[] | undefined) => {
  let citites: any[] = [];

  data?.filter((country: Location) => country.cities.map((city) => citites.push(city)));

  return citites;
};

interface HomeFilterProps extends GridProps {}

export default function JobsFilter({ ...props }: HomeFilterProps) {
  const { t } = useTranslation(['common']);
  const [countries, setCountries] = React.useState<Location[] | undefined>([]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const { data: locations } = useSWR<Location[]>('job/locations');

  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Grid container {...props} wrap="wrap" columnSpacing={2}>
      <Grid item xs={12} md={6}>
        <InputController
          control={control}
          errors={errors}
          name="query"
          margin="none"
          label={t('job:search job post')}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon color="disabled" />
              </InputAdornment>
            ),
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              '& > fieldset': {
                borderWidth: '1px !important',
                // borderRadius: isMobile ? 0.3 : 50,
              },
            },
          }}
        />
      </Grid>

      {isMobile ? (
        <Grid container item xs={12} mt={1} justifyContent="center" alignContent="center">
          <Accordion
            disableGutters
            square
            elevation={0}
            sx={{ borderWidth: `1px !important`, borderColor: `${theme.palette.grey[300]}` }}
            tw="w-full"
          >
            <AccordionSummary
              expandIcon={
                <Tooltip title="Filters" arrow>
                  <FilterListIcon fontSize="medium" />
                </Tooltip>
              }
            >
              <Typography variant="body1">Filters</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid item xs={12}>
                <JobCategoryFilterSelector
                  control={control}
                  errors={errors}
                  name="jobcategory"
                  label={t('job:job category')}
                  options={getJobCategory(t)}
                  setValue={() => {}}
                />
              </Grid>
              <Grid item xs={12}>
                <JobTypeFilterSelector
                  control={control}
                  errors={errors}
                  name="jobtype"
                  label={t('job:job type')}
                  options={getJobType(t)}
                  setValue={() => {}}
                />
              </Grid>
              <Grid item xs={12}>
                {locations && (
                  <CountryFilterSelector
                    control={control}
                    errors={errors}
                    name="country"
                    label={t('common:country')}
                    options={locations}
                    setValue={() => {}}
                    setCountries={setCountries}
                  />
                )}
              </Grid>
              <Grid item xs={12}>
                <CityFilterSelector
                  control={control}
                  errors={errors}
                  name="city"
                  label={t('common:city')}
                  options={getCitiesList(countries)}
                  setValue={() => {}}
                />
              </Grid>
            </AccordionDetails>
          </Accordion>
        </Grid>
      ) : (
        <>
          <Grid item xs={12} md={6}>
            <JobCategoryFilterSelector
              control={control}
              errors={errors}
              name="jobcategory"
              label={t('job:job category')}
              options={getJobCategory(t)}
              setValue={() => {}}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <JobTypeFilterSelector
              control={control}
              errors={errors}
              name="jobtype"
              label={t('job:job type')}
              options={getJobType(t)}
              setValue={() => {}}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            {locations && (
              <CountryFilterSelector
                control={control}
                errors={errors}
                name="country"
                label={t('common:country')}
                options={locations}
                setValue={() => {}}
                setCountries={setCountries}
              />
            )}
          </Grid>
          <Grid item xs={12} md={4}>
            <CityFilterSelector
              control={control}
              errors={errors}
              name="city"
              label={t('common:city')}
              options={getCitiesList(countries)}
              setValue={() => {}}
            />
          </Grid>
        </>
      )}
    </Grid>
  );
}
