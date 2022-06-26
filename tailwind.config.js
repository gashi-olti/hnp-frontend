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
      sans: ['Rubik', ...defaultTheme.fontFamily.sans],
    },
    extend: {
      colors: {
        sky: {
          DEFAULT: '#05445E',
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#05445E',
        },
        cyan: {
          DEFAULT: '#189AB4',
          50: '#ecfeff',
          100: '#cffafe',
          200: '#a5f3fc',
          300: '#67e8f9',
          400: '#22d3ee',
          500: '#06b6d4',
          600: '#189AB4',
          700: '#0e7490',
          800: '#155e75',
          900: '#164e63',
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
