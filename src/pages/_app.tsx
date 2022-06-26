import type { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import { SWRConfig } from 'swr';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material';
import createEmotionCache from '@/utils/createEmotionCache';
import { LocalizationProvider } from '@mui/lab';
import DateAdapter from '@mui/lab/AdapterDateFns';
import deLocale from 'date-fns/locale/de';
// import alLocale from 'date-fnd/locale/al';
import StylesGlobal from '@/components/GlobalStyles';
import Api from '@/lib/api';
import theme from '@/config/theme';

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
          <LocalizationProvider dateAdapter={DateAdapter} locale={deLocale}>
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
