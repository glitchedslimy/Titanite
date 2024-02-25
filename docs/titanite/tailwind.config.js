/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        black: '#05101b',
        primary: '#00d557',
        white: '#fafafa',
      }
    },
  },
  plugins: [],
}

