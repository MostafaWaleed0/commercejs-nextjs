module.exports = {
  content: ['./pages/*.tsx', './components/**/*.tsx'],
  theme: {
    extend: {
      keyframes: {
        sweep: {
          '0%': { opacity: '0', transform: 'translateX(-10px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' }
        }
      },
      animation: {
        sweep: 'sweep .5s ease-in-out'
      },
      colors: {},
      container: {
        center: true,
        padding: 'min(5vw,50px)'
      },
      fontFamily: {
        poppins: 'poppins, serif',
        playfairDisplay: 'Playfair Display, serif',
        raisonne: 'Raisonne Demibold'
      }
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/line-clamp'),
    function ({ addComponents }) {
      addComponents({
        '.container': {
          maxWidth: '1920px'
        }
      });
    }
  ]
};
