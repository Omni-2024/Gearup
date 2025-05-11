import { Config } from 'tailwindcss';

const config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#00FF29',
        secondary: '#1C3F39',
        dark: '#02080D',
        darkGreen: '#020E07',
        gearupgreen: '#297216',
        lightGreen: '#00ff94',
      },
      fontFamily: {
        'helvetica-neue-lt': ['HelveticaNeueLTW06-93BlkExtObl', 'serif'],
      },
      container: {
        center: true,
        padding: '1rem',
      },
      keyframes: {
        glow: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.5 }
        }
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};

export default config;