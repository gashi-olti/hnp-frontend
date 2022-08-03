/* eslint-disable @next/next/no-sync-scripts */
/* eslint-disable react/display-name */
import Document, { Html, Head, Main, NextScript } from 'next/document';
import createEmotionServer from '@emotion/server/create-instance';

// import Favicons from '@/components/Favicons';
import createEmotionCache from '@/utils/createEmotionCache';

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="al">
        <Head>
          {process.env.BUILD_ENV === 'development' && <meta name="robots" content="none" />}
          <link
            rel="preload"
            href="/fonts/rubik-300.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/rubik-500.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/rubik-700.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          {/* <Favicons /> */}
          {(this.props as any).emotionStyleTags}
        </Head>
        <body>
          {/* <script
            src="https://consent.cookiefirst.com/banner.js"
            data-cookiefirst-key="d03a0342-7362-4b09-977c-83d028c4368c"
          ></script> */}
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

MyDocument.getInitialProps = async (ctx) => {
  const originalRenderPage = ctx.renderPage;

  const cache = createEmotionCache();
  const { extractCriticalToChunks } = createEmotionServer(cache);

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App: any) =>
        function EnhanceApp(props) {
          return <App emotionCache={cache} {...props} />;
        },
    });

  const initialProps = await Document.getInitialProps(ctx);

  const emotionStyles = extractCriticalToChunks(initialProps.html);
  const emotionStyleTags = emotionStyles.styles.map((style) => (
    <style
      data-emotion={`${style.key} ${style.ids.join(' ')}`}
      key={style.key}
      dangerouslySetInnerHTML={{ __html: style.css }}
    />
  ));

  return {
    ...initialProps,
    emotionStyleTags,
  };
};
