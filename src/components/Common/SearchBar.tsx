import * as React from 'react';
import { Card, InputAdornment, InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { theme as twinTheme } from 'twin.macro';

export default function SearchBar() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    // setValue(event.target.value);
  };

  return (
    <Card
      elevation={4}
      style={{
        borderRadius: twinTheme`borderRadius.full`,
      }}
    >
      <InputBase
        value={null}
        fullWidth
        onChange={handleQueryChange}
        placeholder="Search..."
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
