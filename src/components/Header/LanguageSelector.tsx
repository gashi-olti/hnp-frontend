import * as React from 'react';
import { Box, MenuItem, TextField } from '@mui/material';
import { useRouter } from 'next/router';

import theme from '@/config/theme';

const MenuProps = {
  MenuProps: {
    anchorOrigin: {
      vertical: 20,
      horizontal: 'left',
    },
  },
  PaperProps: {
    style: {
      borderRadius: 5,
    },
  },
};

export default function LanguageSelector() {
  const router = useRouter();
  const [language, setLanguage] = React.useState<string>(router.locale ?? 'sq');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLanguage(event.target.value);
  };

  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { width: 62 },
        marginTop: 0,
        marginLeft: 1,
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        select
        value={language}
        onChange={handleChange}
        size="small"
        sx={{
          svg: { right: 0, color: theme.palette.primary.contrastText },
          '& .MuiSelect-select': {
            paddingX: 1.5,
          },
          '& .MuiInputBase-root': {
            borderRadius: 50,
            '& > fieldset': {
              borderColor: 'white',
              borderWidth: '1px !important',
              borderRadius: 50,
            },
          },
          margin: 0,
        }}
        InputProps={{
          style: {
            color: theme.palette.primary.contrastText,
            height: 32,
          },
        }}
        SelectProps={{
          MenuProps: MenuProps,
        }}
      >
        <MenuItem
          key={1}
          value="sq"
          onClick={() => {
            router.push(router.asPath, router.asPath, { locale: 'sq' });
          }}
          sx={{
            '&.MuiMenuItem-root.MuiMenuItem-gutters.MuiButtonBase-root': {
              fontSize: theme.typography.body2,
              paddingY: 0.5,
            },
          }}
        >
          SQ
        </MenuItem>
        <MenuItem
          key={2}
          value="en"
          onClick={() => {
            router.push(router.asPath, router.asPath, { locale: 'en' });
          }}
          sx={{
            '&.MuiMenuItem-root.MuiMenuItem-gutters.MuiButtonBase-root': {
              fontSize: theme.typography.body2,
              paddingY: 0.5,
            },
            '&.MuiMenuItem-root MuiMenuItem-gutters Mui-selected MuiButtonBase-root': {
              paddingY: 0.5,
            },
          }}
        >
          EN
        </MenuItem>
      </TextField>
    </Box>
  );
}
