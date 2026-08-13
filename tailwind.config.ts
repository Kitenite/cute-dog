import type { Config } from 'tailwindcss';

export default {
    darkMode: 'selector',
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                background: 'var(--background)',
                foreground: 'var(--foreground)',
            },
            keyframes: {
                wiggle: {
                    '0%, 100%': { transform: 'rotate(-3deg)' },
                    '50%': { transform: 'rotate(3deg)' },
                },
                blink: {
                    '0%, 92%, 100%': { transform: 'scaleY(1)' },
                    '96%': { transform: 'scaleY(0.1)' },
                },
                wag: {
                    '0%, 100%': { transform: 'rotate(-20deg)' },
                    '50%': { transform: 'rotate(20deg)' },
                },
                breathe: {
                    '0%, 100%': { transform: 'scale(1) translateY(0)' },
                    '50%': { transform: 'scale(1.015) translateY(-4px)' },
                },
                'ear-twitch': {
                    '0%, 100%': { transform: 'rotate(0deg)' },
                    '25%': { transform: 'rotate(-8deg)' },
                    '50%': { transform: 'rotate(6deg)' },
                    '75%': { transform: 'rotate(-4deg)' },
                },
                'float-heart': {
                    '0%': { transform: 'translateY(0) scale(0.6)', opacity: '0' },
                    '15%': { transform: 'translateY(-15px) scale(1)', opacity: '1' },
                    '100%': { transform: 'translateY(-120px) scale(1.1)', opacity: '0' },
                },
                'pop-in': {
                    '0%': { transform: 'scale(0.6)', opacity: '0' },
                    '100%': { transform: 'scale(1)', opacity: '1' },
                },
            },
            animation: {
                'wag-slow': 'wag 1.2s ease-in-out infinite',
                'wag-med': 'wag 0.6s ease-in-out infinite',
                'wag-fast': 'wag 0.3s ease-in-out infinite',
                breathe: 'breathe 4s ease-in-out infinite',
                'ear-twitch': 'ear-twitch 0.4s ease-in-out',
                'float-heart': 'float-heart 1.2s ease-out forwards',
                'pop-in': 'pop-in 0.2s ease-out',
            },
        },
    },
    plugins: [],
} satisfies Config;
