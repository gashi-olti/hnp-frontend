import React from 'react';
import { FieldErrors, useController, UseFormSetValue } from 'react-hook-form';
import { useTranslation } from 'next-i18next';
import { TextField, Autocomplete, Checkbox, ListItemText, Paper } from '@mui/material';

import { JobTypeInterface } from '@/config/jobType';

const CustomPaper = (props: any) => {
  return <Paper elevation={8} {...props} />;
};

type JobTypeFilterSelectorProps = {
  control: any;
  errors: FieldErrors;
  name: string;
  label: string;
  options: JobTypeInterface[];
  setValue: UseFormSetValue<any>;
  emptySelection?: number | null;
  defaultValue?: number | null;
  disabled?: boolean;
  className?: string;
  required?: boolean;
};

export default function JobTypeFilterSelector({
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
}: JobTypeFilterSelectorProps) {
  const { t } = useTranslation('job');

  const [selectedTypes, setSelectedTypes] = React.useState<JobTypeInterface[] | undefined>([]);

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
      fullWidth
      disabled={disabled}
      id={`type-filter-selector-${name}`}
      options={options}
      value={selectedTypes}
      isOptionEqualToValue={(option, value) => option.key === value.key}
      getOptionLabel={(option: any) => t(option.value)}
      disableClearable
      onChange={(_event, newValue: any) => {
        setValue(name, newValue?.key, { shouldValidate: true, shouldDirty: true });
        setSelectedTypes(newValue);
      }}
      ChipProps={{
        size: 'small',
      }}
      sx={{
        '& .MuiOutlinedInput-root': {
          '& > fieldset': {
            borderWidth: '1px !important',
            borderRadius: 50,
          },
        },
      }}
      PaperComponent={CustomPaper}
      disableCloseOnSelect={true}
      renderOption={(checkboxProps, option, { selected }) => (
        <li {...checkboxProps}>
          <Checkbox checked={selected} />
          <ListItemText primary={t(`job:${option.value}`)} />
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
    />
  );
}
