import React from 'react';
import { Controller, FieldErrors, get } from 'react-hook-form';
import { TextField, TextFieldProps } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';

export interface DatePickerControllerProps {
  control: any;
  errors?: FieldErrors;
  name: string;
  rules?: any;
  label: string;
  inputFormat?: string;
  mask?: string;
  required?: boolean;
  disabled?: boolean;
}

type DatePickerProps = {
  maxDate?: any;
  minDate?: any;
  disableHighlightToday?: boolean;
  openTo?: 'year';
  views?: ('year' | 'month' | 'day')[];
};

export default function DatePickerController({
  control,
  errors,
  name,
  rules,
  label,
  inputFormat,
  mask,
  required,
  maxDate,
  minDate,
  disableHighlightToday,
  openTo,
  views,
  disabled = false,
}: DatePickerControllerProps & DatePickerProps) {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field }) => {
        return (
          <DatePicker
            allowSameDateSelection={true}
            label={label}
            value={field.value}
            disabled={disabled}
            onChange={(date: Date | null) => field.onChange(date)}
            {...(maxDate && { maxDate })}
            {...(minDate && { minDate })}
            {...(disableHighlightToday && { disableHighlightToday })}
            {...(openTo && { openTo })}
            {...(views && { views })}
            inputFormat={inputFormat}
            mask={mask}
            OpenPickerButtonProps={{
              size: 'small',
            }}
            renderInput={(params: TextFieldProps) => (
              <TextField
                {...params}
                required={required}
                fullWidth={true}
                helperText={get(errors, name)?.message}
                error={!!get(errors, name)}
              />
            )}
          />
        );
      }}
    />
  );
}
