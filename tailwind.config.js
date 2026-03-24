/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          bg: '#060a10',
          panel: 'rgba(16, 18, 27, 0.6)',
          border: 'rgba(0, 212, 255, 0.2)',
          primary: '#00d4ff', // Cyan
          secondary: '#7b2ff7', // Purple
          accent: '#2dd4bf', 
          warning: '#f59e0b', // Amber
        }
      },
      boxShadow: {
        'glow-primary': '0 0 15px rgba(0, 212, 255, 0.3)',
        'glow-secondary': '0 0 15px rgba(123, 47, 247, 0.3)',
        'glow-accent': '0 0 15px rgba(45, 212, 191, 0.3)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Space Mono', 'Fira Code', 'monospace'],
      },
      keyframes: {
        scanbar: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(200%)' }
        },
        sonar: {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '100%': { transform: 'scale(3)', opacity: '0' }
        },
        breathe: {
          '0%, 100%': { opacity: '0.6', boxShadow: '0 0 10px rgba(0,212,255,0.2)' },
          '50%': { opacity: '1', boxShadow: '0 0 25px rgba(0,212,255,0.6)' }
        }
      },
      animation: {
        scanbar: 'scanbar 2s linear infinite',
        sonar: 'sonar 1.5s cubic-bezier(0, 0, 0.2, 1) infinite',
        breathe: 'breathe 3s ease-in-out infinite'
      }
    },
  },
  plugins: [],
}
