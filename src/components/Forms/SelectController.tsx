import { Controller, FieldErrors } from 'react-hook-form';
import { TextField, TextFieldProps } from '@mui/material';

interface IProps {
  name: string;
  control: any;
  errors?: FieldErrors;
  multiple?: boolean;
  menuProps?: any;
  children: any;
}

export default function SelectController({
  name,
  control,
  errors,
  multiple,
  menuProps,
  children,
  ...other
}: IProps & TextFieldProps) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          select
          fullWidth
          error={!!error}
          helperText={error?.message}
          {...other}
          margin="normal"
          size="medium"
          SelectProps={{
            multiple: multiple,
            renderValue(selected: any) {
              return selected.join(', ');
            },
            MenuProps: menuProps,
          }}
        >
          {children}
        </TextField>
      )}
    />
  );
}
