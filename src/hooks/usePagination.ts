import * as React from 'react';

import constants from '@/config/constants';

export interface PaginationApi {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  pageLimit: number;
  setPageLimit: React.Dispatch<React.SetStateAction<number>>;
  handleChangePage: (event: unknown, newPage: number) => void;
}

export default function usePagination(): PaginationApi {
  const [page, setPage] = React.useState(1);
  const [pageLimit, setPageLimit] = React.useState(constants.pagination.defaultPageLimit);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  return {
    page,
    setPage,
    pageLimit,
    setPageLimit,
    handleChangePage,
  };
}
