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

import getJobType, { JobTypeInterface } from '@/config/jobType';

type JobTypeProps = {
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

export default function JobTypeSelector({
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
}: JobTypeProps) {
  const { t } = useTranslation('job');

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [selectedType, setSelectedType] = React.useState<JobTypeInterface | null>(getJobType(t)[0]);

  const {
    field: { ref, ...inputProps },
  } = useController({
    name,
    control,
    defaultValue,
  });

  React.useEffect(() => {
    if (defaultValue) {
      setSelectedType(getJobType(t).find((type) => type.key === defaultValue) || null);
    }
  }, [defaultValue, t]);

  if (isMobile) {
    return (
      <FormControl className={className} fullWidth disabled={disabled}>
        <InputLabel required={required} htmlFor={`job-type-${name}`}>
          {label}
        </InputLabel>
        <Select
          native
          {...props}
          inputProps={{
            ...inputProps,
            id: `job-type-selector-${name}`,
          }}
          inputRef={ref}
          error={!!errors[name]}
          fullWidth
        >
          {emptySelection && <option aria-label="emptySelection" value="" />}
          {getJobType(t).map((type) => (
            <option key={type.key} value={type.key || 0}>
              {t(type.value)}
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
      id={`job-type-${name}`}
      options={getJobType(t)}
      getOptionLabel={(option: any) => t(option.value)}
      disableClearable
      onChange={(_event, newValue) => {
        setValue(name, newValue?.key, { shouldValidate: true, shouldDirty: true });
        setSelectedType(newValue);
      }}
      value={selectedType as any}
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
