import type { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import { SWRConfig } from 'swr';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material';
import { LocalizationProvider } from '@mui/lab';
import DateAdapter from '@mui/lab/AdapterDateFns';
import sqLocale from 'date-fns/locale/sq';

import createEmotionCache from '@/utils/createEmotionCache';
import StylesGlobal from '@/components/GlobalStyles';
import Api from '@/lib/api';
import theme from '@/config/theme';
import { AuthProvider } from '@/providers/AuthProvider';

const clientSideEmotionCache = createEmotionCache();
interface HnpAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

function MyApp(props: HnpAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <SWRConfig value={{ fetcher: Api.get }}>
      <CacheProvider value={emotionCache}>
        <MuiThemeProvider theme={theme}>
          <LocalizationProvider dateAdapter={DateAdapter} locale={sqLocale}>
            <StylesGlobal />
            <AuthProvider>
              <Component {...pageProps} />
            </AuthProvider>
          </LocalizationProvider>
        </MuiThemeProvider>
      </CacheProvider>
    </SWRConfig>
  );
}

export default appWithTranslation(MyApp);
