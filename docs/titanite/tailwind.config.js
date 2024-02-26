/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        black: '#05101b',
        primary: '#00d557',
        white: '#fafafa',
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.white'),
            h1: {
              color: theme('colors.white')
            },
            h2: {
              color: theme('colors.white')
            },
            h3: {
              color: theme('colors.white')
            },
            h4: {
              color: theme('colors.white')
            },
            h5: {
              color: theme('colors.white')
            },
            h6: {
              color: theme('colors.white')
            },
            a: {
              color: theme('colors.primary'),
              textDecoration: 'none',
              '&:hover': {
                color: theme('colors.primary'),
                textDecoration: 'underline',
              },
            },
            pre: {
              color: 'inherit',
              backgroundColor: 'transparent',
              lineHeight: 'inherit',
              
            },
            code: {
              color: 'inherit',
              backgroundColor: 'transparent',
              padding: '0',
              
            },
           table: {
              width: '100%',
              lineHeight: '1.5',
              marginBottom: '1.5em',
              color: theme('colors.white'),
            },
            thead: {
              borderBottom: '1px solid',
              borderBottomColor: theme('colors.gray.300'),
            },
            tbody: {
              borderBottom: '1px solid',
              borderBottomColor: theme('colors.gray.200'),
            },
            tr: {
              borderBottom: '1px solid',
              borderBottomColor: theme('colors.gray.100'),
            },
            th: {
              padding: '.5em',
              color: theme('colors.white'),
              textAlign: 'left',
            },
            td: {
              padding: '.5em',
              textAlign: 'left',
            },
          },
        }
      })
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

