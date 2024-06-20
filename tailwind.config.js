

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors:{
        backgroundPrimary: '#F6F7F9',
        
        customBlue: {
          50: '#D5E3F7',
          100: '#BABABA',
          300: '#BFBFBF',
          500: '#3478D7',
          900: '#0A2F5B',
        },
        customViolet: {
          300: '#c1b8fa',//TODO
          900: '#5954D2',
        },
        customRed: {
          600: '#DD0021',
          900: '#D73451',
          
        },

      }
    },
  },
  plugins: [],
};
