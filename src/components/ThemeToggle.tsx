'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
    const { resolvedTheme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    if (!mounted) return <div className="h-[36px] w-[74px] rounded-[999px] border border-borderc/65 bg-surface/35" />;

    const isDark = resolvedTheme === 'dark';

    return (
        <label htmlFor="theme" className="theme" aria-label="Toggle theme">
            <span className="theme__toggle-wrap">
                <input
                    id="theme"
                    className="theme__toggle"
                    type="checkbox"
                    role="switch"
                    name="theme"
                    checked={isDark}
                    onChange={(event) => setTheme(event.target.checked ? 'dark' : 'light')}
                />
                <span className="theme__icon">
                    <span className="theme__icon-part" />
                    <span className="theme__icon-part" />
                    <span className="theme__icon-part" />
                    <span className="theme__icon-part" />
                    <span className="theme__icon-part" />
                    <span className="theme__icon-part" />
                    <span className="theme__icon-part" />
                    <span className="theme__icon-part" />
                    <span className="theme__icon-part" />
                </span>
            </span>
        </label>
    );
}
