import * as React from 'react';
import {
  Box,
  Container,
  Stack,
  Typography,
  useTheme,
  useMediaQuery,
  Button,
  Grid,
  Tabs,
  Tab,
} from '@mui/material';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';

import SearchBar from '@/components/Common/SearchBar';
import TabPanel from '@/components/Common/TabPanel';
import useFilter from '@/hooks/useFilter';

import ActivePosts from './ActivePosts';

export default function Posts() {
  const { t } = useTranslation(['post', 'common', 'company']);
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [value, setValue] = React.useState<string>('activePosts');

  const filterApi = useFilter();

  const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Container maxWidth="xl">
      <Stack width={1} direction="column">
        <Stack
          width={1}
          direction={isMobile ? 'column' : 'row'}
          justifyContent="space-between"
          spacing={2}
        >
          <Stack
            direction={isMobile ? 'column' : 'row'}
            alignItems={isMobile ? 'flex-start' : 'center'}
            spacing={2}
          >
            <div tw="mr-4">
              <Typography variant="h2" component="span">
                {t('post:my posts')}
              </Typography>
            </div>

            <Box sx={{ minWidth: 150, width: 300 }} ml={4}>
              <SearchBar
                placeholder={t('post:search posts')}
                value={filterApi.searchTerm}
                setValue={filterApi.setSearchTerm}
              />
            </Box>
          </Stack>

          <div>
            <Button
              onClick={() =>
                router.push('/company/posts/create', '/company/posts/create', {
                  locale: router.locale,
                })
              }
              variant="contained"
            >
              <AddCircleOutlineOutlinedIcon fontSize="small" tw="mr-1" />
              {t('post:create new post')}
            </Button>
          </div>
        </Stack>
      </Stack>

      <Grid container marginTop={6}>
        <Grid item xs={12}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider', mt: '-3px', mb: 2 }}>
            <Tabs value={value} onChange={handleChange} variant="scrollable">
              <Tab label={t('post:active posts')} value="activePosts"></Tab>
              <Tab label={t('post:expired posts')} value="expiredPosts"></Tab>
            </Tabs>
          </Box>
        </Grid>

        <TabPanel value={value} tab="activePosts">
          <ActivePosts filterApi={filterApi} />
        </TabPanel>

        <TabPanel value={value} tab="expiredPosts">
          <Typography variant="subtitle2">Coming soon</Typography>
        </TabPanel>
      </Grid>
    </Container>
  );
}
