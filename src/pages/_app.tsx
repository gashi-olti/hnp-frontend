import type { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import { SWRConfig } from 'swr';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// import deLocale from 'date-fns/locale/de';
import enUS from 'date-fns/locale/en-US';

import createEmotionCache from '@/utils/createEmotionCache';
import StylesGlobal from '@/components/GlobalStyles';
import Api from '@/lib/api';
import theme from '@/config/theme';
import { AuthProvider } from '@/providers/AuthProvider';
import { NotificationProvider } from '@/providers/NotificationProvider';

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
          {/**
           * NO SUPPORT FOR ALBANIAN LANGUAGE YET
           */}
          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={enUS}>
            <StylesGlobal />
            <NotificationProvider>
              <AuthProvider>
                <Component {...pageProps} />
              </AuthProvider>
            </NotificationProvider>
          </LocalizationProvider>
        </MuiThemeProvider>
      </CacheProvider>
    </SWRConfig>
  );
}

export default appWithTranslation(MyApp);
