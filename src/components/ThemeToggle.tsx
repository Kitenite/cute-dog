'use client';

import { useEffect, useState } from 'react';

export default function ThemeToggle() {
    const [isDark, setIsDark] = useState<boolean | null>(null);

    useEffect(() => {
        setIsDark(document.documentElement.classList.contains('dark'));
    }, []);

    const toggle = () => {
        const nextIsDark = !document.documentElement.classList.contains('dark');
        document.documentElement.classList.toggle('dark', nextIsDark);
        localStorage.setItem('theme', nextIsDark ? 'dark' : 'light');
        setIsDark(nextIsDark);
    };

    return (
        <button
            type="button"
            onClick={toggle}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            className="fixed top-4 right-4 z-30 w-12 h-12 flex justify-center items-center text-2xl rounded-full bg-white shadow-lg hover:scale-110 transition-transform dark:bg-neutral-800"
            data-oid="theme-toggle"
        >
            {isDark === null ? '' : isDark ? '☀️' : '🌙'}
        </button>
    );
}
