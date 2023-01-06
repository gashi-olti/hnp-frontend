import React from 'react';
import { FieldErrors, useController, UseFormSetValue } from 'react-hook-form';
import { useTranslation } from 'next-i18next';
import { TextField, Autocomplete, Checkbox, ListItemText, Paper } from '@mui/material';

import { Location } from '@/interfaces/city.interface';

const CustomPaper = (props: any) => {
  return <Paper elevation={8} {...props} />;
};

type CountryFilterSelectorProps = {
  control: any;
  errors: FieldErrors;
  name: string;
  label: string;
  options: Location[];
  setValue: UseFormSetValue<any>;
  setCountries: React.Dispatch<React.SetStateAction<Location[] | undefined>>;
  emptySelection?: number | null;
  defaultValue?: number | null;
  disabled?: boolean;
  className?: string;
  required?: boolean;
};

export default function CountryFilterSelector({
  control,
  errors,
  name,
  label,
  options,
  setValue,
  setCountries,
  emptySelection,
  defaultValue = null,
  disabled,
  className,
  required,
  ...props
}: CountryFilterSelectorProps) {
  const { t } = useTranslation('common');

  const [selectedCountries, setSelectedCountries] = React.useState<Location[] | undefined>([]);

  const {
    field: { ref, ...inputProps },
  } = useController({
    name,
    control,
    defaultValue,
  });

  React.useEffect(() => {
    setCountries(selectedCountries);
  }, [selectedCountries, setCountries]);

  return (
    <Autocomplete
      {...props}
      {...inputProps}
      ref={ref}
      multiple
      id={`country-filter-selector-${name}`}
      options={options}
      value={selectedCountries}
      isOptionEqualToValue={(option, value) => option.country_code === value.country_code}
      getOptionLabel={(option: any) => t(option.country_name)}
      disableClearable
      onChange={(_event, newValue: any) => {
        setValue(
          name,
          newValue?.map((value: any) => value.country_code),
          { shouldValidate: true, shouldDirty: true }
        );
        setSelectedCountries(newValue);
      }}
      ChipProps={{
        size: 'small',
      }}
      PaperComponent={CustomPaper}
      disableCloseOnSelect={true}
      renderOption={(checkboxProps, option, { selected }) => (
        <li {...checkboxProps}>
          <Checkbox checked={selected} />
          <ListItemText primary={option.country_name} />
        </li>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          required
          inputProps={{
            ...params.inputProps,
            autoComplete: 'off',
          }}
        />
      )}
      fullWidth
      disabled={disabled}
      sx={{
        '& .MuiOutlinedInput-root': {
          '& > fieldset': {
            borderWidth: '1px !important',
            // borderRadius: 50,
          },
        },
      }}
    />
  );
}
