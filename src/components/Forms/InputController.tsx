/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import { FieldErrors, useController, get } from 'react-hook-form';
import { TextField, TextFieldProps } from '@mui/material';

type InputControllerProps = {
  component?: (props: TextFieldProps) => JSX.Element;
  control: any;
  errors?: FieldErrors;
  name: string;
  min?: string;
  max?: string;
  step?: string;
};

export default function InputController({
  component = undefined,
  control,
  errors,
  margin = 'normal',
  name,
  size = 'medium',
  defaultValue = '',
  min,
  max,
  step,
  fullWidth = true,
  hiddenLabel,
  type,
  ...props
}: InputControllerProps & TextFieldProps) {
  const {
    field: { ref, value, ...inputProps },
  } = useController({
    name,
    control,
    defaultValue,
  });

  const parseValue = (val: any) => {
    if (type === 'date' && typeof value === 'string' && val.indexOf('T') >= 0) {
      return val.slice(0, val.indexOf('T'));
    }
    return val;
  };

  const As = component ?? TextField;

  return (
    <As
      {...props}
      inputProps={{
        ...inputProps,
        value: value ? parseValue(value) : '',
        min,
        max,
        step,
        autoComplete: 'off',
      }}
      error={!!get(errors, name)}
      helperText={get(errors, name)?.message}
      inputRef={ref}
      size={size}
      margin={margin}
      fullWidth={fullWidth}
      type={type}
    />
  );
}
