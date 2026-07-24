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
          DEFAULT: '#0f172a',
          muted: '#64748b',
          soft: '#94a3b8',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          alt: '#f8fafc',
          dark: '#0f172a',
        },
        primary: {
          50: '#eef5ff',
          100: '#d4e5ff',
          200: '#b3d4ff',
          300: '#80bbff',
          400: '#4d9cff',
          500: '#004a7e',
          600: '#003d6b',
          700: '#003058',
          800: '#002345',
          900: '#001632',
        },
        accent: {
          50: '#fff3ec',
          100: '#ffe2d0',
          200: '#ffc5a1',
          300: '#ffa06b',
          400: '#ff8a54',
          500: '#ff7829',
          600: '#e65c00',
          700: '#b34700',
          800: '#8c3900',
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
