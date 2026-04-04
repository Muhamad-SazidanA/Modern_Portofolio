'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight, ChevronsDown, Orbit, Rocket } from 'lucide-react';
import { useEffect, useState } from 'react';

const basePhrases = [
    'build seamless mobile experiences',
    'build smarter automated workflows',
    'build with clean code',
    'build solutions for tomorrow',
    'build technology that scales',
];

const toTitleCase = (value: string) =>
    value.replace(/\b\w/g, (char) => char.toUpperCase());

const rotatingPhrases = basePhrases.map((phrase) => {
    const withoutBuild = phrase.replace(/^build\s+/i, '');
    return toTitleCase(withoutBuild);
});

export default function Hero() {
    const [phraseIndex, setPhraseIndex] = useState(0);
    const [typedText, setTypedText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [showIldPhase, setShowIldPhase] = useState(false);

    useEffect(() => {
        const currentPhrase = rotatingPhrases[phraseIndex];
        const finishedTyping = !isDeleting && typedText === currentPhrase;
        const finishedDeleting = isDeleting && typedText.length === 0;

        if (finishedTyping) {
            const pauseTimer = window.setTimeout(() => setIsDeleting(true), 1600);
            return () => window.clearTimeout(pauseTimer);
        }

        if (finishedDeleting) {
            let ildTimer: ReturnType<typeof setTimeout> | null = null;
            const nextTimer = setTimeout(() => {
                setShowIldPhase(true);
                ildTimer = setTimeout(() => {
                    setShowIldPhase(false);
                    setPhraseIndex((prev) => (prev + 1) % rotatingPhrases.length);
                    setIsDeleting(false);
                }, 260);
            }, 140);
            return () => {
                clearTimeout(nextTimer);
                if (ildTimer) {
                    clearTimeout(ildTimer);
                }
            };
        }

        const speed = (isDeleting ? 30 : 56) + Math.floor(Math.random() * 14);
        const typingTimer = window.setTimeout(() => {
            const nextLength = typedText.length + (isDeleting ? -1 : 1);
            setTypedText(currentPhrase.slice(0, nextLength));
        }, speed);

        return () => window.clearTimeout(typingTimer);
    }, [typedText, isDeleting, phraseIndex]);

    const titleScaleClass = 'text-[clamp(1.35rem,5.6vw,5.8rem)]';
    const buildWord = showIldPhase ? 'Bu' : 'Build';
    const typedWords = typedText.trim().length > 0 ? typedText.trim().split(/\s+/) : [];
    const typedLineOne = `${buildWord}${typedWords[0] ? ` ${typedWords[0]}` : ''}`;
    const typedLineTwo = typedWords.slice(1).join(' ');

    return (
        <section id="home" className="relative flex min-h-screen items-center justify-center overflow-hidden pt-24">
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(85%_90%_at_20%_32%,rgba(97,0,148,0.2),transparent_60%),radial-gradient(70%_90%_at_80%_55%,rgba(0,128,104,0.2),transparent_62%)] dark:bg-[radial-gradient(85%_90%_at_20%_32%,rgba(97,0,148,0.35),transparent_60%),radial-gradient(70%_90%_at_80%_55%,rgba(0,128,104,0.35),transparent_62%),linear-gradient(90deg,rgba(28,9,65,0.5),rgba(1,2,14,0.3))]"
            />

            <div className="relative z-10 mx-auto flex w-[min(1180px,92vw)] flex-col items-center text-center">
                <motion.p
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-7 inline-flex items-center gap-2 rounded-full border border-borderc/60 bg-surface/20 px-4 py-2 text-xs uppercase tracking-[0.15em] text-text/85 backdrop-blur-md md:text-sm"
                >
                    <Orbit size={15} className="text-accent" />
                    Senior Fullstack Developer
                </motion.p>

                <div className="space-y-1 md:space-y-1.5">
                    <motion.div
                        initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        transition={{ duration: 0.7, delay: 0.12 }}
                        className="mx-auto flex flex-col items-center"
                    >
                        <div
                            className={`${titleScaleClass} min-h-[1.15em] bg-gradient-to-r from-text via-text to-accent bg-clip-text font-black leading-[0.95] tracking-tight text-transparent`}
                        >
                            {typedLineOne}
                            {!typedLineTwo && (
                                <span className="ml-1 inline-block h-[0.95em] w-[0.08em] translate-y-[0.08em] animate-pulse rounded-full bg-accent" />
                            )}
                        </div>
                        <div
                            className={`${titleScaleClass} min-h-[1.15em] bg-gradient-to-r from-text via-text to-accent bg-clip-text font-black leading-[0.95] tracking-tight text-transparent`}
                        >
                            {typedLineTwo || '\u00A0'}
                            {typedLineTwo && (
                                <span className="ml-1 inline-block h-[0.95em] w-[0.08em] translate-y-[0.08em] animate-pulse rounded-full bg-accent" />
                            )}
                        </div>
                    </motion.div>
                </div>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.28 }}
                    className="mt-8 max-w-4xl text-balance text-base text-text/78 md:text-xl md:leading-relaxed lg:text-2xl"
                >
                    Available For Freelance Projects
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="mt-10 flex flex-wrap items-center justify-center gap-4"
                >
                    <a
                        href="#project"
                        className="inline-flex items-center gap-2 rounded-full border border-accent/70 bg-accent px-5 py-3 text-sm font-semibold text-white shadow-neon transition hover:translate-y-[-2px]"
                    >
                        Lihat Project
                        <ArrowUpRight size={16} />
                    </a>
                    <a
                        href="#contact"
                        className="inline-flex items-center gap-2 rounded-full border border-borderc/60 bg-surface/35 px-5 py-3 text-sm font-semibold"
                    >
                        Hubungi Saya
                        <Rocket size={16} className="text-accent" />
                    </a>
                </motion.div>

                <motion.a
                    href="#about"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, y: [0, 6, 0] }}
                    transition={{ duration: 1.8, delay: 0.65, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
                    aria-label="Scroll to about"
                    className="mt-14 inline-flex text-text/45 transition hover:text-accent"
                >
                    <ChevronsDown size={34} strokeWidth={1.6} />
                </motion.a>
            </div>
        </section>
    );
}
