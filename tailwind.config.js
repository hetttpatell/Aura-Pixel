/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'primary-teal': '#008080',
                'primary-light': '#e6f2f2',
                'primary-dark': '#006666',
                'bg-main': '#ffffff',
                'bg-soft': '#f8fafc',
                'text-heading': '#0f172a',
                'text-body': '#475569',
                'border-light': '#e2e8f0',
            },
            fontFamily: {
                'heading': ['Plus Jakarta Sans', 'sans-serif'],
                'body': ['Inter', 'sans-serif'],
            },
            borderRadius: {
                'card': '16px',
                'btn': '12px',
            },
            boxShadow: {
                'sm': '0 1px 3px rgba(0, 128, 128, 0.1)',
                'md': '0 4px 20px rgba(0, 128, 128, 0.08)',
                'lg': '0 10px 40px rgba(0, 128, 128, 0.12)',
                'glow': '0 0 30px rgba(0, 128, 128, 0.2)',
                'card': '0 4px 24px rgba(0, 128, 128, 0.06)',
            },
            animation: {
                'float': 'float 3s ease-in-out infinite',
                'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
                'shimmer': 'shimmer 2s linear infinite',
                'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
                'slide-in-left': 'slideInLeft 0.6s ease-out forwards',
                'slide-in-right': 'slideInRight 0.6s ease-out forwards',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
                'pulse-glow': {
                    '0%, 100%': { boxShadow: '0 0 20px rgba(0, 128, 128, 0.2)' },
                    '50%': { boxShadow: '0 0 40px rgba(0, 128, 128, 0.4)' },
                },
                shimmer: {
                    '0%': { backgroundPosition: '-200% 0' },
                    '100%': { backgroundPosition: '200% 0' },
                },
                fadeInUp: {
                    '0%': { opacity: '0', transform: 'translateY(30px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                slideInLeft: {
                    '0%': { opacity: '0', transform: 'translateX(-50px)' },
                    '100%': { opacity: '1', transform: 'translateX(0)' },
                },
                slideInRight: {
                    '0%': { opacity: '0', transform: 'translateX(50px)' },
                    '100%': { opacity: '1', transform: 'translateX(0)' },
                },
            },
            backdropBlur: {
                'glass': '20px',
            },
        },
    },
    plugins: [],
}