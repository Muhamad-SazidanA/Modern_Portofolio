'use client';

import { motion } from 'framer-motion';
import { Menu, Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';
import ThemeToggle from './ThemeToggle';

const sections = ['home', 'about', 'certif', 'project', 'contact'] as const;

export default function Navbar() {
    const [active, setActive] = useState<(typeof sections)[number]>('home');

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries.find((entry) => entry.isIntersecting);
                if (visible?.target.id) {
                    setActive(visible.target.id as (typeof sections)[number]);
                }
            },
            { rootMargin: '-40% 0px -50% 0px', threshold: 0.01 },
        );

        sections.forEach((id) => {
            const element = document.getElementById(id);
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <header className="fixed inset-x-0 top-0 z-50">
            <nav className="mx-auto mt-4 flex h-16 w-[min(960px,94vw)] items-center justify-between rounded-2xl border border-borderc/40 bg-surface/30 px-4 backdrop-blur-md">
                <a href="#home" className="inline-flex items-center gap-2 text-sm font-semibold tracking-wide text-text">
                    <Sparkles size={16} className="text-accent" />
                    Sza
                </a>

                <div className="hidden items-center gap-1 md:flex">
                    {sections.map((item) => {
                        const isActive = active === item;
                        return (
                            <a
                                key={item}
                                href={`#${item}`}
                                className="relative rounded-full px-4 py-2 text-sm capitalize text-text/85 transition hover:text-text"
                            >
                                {item}
                                {isActive && (
                                    <motion.span
                                        layoutId="active-pill"
                                        className="absolute inset-0 -z-10 rounded-full border border-accent/60 bg-accent/15"
                                        transition={{ type: 'spring', stiffness: 320, damping: 26 }}
                                    />
                                )}
                            </a>
                        );
                    })}
                </div>

                <div className="flex items-center gap-2">
                    <ThemeToggle />
                    <button
                        type="button"
                        className="grid h-10 w-10 place-items-center rounded-xl border border-borderc/50 bg-surface/30 md:hidden"
                        aria-label="Open menu"
                    >
                        <Menu size={18} />
                    </button>
                </div>
            </nav>
        </header>
    );
}
