import * as React from 'react';
import { Checkbox, Grid, GridProps, InputAdornment, ListItemText, MenuItem } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'next-i18next';
import useSWR from 'swr';
import SearchIcon from '@mui/icons-material/Search';
import { ChangeEvent } from 'react';

import { JobPositionInterface, JobPositionType, JobType } from '@/interfaces/job.interface';
import { City, Location } from '@/interfaces/city.interface';

import InputController from '../Forms/InputController';
import SelectController from '../Forms/SelectController';

const ITEM_HEIGHT = 68;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      borderRadius: 20,
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
    },
  },
};

const getItemList = (data: JobPositionType[], jobCategoryChecked: string[]) => {
  return data.map((category: JobPositionType) => {
    const jobPositionItem = category.job_position.map((jobPosition: JobPositionInterface) => (
      <MenuItem key={jobPosition.name} value={jobPosition.name}>
        <Checkbox tw="pl-12" checked={jobCategoryChecked.indexOf(jobPosition.name) > -1} />
        <ListItemText primary={jobPosition.name} />
      </MenuItem>
    ));

    return [
      <MenuItem key={category.category} value={category.category}>
        <Checkbox checked={jobCategoryChecked.indexOf(category.category) > -1} />
        <ListItemText primary={category.category} />
      </MenuItem>,
      jobPositionItem,
    ];
  });
};

const getCityList = (data: Location[], countryChecked: string[], cityChecked: string[]) => {
  return data
    .filter((country: Location) => countryChecked.includes(country.country_code))
    .map((location) =>
      location.cities.map((city: City) => (
        <MenuItem key={city.name} value={city.name}>
          <Checkbox checked={cityChecked.indexOf(city.name) > -1} />
          <ListItemText primary={city.name} />
        </MenuItem>
      ))
    );
};

interface HomeFilterProps extends GridProps {}

export default function HomeFilter({ ...props }: HomeFilterProps) {
  const { t } = useTranslation(['common']);
  const [jobTypeChecked, setJobTypeChecked] = React.useState<string[]>([]);
  const [jobCategoryChecked, setJobCategoryChecked] = React.useState<string[]>([]);
  const [countryChecked, setCountryChecked] = React.useState<string[]>([]);
  const [cityChecked, setCityChecked] = React.useState<string[]>([]);

  const { data: jobType } = useSWR<JobType[]>('job/types');
  const { data: positionType } = useSWR<JobPositionType[]>('job/positiontypes');
  const { data: locations } = useSWR<Location[]>('job/locations');

  const {
    control,
    formState: { errors },
  } = useFormContext();

  const handleJobTypeChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const {
      target: { value },
    } = event;
    setJobTypeChecked(typeof value === 'string' ? value.split(' | ') : value);
  };

  const handleJobCategoryChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const {
      target: { value },
    } = event;
    setJobCategoryChecked(typeof value === 'string' ? value.split(' | ') : value);
  };

  const handleCountryChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const {
      target: { value },
    } = event;
    setCountryChecked(typeof value === 'string' ? value.split(' | ') : value);
  };

  const handleCityChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const {
      target: { value },
    } = event;
    setCityChecked(typeof value === 'string' ? value.split(' | ') : value);
  };

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
              <InputAdornment position="start" tw="mr-2">
                <SearchIcon color="disabled" />
              </InputAdornment>
            ),
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 50,
              padding: '0 10px',
              '& > fieldset': {
                borderWidth: '1px !important',
                borderRadius: 50,
              },
            },
          }}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <SelectController
          control={control}
          errors={errors}
          name="jobcategory"
          multiple={true}
          label={t('job:job category')}
          value={jobCategoryChecked}
          onChange={handleJobCategoryChange}
          menuProps={MenuProps}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 50,
              padding: '0 10px',
              '& > fieldset': {
                borderWidth: '1px !important',
                borderRadius: 50,
              },
            },
          }}
        >
          <MenuItem value="" disabled sx={{ display: 'none' }} />
          {positionType && getItemList(positionType, jobCategoryChecked)}
        </SelectController>
      </Grid>
      <Grid item xs={12} md={4}>
        <SelectController
          control={control}
          errors={errors}
          name="jobtype"
          multiple={true}
          label={t('job:job type')}
          value={jobTypeChecked}
          onChange={handleJobTypeChange}
          menuProps={MenuProps}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 50,
              padding: '0 10px',
              '& > fieldset': {
                borderWidth: '1px !important',
                borderRadius: 50,
              },
            },
          }}
        >
          <MenuItem value="" disabled sx={{ display: 'none' }} />
          {jobType &&
            jobType?.map((job: JobType) => (
              <MenuItem key={job.category} value={job.category}>
                <Checkbox checked={jobTypeChecked.indexOf(job.category) > -1} />
                <ListItemText primary={job.category} />
              </MenuItem>
            ))}
        </SelectController>
      </Grid>
      <Grid item xs={6} md={4}>
        <SelectController
          control={control}
          errors={errors}
          name="country"
          multiple={true}
          label={t('common:country')}
          value={countryChecked}
          onChange={handleCountryChange}
          menuProps={MenuProps}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 50,
              padding: '0 10px',
              '& > fieldset': {
                borderWidth: '1px !important',
                borderRadius: 50,
              },
            },
          }}
        >
          <MenuItem value="" disabled sx={{ display: 'none' }} />
          {locations &&
            locations?.map((country: Location) => (
              <MenuItem key={country.country_name} value={country.country_code}>
                <Checkbox checked={countryChecked.indexOf(country.country_code) > -1} />
                <ListItemText primary={country.country_name} />
              </MenuItem>
            ))}
        </SelectController>
      </Grid>
      <Grid item xs={6} md={4}>
        <SelectController
          control={control}
          errors={errors}
          name="city"
          multiple={true}
          label={t('common:city')}
          value={cityChecked}
          onChange={handleCityChange}
          menuProps={MenuProps}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 50,
              padding: '0 10px',
              '& > fieldset': {
                borderWidth: '1px !important',
                borderRadius: 50,
              },
            },
          }}
        >
          <MenuItem value="" disabled sx={{ display: 'none' }} />
          {locations && getCityList(locations, countryChecked, cityChecked)}
        </SelectController>
      </Grid>
    </Grid>
  );
}
