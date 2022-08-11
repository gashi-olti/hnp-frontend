/* eslint-disable react/jsx-props-no-spreading */
import { FieldErrors, useController, UseFormSetValue } from 'react-hook-form';
import {
  Select,
  FormControl,
  FormHelperText,
  useMediaQuery,
  TextField,
  InputLabel,
  useTheme,
  Autocomplete,
} from '@mui/material';
import { useTranslation } from 'next-i18next';
import React from 'react';

import countries, { CountryInterface } from '@/config/countries';

const allCountries = require('i18n-iso-countries');
allCountries.registerLocale(require('i18n-iso-countries/langs/sq.json'));

type CountrySelectorProps = {
  control: any;
  errors: FieldErrors;
  name: string;
  label: string;
  setValue: UseFormSetValue<any>;
  emptySelection?: boolean;
  defaultValue?: string;
  displayAllCountries?: boolean;
  disabled?: boolean;
  className?: string;
  required?: boolean;
};

export default function CountrySelector({
  control,
  errors,
  name,
  label,
  setValue,
  emptySelection,
  disabled,
  defaultValue = '',
  className,
  required,
  displayAllCountries = false,
  ...props
}: CountrySelectorProps) {
  const { t } = useTranslation('common');

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [selectedCountry, setSelectedCountry] = React.useState<CountryInterface | null>(null);

  const dispayCountries: CountryInterface[] = React.useMemo(() => {
    if (displayAllCountries) {
      const allCountriesObj = allCountries.getNames('sq', { select: 'official' });
      return Object.keys(allCountriesObj).map((key) => ({ key, value: allCountriesObj[key] }));
    } else {
      return countries;
    }
  }, [displayAllCountries]);

  const {
    field: { ref, ...inputProps },
  } = useController({
    name,
    control,
    defaultValue,
  });

  React.useEffect(() => {
    if (defaultValue) {
      setSelectedCountry(
        dispayCountries.find((country: CountryInterface) => country.key === defaultValue) || null
      );
    }
  }, [defaultValue, dispayCountries]);

  if (isMobile) {
    return (
      <FormControl className={className} fullWidth disabled={disabled}>
        <InputLabel required={required} htmlFor={`country-selector-${name}`}>
          {label}
        </InputLabel>
        <Select
          native
          {...props}
          inputProps={{
            ...inputProps,
            id: `country-selector-${name}`,
          }}
          inputRef={ref}
          error={!!errors[name]}
          fullWidth
        >
          {emptySelection && <option aria-label="emptySelection" value="" />}
          {dispayCountries.map((country) => (
            <option key={country.value} value={country.key}>
              {t(country.value)}
            </option>
          ))}
        </Select>
        {errors[name] && <FormHelperText error>{errors[name].message}</FormHelperText>}
      </FormControl>
    );
  }

  return (
    <Autocomplete
      {...inputProps}
      ref={ref}
      id={`country-selector-${name}`}
      options={dispayCountries}
      getOptionLabel={(option: any) => t(option.value)}
      disableClearable
      onChange={(_event, newValue) => {
        setValue(name, newValue?.key, { shouldValidate: true, shouldDirty: true });
        setSelectedCountry(newValue);
      }}
      value={selectedCountry as any}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          required
          inputProps={{
            ...params.inputProps,
            autoComplete: 'off',
          }}
          error={!!errors[name]}
          helperText={errors[name]?.message}
        />
      )}
      fullWidth
      disabled={disabled}
    />
  );
}
