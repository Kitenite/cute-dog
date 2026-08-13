'use client';

import { useEffect, useState } from 'react';

export default function ThemeToggle() {
    const [isDark, setIsDark] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setIsDark(document.documentElement.classList.contains('dark'));
        setMounted(true);
    }, []);

    const toggle = () => {
        const nextIsDark = !isDark;
        setIsDark(nextIsDark);
        document.documentElement.classList.toggle('dark', nextIsDark);
        try {
            localStorage.setItem('theme', nextIsDark ? 'dark' : 'light');
        } catch {
            // localStorage can be unavailable (e.g. private browsing); the class still applies
        }
    };

    return (
        <button
            type="button"
            onClick={toggle}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            className="fixed top-4 right-4 z-30 w-12 h-12 flex items-center justify-center text-2xl rounded-full bg-white dark:bg-neutral-800 shadow-lg hover:scale-110 transition-transform cursor-pointer"
            data-oid="theme-toggle"
        >
            {mounted ? (isDark ? '🌙' : '☀️') : '☀️'}
        </button>
    );
}
