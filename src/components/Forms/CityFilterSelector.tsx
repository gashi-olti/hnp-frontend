import React from 'react';
import { FieldErrors, useController, UseFormSetValue } from 'react-hook-form';
import { useTranslation } from 'next-i18next';
import { TextField, Autocomplete, Checkbox, ListItemText, Paper } from '@mui/material';

const CustomPaper = (props: any) => {
  return <Paper elevation={8} {...props} />;
};

type City = {
  name: string;
};

type CityFilterSelectorProps = {
  control: any;
  errors: FieldErrors;
  name: string;
  label: string;
  options: City[];
  setValue: UseFormSetValue<any>;
  emptySelection?: number | null;
  defaultValue?: number | null;
  disabled?: boolean;
  className?: string;
  required?: boolean;
};

export default function CityFilterSelector({
  control,
  errors,
  name,
  label,
  options,
  setValue,
  emptySelection,
  defaultValue = null,
  disabled,
  className,
  required,
  ...props
}: CityFilterSelectorProps) {
  const { t } = useTranslation('common');

  const [selectedCities, setSelectedCities] = React.useState<City[] | undefined>([]);

  const {
    field: { ref, ...inputProps },
  } = useController({
    name,
    control,
    defaultValue,
  });

  return (
    <Autocomplete
      {...props}
      {...inputProps}
      ref={ref}
      multiple
      id={`city-filter-selector-${name}`}
      options={options}
      value={selectedCities}
      isOptionEqualToValue={(option, value) => option.name === value.name}
      getOptionLabel={(option: any) => t(option.name)}
      disableClearable
      onChange={(_event, newValue: any) => {
        setValue(
          name,
          newValue?.map((value: any) => value.name),
          { shouldValidate: true, shouldDirty: true }
        );
        setSelectedCities(newValue);
      }}
      ChipProps={{
        size: 'small',
      }}
      PaperComponent={CustomPaper}
      disableCloseOnSelect={true}
      renderOption={(checkboxProps, option, { selected }) => (
        <li {...checkboxProps} key={option.name}>
          <Checkbox checked={selected} />
          <ListItemText primary={option.name} />
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
