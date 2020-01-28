module.exports = {
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
    fontFamily: {
      display: ['Arial', 'sans-serif'],
      body: ['Times New Roman', 'serif'],
    },
    borderWidth: {
      default: '1px',
      '0': '0',
      '2': '2px',
      '4': '4px',
    },
    extend: {
      colors: {
        orange: '#E56D16',
        lavender: '#74526C',
        gray: '#635D5C',
        onyx: '#3D2B3D',
      },
      spacing: {
        '1': '0.25rem',
        '2': '0.5rem',
        '4': '1rem',
        '6': '1.5rem',
        '8': '2rem',
        '16': '4rem',
        '32': '8rem',
      }
    }
  }
}
