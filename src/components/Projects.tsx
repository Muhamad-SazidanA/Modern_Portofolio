'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight, ExternalLink, Grid3X3, X } from 'lucide-react';
import type { CSSProperties } from 'react';
import { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { useSectionInView } from '@/hooks/useSectionInView';

type Certificate = {
    title: string;
    imagePath: string;
    encodedPath: string;
};

type ProjectCategory = 'All' | 'Company Profile';

type ProjectItem = {
    title: string;
    description: string;
    imagePath: string;
    allImages: readonly string[];
    encodedPath: string;
    category: Exclude<ProjectCategory, 'All'>;
};

const certificateSources = [
    '/images/Certif/Belajar Membuat Front-End Web.webp',
    '/images/Certif/Belajar Dasar Manajemen Proyek.webp',
    '/images/Certif/Introduction to Financial Literacy-Sertiv.webp',
    '/images/Certif/Dasar Pemrograman Web.webp',
    '/images/Certif/Dasar Pemrograman JavaScript.webp',
    '/images/Certif/wadhwani/Online Communication & Data Security (Bahasa).webp',
    '/images/Certif/wadhwani/Self-Management (Bahasa).webp',
    '/images/Certif/wadhwani/Professionalism (Bahasa).webp',
    '/images/Certif/wadhwani/Problem Solving & Innovation (Bahasa).webp',
    '/images/Certif/wadhwani/Work Productivity Tools (Bahasa).webp',
    '/images/Certif/wadhwani/Self-Presentation (Bahasa).webp',
    '/images/Certif/wadhwani/JobReady Keterampilan Kerja.webp',
    '/images/Certif/wadhwani/JobReady Employability Skills (Bahasa).webp',
    '/images/Certif/wadhwani/Interpersonal Skills (Bahasa).webp',
    '/images/Certif/wadhwani/Impactful Writing Skills (Bahasa).webp',
    '/images/Certif/wadhwani/Effective Speaking and Listening Skills (Bahasa).webp',
    '/images/Certif/wadhwani/Customer Centricity (Bahasa).webp',
] as const;

const categories: ProjectCategory[] = ['All', 'Company Profile'];

const projectSeeds = [
    {
        title: 'Manusia AI - AI Powered Platform',
        description:
            'Platform inovatif berbasis AI untuk optimasi alur kerja dan kreativitas digital dengan antarmuka yang modern dan responsif.',
        imagePath: '/images/manusiaai/main-manusia-ai.svg',
        allImages: [
            '/images/manusiaai/main-manusia-ai.svg',
            '/images/manusiaai/Screenshot 2025-12-24 112115.png',
            '/images/manusiaai/Screenshot 2025-12-24 112153.png',
            '/images/manusiaai/Screenshot 2025-12-24 112234.png',
            '/images/manusiaai/Screenshot 2025-12-24 112441.png',
            '/images/manusiaai/Screenshot 2025-12-24 112532.png',
            '/images/manusiaai/Screenshot 2025-12-24 112624.png',
            '/images/manusiaai/Screenshot 2025-12-24 112710.png',
            '/images/manusiaai/Screenshot 2025-12-24 112823.png',
            '/images/manusiaai/Screenshot 2025-12-24 112851.png',
            '/images/manusiaai/Screenshot 2025-12-24 112935.png',
            '/images/manusiaai/Screenshot 2025-12-24 113001.png',
            '/images/manusiaai/Screenshot 2025-12-24 113034.png',
            '/images/manusiaai/Screenshot 2025-12-24 113135.png',
            '/images/manusiaai/Screenshot 2025-12-24 113213.png',
            '/images/manusiaai/Screenshot 2025-12-24 113250.png',
            '/images/manusiaai/Screenshot 2025-12-24 113431.png',
            '/images/manusiaai/Screenshot 2025-12-24 113546.png',
            '/images/manusiaai/Screenshot 2025-12-24 113609.png',
            '/images/manusiaai/Screenshot 2025-12-24 113634.png',
            '/images/manusiaai/Screenshot 2025-12-24 113731.png',
            '/images/manusiaai/Screenshot 2025-12-24 113747.png',
            '/images/manusiaai/Screenshot 2025-12-24 114153.png',
            '/images/manusiaai/Screenshot 2025-12-24 114223.png',
            '/images/manusiaai/Screenshot 2025-12-24 114323.png',
            '/images/manusiaai/Screenshot 2025-12-24 114735.png',
            '/images/manusiaai/Screenshot 2025-12-24 115658.png',
        ],
        category: 'Company Profile',
    },
    {
        title: 'Snap Int - Smart Integration Tool',
        description:
            'Solusi integrasi cerdas yang menghubungkan berbagai layanan digital dengan mudah, efisien, dan aman.',
        imagePath: '/images/snapint/main-snapint-ai.svg',
        allImages: [
            '/images/snapint/main-snapint-ai.svg',
            '/images/snapint/Screenshot 2025-12-24 115950.png',
            '/images/snapint/Screenshot 2025-12-24 120026.png',
            '/images/snapint/Screenshot 2025-12-24 120108.png',
            '/images/snapint/Screenshot 2025-12-24 120152.png',
            '/images/snapint/Screenshot 2025-12-24 120312.png',
            '/images/snapint/Screenshot 2025-12-24 120406.png',
            '/images/snapint/Screenshot 2025-12-24 120448.png',
            '/images/snapint/Screenshot 2025-12-24 120500.png',
        ],
        category: 'Company Profile',
    },
] as const;

function normalizeAsset(filePath: string) {
    const fileName = filePath.split('/').pop() ?? filePath;
    return {
        title: fileName.replace(/\.(webp|pdf)$/i, ''),
        encodedPath: encodeURI(filePath),
    };
}

const certificates: Certificate[] = certificateSources.map((item) => {
    const normalized = normalizeAsset(item);
    return {
        title: normalized.title,
        imagePath: item,
        encodedPath: normalized.encodedPath,
    };
});

const certFirstRow = certificates.slice(0, Math.ceil(certificates.length / 2));
const certSecondRow = certificates.slice(Math.ceil(certificates.length / 2));

const projects: ProjectItem[] = projectSeeds.map((item) => ({
    ...item,
    encodedPath: encodeURI(item.imagePath),
}));

type CertMarqueeRowProps = {
    items: readonly Certificate[];
    onOpen: (item: Certificate) => void;
    reverse?: boolean;
    duration?: number;
};

function CertMarqueeRow({ items, onOpen, reverse = false, duration = 40 }: CertMarqueeRowProps) {
    const loopedItems = [...items, ...items];
    const rowStyle = { '--marquee-duration': `${duration}s` } as CSSProperties;

    return (
        <div className="marquee-row">
            <div className={`marquee-track${reverse ? ' marquee-track--reverse' : ''}`} style={rowStyle}>
                {loopedItems.map((item, index) => (
                    <article
                        key={`${item.imagePath}-${index}`}
                        className="marquee-card group rounded-2xl border border-borderc/55 bg-surface/35 p-3 shadow-[0_10px_30px_hsl(var(--accent)/0.12)] backdrop-blur-sm transition hover:border-accent/60 hover:shadow-[0_16px_36px_hsl(var(--accent)/0.2)]"
                    >
                        <div className="cert-thumb overflow-hidden rounded-xl border border-borderc/50 bg-[hsl(var(--bg)/0.9)]">
                            <img
                                src={item.encodedPath}
                                alt={item.title}
                                className="h-full w-full object-cover object-center transition duration-300 group-hover:scale-[1.03]"
                                loading="lazy"
                            />
                        </div>

                        <h3 className="marquee-title mt-3 line-clamp-2 min-h-[2.8em] text-sm font-semibold leading-snug text-text md:text-base">
                            {item.title}
                        </h3>

                        <button
                            type="button"
                            onClick={() => onOpen(item)}
                            className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-text/78 transition hover:text-text"
                        >
                            Lihat Detail <ArrowUpRight size={16} />
                        </button>
                    </article>
                ))}
            </div>
        </div>
    );
}

function ProjectVisualCard({
    item,
    order,
    className,
    onOpen,
}: {
    item: ProjectItem;
    order: number;
    className?: string;
    onOpen: (item: ProjectItem) => void;
}) {
    const orderLabel = order.toString().padStart(2, '0');
    const isSvgPreview = item.imagePath.toLowerCase().endsWith('.svg');

    return (
        <article
            className={`group relative overflow-hidden rounded-2xl border border-borderc/55 bg-[hsl(var(--surface)/0.5)] dark:border-borderc/45 dark:bg-black/20 ${className ?? ''}`}
        >
            <img
                src={item.encodedPath}
                alt={item.title}
                className={`h-full w-full transition duration-500 group-hover:scale-[1.06] ${isSvgPreview ? 'object-contain bg-[hsl(var(--bg)/0.95)] p-4 md:p-6' : 'object-cover object-center'}`}
                loading="lazy"
            />

            <div className="pointer-events-none absolute inset-0 bg-black/40 opacity-100 backdrop-blur-[1px] transition duration-300 md:bg-black/0 md:opacity-0 md:backdrop-blur-none md:group-hover:bg-black/45 md:group-hover:opacity-100 md:group-hover:backdrop-blur-[2px] md:group-focus-within:bg-black/45 md:group-focus-within:opacity-100 md:group-focus-within:backdrop-blur-[2px]" />

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/88 via-black/52 to-black/8 opacity-100 transition duration-300 md:opacity-0 md:group-hover:opacity-100 md:group-focus-within:opacity-100 dark:from-black/92 dark:via-black/58" />

            <div className="absolute inset-x-0 bottom-0 p-4 transition duration-300 md:pointer-events-none md:translate-y-6 md:opacity-0 md:group-hover:pointer-events-auto md:group-hover:translate-y-0 md:group-hover:opacity-100 md:group-focus-within:pointer-events-auto md:group-focus-within:translate-y-0 md:group-focus-within:opacity-100 md:p-5">
                <div className="flex items-center gap-2">
                    <span className="inline-flex rounded-md border border-white/25 bg-white/14 px-2 py-1 text-[11px] font-semibold text-white/95 backdrop-blur-sm">
                        {orderLabel}
                    </span>
                    <h3 className="line-clamp-2 text-base font-bold leading-snug text-white md:text-2xl">{item.title}</h3>
                </div>

                <p className="mt-2 line-clamp-2 text-xs text-white/80 md:text-sm">{item.description}</p>

                <div className="mt-3 flex items-center gap-2">
                    <button
                        type="button"
                        onClick={() => onOpen(item)}
                        className="inline-flex items-center gap-2 rounded-full border border-white/35 bg-black/36 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm transition hover:bg-white/10"
                    >
                        <ExternalLink size={13} /> Lihat Detail
                    </button>
                    <span className="rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-[11px] font-medium text-white/90">
                        {item.category}
                    </span>
                </div>
            </div>
        </article>
    );
}

export default function Projects() {
    const { ref, inView } = useSectionInView(0.18);
    const [activeCertificate, setActiveCertificate] = useState<Certificate | null>(null);
    const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);
    const [activeCategory, setActiveCategory] = useState<ProjectCategory>('All');
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        if (!isClient) {
            return;
        }
        document.body.style.overflow = (activeCertificate || activeProject) ? 'hidden' : '';
        return () => {
            document.body.style.overflow = '';
        };
    }, [activeCertificate, activeProject, isClient]);

    const filteredProjects = useMemo(() => {
        if (activeCategory === 'All') {
            return projects;
        }
        return projects.filter((item) => item.category === activeCategory);
    }, [activeCategory]);

    const featuredProject = filteredProjects[0];
    const rowTwo = filteredProjects.slice(1, 3);

    const certModal = activeCertificate ? (
        <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-[9999] grid place-items-center bg-black/78 p-4 backdrop-blur-sm"
            onClick={() => setActiveCertificate(null)}
        >
            <div
                className="w-full max-w-5xl rounded-3xl border border-borderc/55 bg-[hsl(var(--bg)/0.97)] p-4 shadow-[0_24px_68px_hsl(var(--accent)/0.28)] md:p-6"
                onClick={(event) => event.stopPropagation()}
            >
                <div className="mb-4 flex items-start justify-between gap-4">
                    <div>
                        <p className="text-xs uppercase tracking-[0.18em] text-accent/95">Detail Sertifikat</p>
                        <h3 className="mt-2 text-xl font-bold leading-snug text-text md:text-2xl">{activeCertificate.title}</h3>
                    </div>

                    <button
                        type="button"
                        onClick={() => setActiveCertificate(null)}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-borderc/65 bg-surface/40 text-text/80 transition hover:border-accent/80 hover:text-text"
                        aria-label="Tutup popup"
                    >
                        <X size={18} />
                    </button>
                </div>

                <div className="overflow-hidden rounded-2xl border border-borderc/65 bg-[hsl(var(--bg)/0.96)] p-3 md:p-5">
                    <div className="flex h-[74vh] items-center justify-center overflow-auto rounded-xl bg-[hsl(var(--bg)/0.84)] p-2 md:p-4">
                        <img
                            src={activeCertificate.encodedPath}
                            alt={activeCertificate.title}
                            className="max-h-full w-auto max-w-full rounded-xl border border-borderc/55 object-contain shadow-[0_18px_42px_hsl(var(--accent)/0.18)]"
                        />
                    </div>
                </div>
            </div>
        </div>
    ) : null;

    const projectModal = activeProject ? (
        <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-[9999] grid place-items-center bg-black/85 p-4 backdrop-blur-md"
            onClick={() => setActiveProject(null)}
        >
            <div
                className="w-full max-w-6xl rounded-3xl border border-borderc/55 bg-[hsl(var(--bg)/0.98)] p-4 shadow-[0_32px_80px_rgba(0,0,0,0.5)] md:p-8 dark:bg-zinc-950/90"
                onClick={(event) => event.stopPropagation()}
            >
                <div className="mb-6 flex items-start justify-between gap-6">
                    <div>
                        <div className="flex items-center gap-3">
                            <span className="rounded-full bg-accent/15 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-accent">
                                {activeProject.category}
                            </span>
                        </div>
                        <h3 className="mt-3 text-2xl font-black tracking-tight text-text md:text-4xl">
                            {activeProject.title}
                        </h3>
                        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-text/70 md:text-base">
                            {activeProject.description}
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={() => setActiveProject(null)}
                        className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-borderc/65 bg-surface/40 text-text/80 transition hover:scale-110 hover:border-accent/80 hover:text-accent"
                        aria-label="Tutup popup"
                    >
                        <X size={22} />
                    </button>
                </div>

                <div className="no-scrollbar max-h-[65vh] overflow-y-auto rounded-2xl border border-borderc/65 bg-surface/20 p-4 md:p-6">
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {activeProject.allImages.map((img, idx) => (
                            <div
                                key={idx}
                                className="group relative aspect-video overflow-hidden rounded-xl border border-borderc/40 bg-black/20 transition-all hover:border-accent/50 hover:shadow-lg"
                            >
                                <img
                                    src={encodeURI(img)}
                                    alt={`${activeProject.title} screenshot ${idx + 1}`}
                                    className={`h-full w-full transition duration-500 group-hover:scale-105 ${img.toLowerCase().endsWith('.svg') ? 'object-contain bg-[hsl(var(--bg)/0.95)] p-3' : 'object-cover object-top'}`}
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-6 flex justify-end">
                    <button
                        onClick={() => setActiveProject(null)}
                        className="rounded-xl bg-text px-6 py-3 text-sm font-bold text-bg transition hover:opacity-90"
                    >
                        Tutup Galeri
                    </button>
                </div>
            </div>
        </div>
    ) : null;

    return (
        <>
            <section id="certif" ref={ref} className="projects-section-bg relative py-20">
                <div className="relative z-[1] mx-auto w-[min(1240px,94vw)] rounded-3xl border border-borderc/55 bg-[hsl(var(--bg)/0.34)] p-4 backdrop-blur-sm dark:bg-[hsl(var(--surface)/0.14)] md:p-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.55 }}
                        className="mb-8"
                    >
                        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent/85 md:text-sm">Selected Certificates</p>
                        <h2 className="mt-2 text-3xl font-black md:text-5xl">Certification Showcase</h2>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.55, delay: 0.1 }}
                        className="space-y-4"
                    >
                        <CertMarqueeRow items={certFirstRow} onOpen={setActiveCertificate} duration={38} />
                        <CertMarqueeRow items={certSecondRow} onOpen={setActiveCertificate} reverse duration={42} />
                    </motion.div>
                </div>
            </section>

            <section id="project" className="relative py-24">
                <div className="mx-auto w-[min(1240px,94vw)] rounded-3xl border border-borderc/55 bg-[hsl(var(--surface)/0.24)] p-4 shadow-[0_16px_44px_hsl(var(--accent)/0.1)] backdrop-blur-sm dark:bg-[hsl(var(--surface)/0.12)] md:p-6">
                    <div className="mb-8 grid gap-5 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent/85 md:text-sm">Featured Projects</p>
                            <h2 className="mt-2 text-3xl font-black md:text-5xl">Featured Projects</h2>
                        </div>

                        <div className="no-scrollbar -mx-1 overflow-x-auto px-1 pb-1">
                            <div className="inline-flex w-max flex-nowrap items-center gap-2 rounded-2xl border border-borderc/55 bg-surface/35 p-1.5">
                                {categories.map((item) => {
                                    const isActive = item === activeCategory;
                                    return (
                                        <button
                                            key={item}
                                            type="button"
                                            onClick={() => setActiveCategory(item)}
                                            className={`shrink-0 whitespace-nowrap rounded-xl px-3 py-2 text-xs font-semibold transition md:px-4 md:text-sm ${isActive
                                                ? 'bg-accent text-white shadow-[0_8px_18px_hsl(var(--accent)/0.35)]'
                                                : 'text-text/72 hover:bg-surface/45 hover:text-text'
                                                }`}
                                        >
                                            {item}
                                        </button>
                                    );
                                })}
                                <span className="hidden shrink-0 md:inline-flex rounded-lg border border-borderc/50 p-2 text-text/65">
                                    <Grid3X3 size={14} />
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4 md:space-y-5">
                        {featuredProject && (
                            <ProjectVisualCard
                                item={featuredProject}
                                order={1}
                                className="h-[300px] md:h-[520px]"
                                onOpen={setActiveProject}
                            />
                        )}

                        <div className="grid gap-4 md:grid-cols-2 md:gap-5">
                            {rowTwo.map((item, index) => (
                                <ProjectVisualCard key={item.title} item={item} order={index + 2} className="h-[220px] md:h-[300px]" onOpen={setActiveProject} />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {isClient && certModal ? createPortal(certModal, document.body) : null}
            {isClient && projectModal ? createPortal(projectModal, document.body) : null}
        </>
    );
}

