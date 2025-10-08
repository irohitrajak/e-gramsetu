/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "var(--color-border)", /* gray-200 */
        input: "var(--color-input)", /* gray-50 */
        ring: "var(--color-ring)", /* green-800 */
        background: "var(--color-background)", /* white */
        foreground: "var(--color-foreground)", /* gray-900 */
        primary: {
          DEFAULT: "var(--color-primary)", /* green-800 */
          foreground: "var(--color-primary-foreground)", /* white */
        },
        secondary: {
          DEFAULT: "var(--color-secondary)", /* saddle-brown */
          foreground: "var(--color-secondary-foreground)", /* white */
        },
        destructive: {
          DEFAULT: "var(--color-destructive)", /* red-600 */
          foreground: "var(--color-destructive-foreground)", /* white */
        },
        muted: {
          DEFAULT: "var(--color-muted)", /* gray-50 */
          foreground: "var(--color-muted-foreground)", /* gray-500 */
        },
        accent: {
          DEFAULT: "var(--color-accent)", /* dark-orange */
          foreground: "var(--color-accent-foreground)", /* white */
        },
        popover: {
          DEFAULT: "var(--color-popover)", /* white */
          foreground: "var(--color-popover-foreground)", /* gray-900 */
        },
        card: {
          DEFAULT: "var(--color-card)", /* gray-50 */
          foreground: "var(--color-card-foreground)", /* gray-900 */
        },
        success: {
          DEFAULT: "var(--color-success)", /* green-600 */
          foreground: "var(--color-success-foreground)", /* white */
        },
        warning: {
          DEFAULT: "var(--color-warning)", /* amber-500 */
          foreground: "var(--color-warning-foreground)", /* white */
        },
        error: {
          DEFAULT: "var(--color-error)", /* red-600 */
          foreground: "var(--color-error-foreground)", /* white */
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        'organic': '28px 16px 32px 20px',
      },
      fontFamily: {
        heading: ['Noto Sans Devanagari', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        accent: ['Noto Sans Devanagari', 'sans-serif'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      boxShadow: {
        'soft': '0 4px 12px rgba(139, 69, 19, 0.15)',
        'organic': '0 8px 25px rgba(139, 69, 19, 0.1)',
      },
      animation: {
        'pulse-gentle': 'pulse-gentle 2s cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite',
        'slide-up': 'slide-up 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'scale-in': 'scaleIn 0.3s ease-out',
      },
      keyframes: {
        'pulse-gentle': {
          '0%, 100%': {
            opacity: '1',
          },
          '50%': {
            opacity: '0.8',
          },
        },
        'slide-up': {
          from: {
            opacity: '0',
            transform: 'translateY(20px)',
          },
          to: {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        scaleIn: {
          from: { 
            opacity: '0',
            transform: 'scale(0.9)',
          },
          to: { 
            opacity: '1',
            transform: 'scale(1)',
          },
        },
      },
      transitionTimingFunction: {
        'organic': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      },
      gridTemplateColumns: {
        'auto-fit': 'repeat(auto-fit, minmax(280px, 1fr))',
        'auto-fill': 'repeat(auto-fill, minmax(280px, 1fr))',
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
  ],
}