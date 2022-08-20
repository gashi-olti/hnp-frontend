import { createTheme, Theme, Components, styled } from '@mui/material';
import { theme as twinTheme } from 'twin.macro';
import { createElement } from 'react';

export const defaultGradient = (
  toRight = true,
  from = twinTheme`colors.sky.DEFAULT`,
  to = twinTheme`colors.cyan.DEFAULT`
) => {
  const direction = toRight ? `to right` : `to left`;
  return `linear-gradient(${direction},${from} 45%, ${to} 100%)`;
};

export const getTextDefaultGradient = () => ({
  backgroundColor: twinTheme`colors.sky.DEFAULT`,
  backgroundSize: '100%',
  backgroundImage: defaultGradient(),
  backgroundRepeat: 'repeat',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
});

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    buttonWhite: true;
    buttonLight: true;
    buttonSuccess: true;
    buttonTransparent: true;
  }
}

declare module '@mui/material/Alert' {
  interface AlertPropsVariantOverrides {
    primary: true;
    secondary: true;
  }
}

const appTheme = createTheme({
  palette: {
    // sky
    primary: {
      main: twinTheme`colors.sky.DEFAULT`,
      light: twinTheme`colors.sky.500`, // '#0ea5e9',
      dark: twinTheme`colors.sky.800`, // '#075985',
      contrastText: '#fff',
    },
    // cyan
    secondary: {
      main: twinTheme`colors.cyan.DEFAULT`,
      light: twinTheme`colors.cyan.500`, // '#06b6d4',
      dark: twinTheme`colors.cyan.900`, // '#164e63',
      contrastText: '#fff',
    },
    grey: {
      400: twinTheme`colors.gray.400`, // '#6d6d6b'
      300: twinTheme`colors.gray.300`, // '#b5b5b3'
    },
    text: {
      primary: '#3c3c3c',
      secondary: '#6d6d6b',
    },
    background: {
      default: twinTheme`colors.white`,
    },
  },

  typography: {
    fontSize: 16,
    fontFamily: twinTheme`fontFamily.sans`,
    fontWeightRegular: twinTheme`fontWeight.normal`,
    fontWeightMedium: twinTheme`fontWeight.medium`,
    fontWeightBold: twinTheme`fontWeight.bold`,
    h1: {
      fontSize: twinTheme`fontSize.4xl`,
      lineHeight: twinTheme`lineHeight.10`,
      fontWeight: twinTheme`fontWeight.bold`,
      backgroundColor: twinTheme`colors.sky.DEFAULT`,
      backgroundSize: '100%',
      backgroundImage: defaultGradient(),
      backgroundRepeat: 'repeat',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },
    h2: {
      textTransform: 'uppercase',
      fontSize: twinTheme`fontSize.2xl`,
      lineHeight: twinTheme`lineHeight.8`,
      fontWeight: twinTheme`fontWeight.bold`,
      backgroundColor: twinTheme`colors.sky.DEFAULT`,
      backgroundSize: '100%',
      backgroundImage: defaultGradient(),
      backgroundRepeat: 'repeat',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },
    h3: {
      fontSize: twinTheme`fontSize.xl`,
      lineHeight: twinTheme`lineHeight.7`,
      fontWeight: twinTheme`fontWeight.bold`,
    },
    h4: {
      fontSize: twinTheme`fontSize.base`,
      lineHeight: twinTheme`lineHeight.7`,
      fontWeight: twinTheme`fontWeight.bold`,
    },
    h5: {
      fontSize: twinTheme`fontSize.sm`,
      lineHeight: twinTheme`lineHeight.6`,
      fontWeight: twinTheme`fontWeight.bold`,
    },
    h6: {
      fontSize: twinTheme`fontSize.xs`,
      lineHeight: twinTheme`lineHeight.6`,
      fontWeight: twinTheme`fontWeight.bold`,
    },
    subtitle1: {
      fontSize: twinTheme`fontSize.xl`,
      lineHeight: twinTheme`lineHeight.6`,
      fontWeight: twinTheme`fontWeight.light`,
    },
    subtitle2: {
      fontSize: twinTheme`fontSize.base`,
    },
    body1: {
      fontSize: twinTheme`fontSize.base`,
    },
    body2: {
      fontSize: twinTheme`fontSize.xs`,
    },
    caption: {
      fontSize: twinTheme`fontSize.xs`,
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 640,
      md: 960,
      lg: 1280,
      xl: 1600,
    },
  },
  shape: {
    borderRadius: 20,
  },
});

