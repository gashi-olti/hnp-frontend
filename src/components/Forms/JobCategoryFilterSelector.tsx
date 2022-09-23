import React from 'react';
import { FieldErrors, useController, UseFormSetValue } from 'react-hook-form';
import { useTranslation } from 'next-i18next';
import { TextField, Autocomplete, Checkbox, ListItemText, Paper } from '@mui/material';

import { JobCategoryInterface } from '@/config/jobCategory';

const CustomPaper = (props: any) => {
  return <Paper elevation={8} {...props} />;
};

type JobCategoryFilterSelectorProps = {
  control: any;
  errors: FieldErrors;
  name: string;
  label: string;
  options: JobCategoryInterface[];
  setValue: UseFormSetValue<any>;
  emptySelection?: number | null;
  defaultValue?: number | null;
  disabled?: boolean;
  className?: string;
  required?: boolean;
};

export default function JobCategoryFilterSelector({
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
}: JobCategoryFilterSelectorProps) {
  const { t } = useTranslation('job');

  const [selectedCategories, setSelectedCategories] = React.useState<
    JobCategoryInterface[] | undefined
  >([]);

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
      id={`category-filter-selector-${name}`}
      options={options}
      value={selectedCategories}
      isOptionEqualToValue={(option, value) => option.key === value.key}
      getOptionLabel={(option: any) => t(option.value)}
      disableClearable
      sx={{
        '& .MuiOutlinedInput-root': {
          '& > fieldset': {
            borderWidth: '1px !important',
            borderRadius: 50,
          },
        },
      }}
      onChange={(_event, newValue: any) => {
        setValue(name, newValue?.key, { shouldValidate: true, shouldDirty: true });
        setSelectedCategories(newValue);
      }}
      ChipProps={{
        size: 'small',
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
