import type { Metadata } from 'next';
import { Sora, Space_Grotesk } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import './globals.css';

const sora = Sora({
    subsets: ['latin'],
    variable: '--font-sora',
});

const spaceGrotesk = Space_Grotesk({
    subsets: ['latin'],
    variable: '--font-space-grotesk',
});

export const metadata: Metadata = {
    title: 'Sazidan Portofolio',
    description: 'Modern single page portfolio with fluid theming and floating interactions.',
    icons: {
        icon: '/favicon.svg',
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${sora.variable} ${spaceGrotesk.variable} font-[var(--font-space-grotesk)]`}>
                <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}
