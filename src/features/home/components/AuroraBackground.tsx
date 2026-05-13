'use client';

import { motion } from 'framer-motion';

type Blob = {
    top: string;
    left: string;
    size: number;
    delay: number;
    duration: number;
    opacity: number;
};

const AURORA_BLOBS: Blob[] = [
    { top: '12%', left: '18%', size: 260, delay: 0.3, duration: 10.5, opacity: 0.24 },
    { top: '26%', left: '62%', size: 220, delay: 1.1, duration: 12.2, opacity: 0.2 },
    { top: '44%', left: '8%', size: 300, delay: 0.8, duration: 13.4, opacity: 0.3 },
    { top: '54%', left: '70%', size: 190, delay: 1.6, duration: 9.8, opacity: 0.22 },
    { top: '68%', left: '34%', size: 280, delay: 0.1, duration: 11.6, opacity: 0.28 },
    { top: '78%', left: '80%', size: 170, delay: 2.1, duration: 8.9, opacity: 0.18 },
    { top: '18%', left: '84%', size: 240, delay: 1.9, duration: 12.8, opacity: 0.26 },
];

export default function AuroraBackground() {
    return (
        <div className="aurora-root" aria-hidden>
            <div className="aurora-container" />

            <div className="absolute inset-0">
                {AURORA_BLOBS.map((blob, idx) => (
                    <motion.div
                        key={idx}
                        className="absolute hidden rounded-full bg-accent blur-3xl dark:block"
                        style={{
                            top: blob.top,
                            left: blob.left,
                            width: blob.size,
                            height: blob.size,
                            opacity: blob.opacity,
                        }}
                        animate={{
                            y: [0, -22, 0],
                            x: [0, 10, -6, 0],
                            scale: [1, 1.08, 1],
                        }}
                        transition={{
                            duration: blob.duration,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: 'easeInOut',
                            delay: blob.delay,
                        }}
                    />
                ))}
            </div>

            <div className="absolute inset-0 bg-grid-soft bg-[size:72px_72px] opacity-15 dark:opacity-40" />
        </div>
    );
}
