import React from 'react';
import { FieldErrors, useController, UseFormSetValue } from 'react-hook-form';
import { useTranslation } from 'next-i18next';
import {
  FormControl,
  InputLabel,
  TextField,
  useMediaQuery,
  useTheme,
  Select,
  Autocomplete,
  FormHelperText,
} from '@mui/material';

import getJobCategory, { JobCategoryInterface } from '@/config/jobCategory';

type JobCategoryProps = {
  control: any;
  errors: FieldErrors;
  name: string;
  label: string;
  setValue: UseFormSetValue<any>;
  emptySelection?: number | null;
  defaultValue?: number | null;
  disabled?: boolean;
  className?: string;
  required?: boolean;
};

export default function JobCategorySelector({
  control,
  errors,
  name,
  label,
  setValue,
  emptySelection,
  defaultValue = null,
  disabled,
  className,
  required,
  ...props
}: JobCategoryProps) {
  const { t } = useTranslation('job');

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [selectedCategory, setSelectedCategory] = React.useState<JobCategoryInterface | null>(
    getJobCategory(t)[0]
  );

  const {
    field: { ref, ...inputProps },
  } = useController({
    name,
    control,
    defaultValue,
  });

  React.useEffect(() => {
    if (defaultValue) {
      setSelectedCategory(
        getJobCategory(t).find((category) => category.key === defaultValue) || null
      );
    }
  }, [defaultValue, t]);

  if (isMobile) {
    return (
      <FormControl className={className} fullWidth disabled={disabled}>
        <InputLabel required={required} htmlFor={`job-category-${name}`}>
          {label}
        </InputLabel>
        <Select
          native
          {...props}
          inputProps={{
            ...inputProps,
            id: `job-category-selector-${name}`,
          }}
          inputRef={ref}
          error={!!errors[name]}
          fullWidth
        >
          {emptySelection && <option aria-label="emptySelection" value="" />}
          {getJobCategory(t).map((category) => (
            <option key={category.key} value={category.key || 0}>
              {t(category.value)}
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
      id={`job-category-${name}`}
      options={getJobCategory(t)}
      isOptionEqualToValue={(option, value) => option.value === value.value}
      getOptionLabel={(option: any) => t(option.value)}
      disableClearable
      onChange={(_event, newValue) => {
        setValue(name, newValue?.key, { shouldValidate: true, shouldDirty: true });
        setSelectedCategory(newValue);
      }}
      value={selectedCategory as any}
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
    />
  );
}
