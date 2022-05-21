const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import("@types/tailwindcss/tailwind-config").TailwindConfig } */
module.exports = {
  // purge: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  plugins: [require('@tailwindcss/line-clamp')],
  purge: {
    enabled: false,
  },
  theme: {
    fontFamily: {
      sans: ['Barlow', ...defaultTheme.fontFamily.sans],
    },
    extend: {
      colors: {
        orange: {
          DEFAULT: '#EF7D00',
          50: '#FFEBD6',
          100: '#FFDFBC',
          200: '#FFC789',
          300: '#FFAE56',
          400: '#FF9623',
          500: '#EF7D00',
          600: '#BC6200',
          700: '#894800',
          800: '#562D00',
          900: '#231200',
        },
        pink: {
          DEFAULT: '#E5007E',
          50: '#FFCCE8',
          100: '#FFB2DC',
          200: '#FF7FC5',
          300: '#FF4CAE',
          400: '#FF1998',
          500: '#E5007E',
          600: '#B20062',
          700: '#7F0046',
          800: '#4C002A',
          900: '#19000E',
        },
        gray: {
          50: '#f9f9f6',
          100: '#F5F5F5',
          200: '#EBEBEB',
          300: '#c6c6c6',
          400: '#b5b5b3',
          500: '#959593',
          600: '#6d6d6b',
          700: '#595957',
          800: '#3b3b39',
          900: '#8E8E8E',
        },
      },
      container: (theme) => ({
        center: true,
        padding: {
          DEFAULT: theme('spacing.4'),
          sm: theme('spacing.5'),
          lg: theme('spacing.6'),
          xl: theme('spacing.8'),
        },
        screens: {
          sm: '640px',
          md: '960px',
          lg: '1280px',
          xl: '1600px',
        },
      }),
      animation: {
        appear: 'appear 500ms ease-in-out forwards',
        disappear: 'disappear 500ms ease-in-out forwards',
        'slide-down': 'slideY 250ms ease-out',
      },
      keyframes: {
        slideY: {
          '0%': { transform: 'translateY(-120%)' },
          '100%': { transform: 'translateY(0%)' },
        },
        appear: {
          to: { opacity: 'var(--appear-opacity)' },
        },
        disappear: {
          to: { opacity: 0 },
        },
      },
    },
  },
};
