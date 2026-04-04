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

type ProjectCategory = 'All' | 'Company Profile' | 'Portofolio' | 'Project Generator' | 'Saas Tools';

type ProjectItem = {
    title: string;
    description: string;
    imagePath: string;
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

const categories: ProjectCategory[] = ['All', 'Company Profile', 'Portofolio', 'Project Generator', 'Saas Tools'];

const projectSeeds = [
    {
        title: 'Platform Profil Perusahaan Visionary Hub',
        description:
            'Website company profile dengan narasi brand yang kuat, struktur informasi jelas, dan performa optimal untuk kebutuhan presentasi bisnis.',
        imagePath: '/images/Certif/Belajar Membuat Front-End Web.webp',
        category: 'Company Profile',
    },
    {
        title: 'Portofolio Creative Studio',
        description:
            'Landing portofolio visual-first untuk menampilkan studi kasus kreatif secara sinematik dengan pengalaman scroll yang halus.',
        imagePath: '/images/Certif/Belajar Dasar Manajemen Proyek.webp',
        category: 'Portofolio',
    },
    {
        title: 'Generator Template Dashboard',
        description:
            'Alat pembangkit template proyek untuk mempercepat pembuatan dashboard dengan struktur komponen siap pakai.',
        imagePath: '/images/Certif/Introduction to Financial Literacy-Sertiv.webp',
        category: 'Project Generator',
    },
    {
        title: 'SaaS Analytics Workspace',
        description:
            'Aplikasi SaaS untuk monitoring performa tim dan metrik bisnis dengan panel analitik terfokus pada keputusan cepat.',
        imagePath: '/images/Certif/Dasar Pemrograman Web.webp',
        category: 'Saas Tools',
    },
    {
        title: 'Profil Syariah Properti Digital',
        description:
            'Website pemasaran properti berbasis sistem katalog dinamis dan komunikasi terintegrasi untuk meningkatkan konversi leads.',
        imagePath: '/images/Certif/Dasar Pemrograman JavaScript.webp',
        category: 'Company Profile',
    },
    {
        title: 'Portofolio Produk Digital',
        description:
            'Showcase produk digital dengan pendekatan storytelling visual, aksen tipografi kuat, dan identitas brand yang konsisten.',
        imagePath: '/images/Certif/wadhwani/Work Productivity Tools (Bahasa).webp',
        category: 'Portofolio',
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
}: {
    item: ProjectItem;
    order: number;
    className?: string;
}) {
    const orderLabel = order.toString().padStart(2, '0');

    return (
        <article
            className={`group relative overflow-hidden rounded-2xl border border-borderc/55 bg-[hsl(var(--surface)/0.5)] dark:border-borderc/45 dark:bg-black/20 ${className ?? ''}`}
        >
            <img
                src={item.encodedPath}
                alt={item.title}
                className="h-full w-full object-cover object-center transition duration-500 group-hover:scale-[1.06]"
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
                        className="inline-flex items-center gap-2 rounded-full border border-white/35 bg-black/36 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm"
                    >
                        <ExternalLink size={13} /> Detail
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
    const [activeCategory, setActiveCategory] = useState<ProjectCategory>('All');
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        if (!isClient) {
            return;
        }
        document.body.style.overflow = activeCertificate ? 'hidden' : '';
        return () => {
            document.body.style.overflow = '';
        };
    }, [activeCertificate, isClient]);

    const filteredProjects = useMemo(() => {
        if (activeCategory === 'All') {
            return projects;
        }
        return projects.filter((item) => item.category === activeCategory);
    }, [activeCategory]);

    const featuredProject = filteredProjects[0] ?? projects[0];
    const rowTwo = filteredProjects.slice(1, 3);
    const rowThree = filteredProjects.slice(3, 6);

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
                            />
                        )}

                        <div className="grid gap-4 md:grid-cols-2 md:gap-5">
                            {rowTwo.map((item, index) => (
                                <ProjectVisualCard key={item.title} item={item} order={index + 2} className="h-[220px] md:h-[300px]" />
                            ))}
                            {rowTwo.length === 0 && (
                                <div className="rounded-2xl border border-borderc/55 bg-surface/25 p-6 text-sm text-text/70 md:col-span-2">
                                    Belum ada project pada kategori ini.
                                </div>
                            )}
                        </div>

                        <div className="grid gap-4 md:grid-cols-3 md:gap-5">
                            {rowThree.map((item, index) => (
                                <ProjectVisualCard key={item.title} item={item} order={index + 4} className="h-[210px] md:h-[260px]" />
                            ))}
                            {rowThree.length === 0 && (
                                <div className="rounded-2xl border border-borderc/55 bg-surface/25 p-6 text-sm text-text/70 md:col-span-3">
                                    Tambahkan lebih banyak project untuk menampilkan baris ketiga.
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {isClient && certModal ? createPortal(certModal, document.body) : null}
        </>
    );
}
