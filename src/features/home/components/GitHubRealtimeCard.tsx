'use client';

import { Activity } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useMemo, useState } from 'react';
import { GitHubCalendar } from 'react-github-calendar';

type YearMode = 'last' | 'current';

const GITHUB_USERNAME = 'Muhamad-SazidanA';

export default function GitHubRealtimeCard() {
    const { resolvedTheme } = useTheme();
    const [yearMode, setYearMode] = useState<YearMode>('last');
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const currentYear = new Date().getFullYear();
    const selectedYear: 'last' | number = yearMode === 'last' ? 'last' : currentYear;
    const colorScheme = resolvedTheme === 'dark' ? 'dark' : 'light';

    const calendarTheme = useMemo(
        () => ({
            light: ['hsl(248 34% 92%)', 'hsl(257 72% 80%)', 'hsl(252 82% 67%)', 'hsl(247 86% 56%)', 'hsl(238 88% 45%)'],
            dark: ['hsl(229 28% 16%)', 'hsl(241 38% 30%)', 'hsl(247 58% 44%)', 'hsl(254 74% 56%)', 'hsl(270 90% 67%)'],
        }),
        [],
    );

    return (
        <div className="rounded-2xl border border-borderc/55 bg-surface/20 p-4 backdrop-blur-sm md:p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="inline-flex items-center gap-2 text-sm font-semibold text-text">
                    <Activity size={16} className="text-accent" />
                    GitHub Activity (Real-time)
                </div>

                <div className="inline-flex items-center gap-2 text-xs text-text/70 md:text-sm">
                    <span>Year</span>
                    <select
                        value={yearMode}
                        onChange={(event) => setYearMode(event.target.value as YearMode)}
                        className="rounded-lg border border-borderc/65 bg-bg/85 px-2.5 py-1.5 font-semibold text-text outline-none transition focus:border-accent/75"
                    >
                        <option value="last">Last year</option>
                        <option value="current">{currentYear}</option>
                    </select>
                </div>
            </div>

            <p className="mt-2 text-xs text-text/65">Last 365 days</p>

            <div className="mt-3 overflow-x-auto">
                <div className="min-w-[700px] rounded-xl border border-borderc/45 bg-bg/30 p-3 md:p-4">
                    {isMounted ? (
                        <GitHubCalendar
                            username={GITHUB_USERNAME}
                            year={selectedYear}
                            colorScheme={colorScheme}
                            theme={calendarTheme}
                            throwOnError={false}
                            errorMessage="Data kontribusi GitHub sementara tidak tersedia. Coba refresh lagi beberapa saat."
                            blockSize={12}
                            blockMargin={4}
                            fontSize={13}
                            labels={{
                                totalCount: '{{count}} contributions in {{year}}',
                            }}
                        />
                    ) : (
                        <div className="h-[112px] animate-pulse rounded-lg bg-surface/55" aria-hidden />
                    )}
                </div>
            </div>

            <p className="mt-3 text-xs text-text/60 md:text-sm">
                Sumber data: profil GitHub @
                <a
                    href={`https://github.com/${GITHUB_USERNAME}`}
                    target="_blank"
                    rel="noreferrer"
                    className="font-semibold text-accent transition hover:text-text"
                >
                    {GITHUB_USERNAME}
                </a>
            </p>
        </div>
    );
}
