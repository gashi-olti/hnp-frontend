import * as React from 'react';

type Direction = 'asc' | 'desc';

export interface Sort {
  field: string;
  dir: Direction;
}

interface Props {
  initialSort: {
    field: string;
    dir: Direction;
  };
}

export interface SortApi {
  sort: Sort;
  setSort: React.Dispatch<React.SetStateAction<Sort>>;
}

export default function useSort(props: Props): SortApi {
  const { initialSort } = props;

  const [sort, setSort] = React.useState<Sort>(initialSort);

  return {
    sort,
    setSort,
  };
}
