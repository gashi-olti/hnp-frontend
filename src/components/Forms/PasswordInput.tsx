/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import { FieldErrors } from 'react-hook-form';
import { IconButton, TextFieldProps } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import InputController from './InputController';

type Props = {
  control: any;
  errors: FieldErrors;
  name: string;
  label: string;
} & TextFieldProps;

export default function PasswordInput(props: Props) {
  const [passwordVisible, setPasswordVisible] = React.useState(false);

  const togglePassword = () => {
    setPasswordVisible((state) => !state);
  };

  return (
    <InputController
      {...props}
      type={passwordVisible ? 'text' : 'password'}
      InputProps={{
        endAdornment: (
          <IconButton size="small" onClick={togglePassword} tabIndex={-1}>
            {passwordVisible ? (
              <VisibilityIcon fontSize="small" />
            ) : (
              <VisibilityOffIcon fontSize="small" />
            )}
          </IconButton>
        ),
      }}
    />
  );
}
