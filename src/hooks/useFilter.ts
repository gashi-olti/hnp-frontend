import * as React from 'react';

import useDebounce from './useDebounce';

export interface FilterApi {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  searchTermDebounce: string;
}

export default function useFilter(): FilterApi {
  const [searchTerm, setSearchTerm] = React.useState('');
  const searchTermDebounce = useDebounce(searchTerm, 500);

  return {
    searchTerm,
    setSearchTerm,
    searchTermDebounce,
  };
}
