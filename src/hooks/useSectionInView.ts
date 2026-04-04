'use client';

import { useInView } from 'framer-motion';
import { useRef } from 'react';

export function useSectionInView(amount = 0.25) {
    const ref = useRef<HTMLElement | null>(null);
    const inView = useInView(ref, { once: true, amount });

    return { ref, inView };
}