const overrides = (theme: Theme): Components => ({
  MuiTypography: {
    defaultProps: {
      color: 'textPrimary',
    },
  },
  MuiTextField: {
    defaultProps: {
      variant: 'outlined',
    },
  },

  MuiButton: {
    defaultProps: {
      disableFocusRipple: true,
      disableElevation: true,
      variant: 'contained',
    },
    variants: [
      {
        props: { variant: 'buttonWhite' },
        style: {
          color: theme.palette.primary.main,
          backgroundColor: theme.palette.common.white,
          '&:hover': {
            opacity: 0.8,
            backgroundColor: theme.palette.common.white,
          },
          '&:active': {
            opacity: 0.6,
            backgroundColor: theme.palette.common.white,
          },
          '&:focus': {
            outline: 'none',
            backgroundColor: theme.palette.common.white,
          },
          '&.Mui-disabled': {
            opacity: 0.2,
            color: theme.palette.primary.main,
            backgroundColor: theme.palette.common.white,
          },
        },
      },
      {
        props: { variant: 'buttonLight' },
        style: {
          color: theme.palette.common.white,
          backgroundColor: '#f39e69',
          '&:hover': {
            opacity: 0.8,
            backgroundColor: '#f39e69',
          },
          '&:active': {
            opacity: 0.6,
            backgroundColor: '#f39e69',
          },
          '&:focus': {
            outline: 'none',
            backgroundColor: '#f39e69',
          },
          '&.Mui-disabled': {
            opacity: 0.2,
            color: theme.palette.primary.main,
            backgroundColor: theme.palette.common.white,
          },
        },
      },
      {
        props: { variant: 'buttonSuccess' },
        style: {
          color: theme.palette.common.white,
          backgroundImage: 'none',
          backgroundColor: '#87C735',
          '&:hover': {
            opacity: 0.8,
            backgroundColor: '#87C735',
          },
          '&:active': {
            opacity: 0.6,
            backgroundColor: '#87C735',
          },
          '&:focus': {
            outline: 'none',
            backgroundColor: '#87C735',
          },
          '&.Mui-disabled': {
            opacity: 0.2,
            color: theme.palette.primary.main,
            backgroundColor: theme.palette.common.white,
          },
        },
      },
      {
        props: { variant: 'buttonTransparent' },
        style: {
          color: theme.palette.common.white,
          backgroundColor: '#ffffff77',
          '&:hover': {
            opacity: 0.8,
            backgroundColor: '#ffffff77',
          },
          '&:active': {
            opacity: 0.6,
            backgroundColor: '#ffffff77',
          },
          '&:focus': {
            outline: 'none',
            backgroundColor: '#ffffff77',
          },
          '&.Mui-disabled': {
            opacity: 0.2,
            color: theme.palette.primary.main,
            backgroundColor: theme.palette.common.white,
          },
        },
      },
    ],
    styleOverrides: {
      root: {
        padding: theme.spacing(0.5, 2),
        transition: 'opacity 250ms ease-in-out',
        fontWeight: theme.typography.fontWeightMedium,
      },
      contained: {
        borderRadius: twinTheme`borderRadius.full`,
        color: twinTheme`colors.white`,
        backgroundColor: theme.palette.primary.main,
        '&:hover': {
          opacity: 0.8,
          backgroundColor: theme.palette.primary.main,
        },
        '&:active': {
          opacity: 0.6,
          backgroundColor: theme.palette.primary.main,
        },
        '&:focus': {
          outline: 'none',
          backgroundColor: theme.palette.primary.main,
        },
        '&.Mui-disabled': {
          opacity: 0.2,
          color: twinTheme`colors.white`,
          backgroundColor: theme.palette.primary.main,
        },
      },
      containedPrimary: {
        color: twinTheme`colors.white`,
        backgroundImage: defaultGradient(),
        '&:focus': {
          outline: 'none',
          borderImageSlice: 1,
          borderImageSource: defaultGradient(false),
        },
        '&.Mui-disabled': {
          opacity: 0.2,
          color: twinTheme`colors.white`,
          backgroundImage: defaultGradient(),
        },
      },
      containedSecondary: {
        color: twinTheme`colors.white`,
        background: theme.palette.secondary.main,
        '&:hover': {
          opacity: 0.8,
          backgroundColor: theme.palette.secondary.main,
        },
        '&:active': {
          opacity: 0.6,
          backgroundColor: theme.palette.secondary.main,
        },
        '&:focus': {
          outline: 'none',
          backgroundColor: theme.palette.secondary.main,
        },
        '&.Mui-disabled': {
          opacity: 0.2,
          color: twinTheme`colors.white`,
          backgroundColor: theme.palette.secondary.main,
        },
      },
      containedSizeSmall: {
        padding: theme.spacing(0.5, 1.5),
        fontSize: twinTheme`fontSize.sm`,
      },
      textSizeSmall: {
        padding: theme.spacing(0.5, 1.5),
      },
      text: {
        color: theme.palette.secondary.main,
        fontSize: twinTheme`fontSize.sm`,
        lineHeight: twinTheme`lineHeight.7`,
        fontWeight: twinTheme`fontWeight.bold`,
      },
      sizeSmall: {
        fontSize: twinTheme`fontSize.sm`,
        fontWeight: twinTheme`fontWeight.bold`,
      },
    },
  },
  MuiButtonBase: {
    defaultProps: {
      disableRipple: true,
    },
  },
  MuiInputBase: {
    styleOverrides: {
      root: {
        fontWeight: 'inherit',
      },
      inputSizeSmall: {
        fontSize: twinTheme`fontSize.sm`,
      },
    },
  },

  MuiInput: {
    styleOverrides: {
      underline: {
        '&:before': {
          borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
        },
        '&:hover:not(.Mui-disabled):before': {
          borderBottom: '1px solid rgba(0, 0, 0, 0.4)',
        },
        '&:after': {
          borderBottom: `1px solid ${twinTheme`colors.sky.DEFAULT`}`,
        },
      },
    },
  },
  MuiOutlinedInput: {
    styleOverrides: {
      root: {
        borderRadius: twinTheme`borderRadius.md`,
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: theme.palette.grey[500],
          borderWidth: 2,
          borderRadius: twinTheme`borderRadius.md`,
        },
        '&:hover .MuiOutlinedInput-notchedOutline': {
          borderWidth: 2,
          borderColor: theme.palette.grey[500],
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderWidth: 2,
          borderColor: theme.palette.grey[500],
        },
      },
      notchedOutline: {
        '& > legend': {
          width: 0,
          maxWidth: 'none',
        },
      },
      sizeSmall: {
        borderRadius: twinTheme`borderRadius.sm`,
      },
    },
  },
  MuiInputLabel: {
    styleOverrides: {
      root: {
        color: theme.palette.text.secondary,
        '&.Mui-focused': {
          color: theme.palette.common.black,
        },
      },
      outlined: {
        transform: `translate(25px, 16px) scale(1);`,
        '&.MuiInputLabel-shrink': {
          color: theme.palette.text.secondary,
          backgroundColor: theme.palette.primary.contrastText,
          paddingLeft: '4px',
          paddingRight: '4px',
          transform: `translate(25px, -10px) scale(0.8);`,
        },
        '&.MuiInputLabel-sizeSmall': {
          transform: `translate(25px,8px) scale(1)`,
          '&.MuiInputLabel-shrink': {
            color: theme.palette.text.secondary,
            backgroundColor: theme.palette.primary.contrastText,
            paddingLeft: '4px',
            paddingRight: '4px',
            transform: `translate(25px, -20px) scale(0.8);`,
          },
        },
      },
      sizeSmall: {
        fontSize: twinTheme`fontSize.sm`,
      },
    },
  },
  MuiFormControl: {
    defaultProps: {
      variant: 'outlined',
    },
    styleOverrides: {
      root: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(1),
      },
      marginDense: {
        marginTop: 0,
        marginBottom: 0,
      },
    },
  },
  MuiFormControlLabel: {
    styleOverrides: {
      label: {
        fontSize: 'inherit',
      },
    },
  },
  MuiSelect: {
    defaultProps: {
      MenuProps: {
        anchorOrigin: {
          vertical: 60,
          horizontal: 'left',
        },
        transformOrigin: {
          vertical: 'top',
          horizontal: 'left',
        },
      },
    },
    styleOverrides: {
      iconOutlined: {
        right: theme.spacing(2.5),
      },
      select: {
        '&:focus': {
          outline: 'none',
          backgroundColor: 'transparent',
        },
      },
    },
  },
  MuiSnackbar: {
    styleOverrides: {
      root: {
        borderRadius: theme.shape.borderRadius,
        boxShadow: theme.shadows[4],
      },
    },
  },
  MuiAlert: {
    variants: [
      {
        props: { variant: 'primary' },
        style: {
          color: theme.palette.primary.contrastText,
          backgroundColor: theme.palette.primary.main,
        },
      },
      {
        props: { variant: 'secondary' },
        style: {
          color: '#3C3C3C',
          backgroundColor: '#f5b5d2',
        },
      },
    ],
    styleOverrides: {
      root: {
        alignItems: 'center',
      },
      standardSuccess: {
        color: theme.palette.grey[800],
      },
      standardInfo: {
        color: theme.palette.grey[800],
      },
      standardWarning: {
        color: theme.palette.grey[800],
      },
      standardError: {
        color: theme.palette.grey[800],
      },
      action: {
        paddingTop: 0,
      },
    },
  },
  MuiFormLabel: {
    defaultProps: {
      focused: false,
    },
    styleOverrides: {
      root: {
        color: 'currentColor',
      },
    },
  },
  MuiButtonGroup: {
    styleOverrides: {
      contained: {
        borderRadius: twinTheme`borderRadius.full`,
      },
    },
  },
  MuiListItem: {
    defaultProps: {
      disableGutters: true,
    },
  },
  MuiListItemIcon: {
    styleOverrides: {
      root: {
        minWidth: 35,
        paddingRight: theme.spacing(1),
        marginTop: theme.spacing(0.5),
        alignSelf: 'flex-start',
        justifyContent: 'flex-end',
      },
    },
  },
  MuiListItemText: {
    styleOverrides: {
      inset: {
        paddingLeft: 35,
      },
    },
  },
  MuiCardContent: {
    styleOverrides: {
      root: {
        '&:last-child': {
          paddingBottom: undefined,
        },
      },
    },
  },
  MuiCheckbox: {
    defaultProps: {
      disableRipple: true,
      color: 'secondary',
    },
  },
  MuiRadio: {
    defaultProps: {
      disableRipple: true,
      color: 'secondary',
    },
  },
  MuiTabs: {
    defaultProps: {
      TabIndicatorProps: {
        children: createElement('span', null),
      },
    },
    styleOverrides: {
      root: {
        marginBottom: theme.spacing(4),
      },
      indicator: {
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        '& > span': {
          maxWidth: 30,
          width: '100%',
          backgroundColor: twinTheme`colors.sky.DEFAULT`,
          backgroundSize: '100%',
          backgroundImage: defaultGradient(),
        },
      },
    },
  },
  MuiTab: {
    defaultProps: {
      disableRipple: true,
    },
    styleOverrides: {
      root: {
        textTransform: 'uppercase',
        fontSize: twinTheme`fontSize.2xl`,
        lineHeight: twinTheme`lineHeight.8`,
        fontWeight: twinTheme`fontWeight.bold`,
        backgroundColor: twinTheme`colors.sky.DEFAULT`,
        backgroundSize: '100%',
        backgroundImage: defaultGradient(),
        backgroundRepeat: 'repeat',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        minWidth: 0,
        paddingLeft: 0,
        paddingRight: 0,
        marginRight: theme.spacing(6),
        '&:focus': {
          opacity: 1,
        },
        '& > span': {
          alignItems: 'start',
        },
        [theme.breakpoints.up('sm')]: {
          minWidth: 0,
        },
      },
    },
  },
  MuiDialogActions: {
    styleOverrides: {
      root: {
        padding: theme.spacing(2, 2),
      },
    },
  },
  MuiDialogTitle: {
    styleOverrides: {
      root: {
        padding: theme.spacing(3, 3, 2),
      },
    },
  },
  MuiStepLabel: {
    styleOverrides: {
      label: {
        fontWeight: 300,
        fontSize: theme.typography.fontSize,
        '&.Mui-active': {
          fontWeight: 300,
        },
        '&.Mui-completed': {
          fontWeight: 300,
        },
      },
    },
  },
  MuiPaper: {
    styleOverrides: {
      root: {
        borderRadius: twinTheme`borderRadius.md`,
      },
    },
  },
});

export default createTheme({
  ...appTheme,
  components: overrides(appTheme),
});

const rteRootStyle = {
  borderWidth: 2,
  borderColor: appTheme.palette.grey[500],
  borderRadius: twinTheme`borderRadius.md`,
};
const rteEditorStyle = {
  height: '250px',
  overflowY: 'hidden',
  marginBottom: '10px',
  marginTop: '1px',
};

export { rteRootStyle, rteEditorStyle };

const RichTextStyle = styled('div')(() => ({
  '& ul, & ol': {
    marginBottom: '1rem',
    listStyleType: 'disc',
    paddingLeft: '2rem',
  },
  p: {
    marginBottom: '1rem',
  },
}));
export { RichTextStyle };
