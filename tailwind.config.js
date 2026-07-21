/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    container: {
      center: true,
      padding: '1.25rem',
    },
    extend: {
      colors: {
        ink: {
          DEFAULT: '#0A0E1A',
          muted: '#5B6472',
          soft: '#8A93A6',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          alt: '#F5F6FA',
          dark: '#0A0E1A',
        },
        primary: {
          50: '#EEF1FF',
          100: '#DCE2FF',
          200: '#B9C6FF',
          300: '#8FA0FF',
          400: '#5E72F9',
          500: '#2541F0',
          600: '#1E34D6',
          700: '#1B2FB8',
          800: '#182995',
          900: '#141F6B',
        },
        accent: {
          50: '#FFF3EC',
          100: '#FFE2D0',
          200: '#FFC5A1',
          300: '#FFA06B',
          400: '#FF8A54',
          500: '#FF7A45',
          600: '#F0602A',
          700: '#C94A1E',
          800: '#9C3A18',
        },
        success: {
          500: '#16A34A',
          50: '#EFFCF3',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(10,14,26,0.04), 0 8px 24px -8px rgba(10,14,26,0.10)',
        'card-hover': '0 4px 10px rgba(10,14,26,0.06), 0 20px 40px -12px rgba(10,14,26,0.18)',
        panel: '0 1px 0 rgba(10,14,26,0.04), 0 20px 60px -20px rgba(10,14,26,0.25)',
      },
      borderRadius: {
        xl2: '1.25rem',
      },
      animation: {
        marquee: 'marquee 32s linear infinite',
        'marquee-reverse': 'marquee-reverse 36s linear infinite',
        'fade-up': 'fade-up 0.6s cubic-bezier(0.16,1,0.3,1) both',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0)' },
        },
        'fade-up': {
          '0%': { opacity: 0, transform: 'translateY(24px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
