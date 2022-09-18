import {
  Typography,
  Grid,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Pagination,
  TableBody,
  Tooltip,
  IconButton,
} from '@mui/material';
import { TFunction, useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import useSWR from 'swr';
import { DateTime } from 'luxon';

import { Scrollbar } from '@/components/Common/Scrollbar';
import useSort from '@/hooks/useSort';
import useFilter from '@/hooks/useFilter';
import usePagination from '@/hooks/usePagination';
import { PostModel } from '@/interfaces/post.interface';
import { PaginatedResult } from '@/interfaces/paginatedResponse.interface';
import LoadingSpinner from '@/components/LoadingSpinner';
import { useNotification } from '@/providers/NotificationProvider';
import usePostApi from '@/hooks/usePostApi';

const tableHeadStructure = (t: TFunction) => {
  const structure = [
    {
      name: t('common:name'),
    },
    {
      name: t('common:published'),
    },
    {
      name: t('common:deadline'),
    },
    {
      name: t('common:location'),
    },
    {
      name: t('common:action'),
    },
  ];

  return structure;
};

type RowProps = {
  row: any;
  mutatePosts: () => void;
  t: TFunction;
};

const PostsRow = ({ row, mutatePosts, t }: RowProps) => {
  const router = useRouter();
  const { openConfirmation } = useNotification();
  const { deletePost } = usePostApi();

  const TooltipTitle = {
    edit: t('common:edit'),
    delete: t('common:delete'),
  };

  const handleDeletePost = async (event: React.MouseEvent<HTMLButtonElement>, uuid: string) => {
    event.stopPropagation();
    openConfirmation({
      title: t('common:are you sure'),
      content: t('post:post will be deleted'),
    }).then(async () => {
      const postResponse = await deletePost(uuid);
      if (postResponse) mutatePosts();
    });
  };

  return (
    <>
      <TableRow
        tw="hover:bg-gray-100 cursor-pointer"
        onClick={() =>
          router.push(`/company/posts/${row.uuid}`, `/company/posts/${row.uuid}`, {
            locale: router.locale,
          })
        }
      >
        <TableCell key="title" sx={{ maxWidth: 200 }}>
          <Typography variant="subtitle2">{row.title}</Typography>
        </TableCell>
        <TableCell key="created_at" sx={{ maxWidth: 150 }}>
          <Typography variant="subtitle2">
            {DateTime.fromISO(row.created_at).toFormat('dd-MM-yyyy')}
          </Typography>
        </TableCell>
        <TableCell key="ends" sx={{ maxWidth: 150 }}>
          <Typography variant="subtitle2">
            {DateTime.fromISO(row.ends).toFormat('dd-MM-yyyy')}
          </Typography>
        </TableCell>
        <TableCell key="location" sx={{ maxWidth: 200 }}>
          <Typography variant="subtitle2">{row.location}</Typography>
        </TableCell>
        <TableCell align="right" sx={{ maxWidth: 150 }}>
          <Grid container columnGap={1} tw="flex justify-end">
            <Tooltip title={TooltipTitle.edit} arrow>
              <span>
                <IconButton
                  size="small"
                  edge="end"
                  aria-label={TooltipTitle.edit}
                  onClick={() =>
                    router.push(`/company/posts/${row.uuid}`, `/company/posts/${row.uuid}`, {
                      locale: router.locale,
                    })
                  }
                >
                  <EditIcon />
                </IconButton>
              </span>
            </Tooltip>
            <Tooltip title={TooltipTitle.delete} arrow>
              <span>
                <IconButton
                  size="small"
                  edge="end"
                  aria-label={TooltipTitle.edit}
                  onClick={(post) => handleDeletePost(post, row.uuid)}
                >
                  <DeleteIcon />
                </IconButton>
              </span>
            </Tooltip>
          </Grid>
        </TableCell>
      </TableRow>
    </>
  );
};

export default function ActivePosts() {
  const { t } = useTranslation(['post', 'common', 'company']);

  const sortApi = useSort({ initialSort: { field: 'title', dir: 'asc' } });
  const filterApi = useFilter();
  const paginationApi = usePagination();

  const { page, pageLimit, handleChangePage } = paginationApi;

  const {
    data: posts,
    mutate: mutatePosts,
    error: postsError,
  } = useSWR<PaginatedResult<PostModel>>(
    filterApi.searchTermDebounce
      ? `company/posts?page=${page}&limit=${pageLimit}&order=${sortApi.sort}&dir=${sortApi.sort.dir}&q=${filterApi.searchTermDebounce}`
      : `company/posts?page=${page}&limit=${pageLimit}&order=${sortApi.sort}&dir=${sortApi.sort.dir}`
  );

  const noResults = posts?.data.length === 0 && !postsError;
  const colspan = 7;

  return (
    <>
      <Grid item xs={12}>
        <Scrollbar>
          <Table>
            <TableHead>
              <TableRow>
                {tableHeadStructure(t).map((cell, index) => (
                  <TableCell
                    key={index}
                    align={index === tableHeadStructure(t).length - 1 ? 'right' : 'left'}
                  >
                    <Typography variant="h3" color="primary" tw="text-lg">
                      {cell.name}
                    </Typography>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {posts?.data.map((row: any) => {
                return <PostsRow key={row.uuid} row={row} mutatePosts={mutatePosts} t={t} />;
              })}
              {noResults && (
                <TableRow>
                  <TableCell colSpan={colspan}>
                    <Typography variant="subtitle2">{t('company:no posts')}</Typography>
                  </TableCell>
                </TableRow>
              )}
              {postsError && (
                <TableRow>
                  <TableCell colSpan={colspan}>
                    <Typography variant="subtitle2">{t('common:something went wrong')}</Typography>
                  </TableCell>
                </TableRow>
              )}
              {!posts && !postsError && (
                <TableRow>
                  <TableCell colSpan={colspan}>
                    <LoadingSpinner />
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Scrollbar>
      </Grid>
      <Grid item xs={12}>
        <div tw="w-full flex justify-end mt-6">
          <Pagination
            variant="outlined"
            count={posts?.meta.last_page ?? 0}
            page={page}
            onChange={handleChangePage}
          />
        </div>
      </Grid>
    </>
  );
}
