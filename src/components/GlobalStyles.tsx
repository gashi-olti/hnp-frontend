import { CssBaseline, GlobalStyles } from '@mui/material';
import tw, { theme, GlobalStyles as BaseStyles } from 'twin.macro';

const CustomStyles = (
  <GlobalStyles
    styles={`
    /* rubik-300 */
    @font-face {
        font-family: 'Rubik';
        font-style: normal;
        font-weight: 400;
        src: url('/fonts/rubik-300.woff2') format('woff2); /* Super Modern Browsers */
        src: local(''),
            url('/fonts/rubik-300.woff') format('woff'), /* Modern Browsers */
            url('/fonts/rubik-300.ttf') format('truetype'), /* Safari, Android, iOS */
    }

    /* rubik-500 */
    @font-face {
        font-family: 'Rubik';
        font-style: normal;
        font-weight: 500;
        src: url('/fonts/rubik-500.woff2') format('woff2); /* Super Modern Browsers */
        src: local(''),
            url('/fonts/rubik-500.woff') format('woff'), /* Modern Browsers */
            url('/fonts/rubik-500.ttf') format('truetype'), /* Safari, Android, iOS */
    }

    /* rubik-700 */
    @font-face {
        font-family: 'Rubik';
        font-style: normal;
        font-weight: 700;
        src: url('/fonts/rubik-700.woff2') format('woff2); /* Super Modern Browsers */
        src: local(''),
            url('/fonts/rubik-700.woff') format('woff'), /* Modern Browsers */
            url('/fonts/rubik-700.ttf') format('truetype'), /* Safari, Android, iOS */
    }

    /* rubik-800 */
    @font-face {
        font-family: 'Rubik';
        font-style: normal;
        font-weight: 800;
        src: url('/fonts/rubik-800.woff2') format('woff2); /* Super Modern Browsers */
        src: local(''),
            url('/fonts/rubik-800.woff') format('woff'), /* Modern Browsers */
            url('/fonts/rubik-800.ttf') format('truetype'), /* Safari, Android, iOS */
    }

    /* rubik-900 */
    @font-face {
        font-family: 'Rubik';
        font-style: normal;
        font-weight: 900;
        src: url('/fonts/rubik-900.woff2') format('woff2); /* Super Modern Browsers */
        src: local(''),
            url('/fonts/rubik-900.woff') format('woff'), /* Modern Browsers */
            url('/fonts/rubik-900.ttf') format('truetype'), /* Safari, Android, iOS */
    }

    body {
        -webkit-tap-highlight-color: ${theme`colors.cyan.500` as string};
        ${tw`antialiased`}
    }
`}
  />
);

const StylesGlobal = () => (
  <>
    <CssBaseline />
    <BaseStyles />
    {CustomStyles}
  </>
);

export default StylesGlobal;
