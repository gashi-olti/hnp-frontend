import * as React from 'react';
import { Card, InputAdornment, InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { theme as twinTheme } from 'twin.macro';

interface SearchbarProps {
  placeholder?: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

export default function SearchBar({ placeholder = 'Search...', value, setValue }: SearchbarProps) {
  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setValue(event.target.value);
  };

  return (
    <Card
      elevation={3}
      style={{
        borderRadius: twinTheme`borderRadius.full`,
      }}
    >
      <InputBase
        value={value}
        fullWidth
        onChange={handleQueryChange}
        placeholder={placeholder}
        startAdornment={
          <InputAdornment position="start" tw="-ml-2 mr-2">
            <SearchIcon color="disabled" />
          </InputAdornment>
        }
        tw="pl-6 py-1 pr-2"
      />
    </Card>
  );
}
