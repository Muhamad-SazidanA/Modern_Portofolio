import type { Config } from 'tailwindcss';

const config: Config = {
    darkMode: ['class'],
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                bg: 'hsl(var(--bg) / <alpha-value>)',
                surface: 'hsl(var(--surface) / <alpha-value>)',
                borderc: 'hsl(var(--borderc) / <alpha-value>)',
                text: 'hsl(var(--text) / <alpha-value>)',
                accent: 'hsl(var(--accent) / <alpha-value>)',
            },
            boxShadow: {
                neon: '0 0 20px rgba(97, 0, 148, 0.45), 0 0 50px rgba(97, 0, 148, 0.25)',
            },
            backgroundImage: {
                'grid-soft':
                    'linear-gradient(to right, hsl(var(--borderc) / 0.08) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--borderc) / 0.08) 1px, transparent 1px)',
            },
            animation: {
                'aurora-drift': 'aurora-drift 25s infinite alternate ease-in-out',
                'grid-shift': 'grid-shift 20s linear infinite',
                'aurora-pulse': 'aurora-pulse 8s infinite alternate',
                float: 'float 6s ease-in-out infinite',
            },
            keyframes: {
                'aurora-drift': {
                    '0%': {
                        backgroundPosition: '0% 0%, 0% 0%, 0% 0%',
                        filter: 'hue-rotate(0deg) brightness(1)',
                    },
                    '50%': {
                        backgroundPosition: '-10% -5%, 5% 10%, 0% 15%',
                        filter: 'hue-rotate(12deg) brightness(1.1)',
                    },
                    '100%': {
                        backgroundPosition: '5% 10%, -10% -5%, 15% 0%',
                        filter: 'hue-rotate(20deg) brightness(1)',
                    },
                },
                'grid-shift': {
                    '0%': { transform: 'translate(0, 0)' },
                    '100%': { transform: 'translate(-50%, -50%)' },
                },
                'aurora-pulse': {
                    '0%': { opacity: '0.85', transform: 'scale(1)' },
                    '50%': { opacity: '0.5', transform: 'scale(1.05)' },
                    '100%': { opacity: '0.85', transform: 'scale(1)' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
            },
        },
    },
    plugins: [],
};

export default config;
