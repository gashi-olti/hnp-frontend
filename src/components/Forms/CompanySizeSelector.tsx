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

import getCompanySize, { CompanySizeInterface } from '@/config/companySize';

type CompanySizeProps = {
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

export default function CompanySizeSelector({
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
}: CompanySizeProps) {
  const { t } = useTranslation('common');

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [selectedSize, setSelectedSize] = React.useState<CompanySizeInterface | null>(
    getCompanySize(t)[0]
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
      setSelectedSize(getCompanySize(t).find((size) => size.key === defaultValue) || null);
    }
  }, [defaultValue, t]);

  if (isMobile) {
    return (
      <FormControl className={className} fullWidth disabled={disabled}>
        <InputLabel required={required} htmlFor={`company-size-${name}`}>
          {label}
        </InputLabel>
        <Select
          native
          {...props}
          inputProps={{
            ...inputProps,
            id: `company-size-selector-${name}`,
          }}
          inputRef={ref}
          error={!!errors[name]}
          fullWidth
        >
          {emptySelection && <option aria-label="emptySelection" value="" />}
          {getCompanySize(t).map((size) => (
            <option key={size.key} value={size.key || 0}>
              {t(size.value)}
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
      id={`company-size-${name}`}
      options={getCompanySize(t)}
      isOptionEqualToValue={(option, value) => option.value === value.value}
      getOptionLabel={(option: any) => t(option.value)}
      disableClearable
      onChange={(_event, newValue) => {
        setValue(name, newValue?.key, { shouldValidate: true, shouldDirty: true });
        setSelectedSize(newValue);
      }}
      value={selectedSize as any}
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
