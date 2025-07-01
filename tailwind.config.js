/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}", "./dist/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        // Theme colors - can be customized via CSS custom properties
        'brand': '#2563eb', // Primary brand color
        'brand-light': '#3b82f6', // Lighter brand variant
        'brand-dark': '#1d4ed8', // Darker brand variant
        'accent': '#10b981', // Secondary accent color
        'accent-light': '#34d399',
        'accent-dark': '#059669',
        // Neutral palette
        'neutral-25': '#fcfcfc',
        'neutral-50': '#fafafa',
        'neutral-75': '#f7f7f7',
        'neutral-100': '#f5f5f5',
        'neutral-850': '#1f2937',
        'neutral-900': '#111827'
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-in-out',
        'fade-in-delay': 'fadeIn 0.8s ease-in-out 0.3s both',
        'float': 'float 3s ease-in-out infinite',
        'bounce-slow': 'bounce 2s infinite',
        'pulse-slow': 'pulse 3s infinite'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' }
        }
      },
      fontFamily: {
        'sans': ['-apple-system', 'BlinkMacSystemFont', 'SF Pro Display', 'Segoe UI', 'Roboto', 'sans-serif'],
        'heading': ['-apple-system', 'BlinkMacSystemFont', 'SF Pro Display', 'Segoe UI', 'Roboto', 'sans-serif']
      }
    }
  },
  plugins: [],
}
