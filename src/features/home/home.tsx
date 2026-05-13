import dynamic from 'next/dynamic';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import AuroraBackground from './components/AuroraBackground';
import Hero from './components/Hero';
import Reveal from './components/Reveal';

const GitHubRealtimeCard = dynamic(() => import('./components/GitHubRealtimeCard'), {
    loading: () => (
        <div className="h-[160px] animate-pulse rounded-2xl border border-borderc/55 bg-surface/20" aria-hidden />
    ),
});

const Projects = dynamic(() => import('./components/Projects'), {
    loading: () => (
        <section id="project" className="relative py-24">
            <div className="mx-auto w-[min(1240px,94vw)] rounded-3xl border border-borderc/55 bg-[hsl(var(--surface)/0.24)] p-6">
                <div className="h-56 animate-pulse rounded-2xl bg-surface/30" aria-hidden />
            </div>
        </section>
    ),
});

export default function Home() {
    return (
        <main className="relative isolate min-h-screen overflow-x-clip">
            <AuroraBackground />
            <Navbar />

            <div className="relative z-10">
                <Hero />

                <Reveal id="about" className="relative py-24">
                    <div className="group relative mx-auto w-[min(1180px,92vw)] overflow-hidden rounded-[34px] border border-borderc/60 bg-[linear-gradient(145deg,hsl(var(--bg)/0.99),hsl(var(--surface)/0.92),hsl(var(--borderc)/0.66))] p-8 shadow-[0_24px_62px_hsl(var(--accent)/0.14)] backdrop-blur-xl dark:border-borderc/55 dark:bg-[linear-gradient(145deg,hsl(254_85%_8%/0.94),hsl(248_82%_8%/0.88),hsl(242_78%_5%/0.92))] md:p-12">
                        <div className="pointer-events-none absolute -left-20 -top-24 h-64 w-64 rounded-full bg-accent/12 blur-3xl dark:bg-accent/18" />
                        <div className="pointer-events-none absolute -right-24 -bottom-24 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl dark:bg-cyan-300/10" />

                        <div className="relative grid items-center gap-10 md:grid-cols-[1.55fr_0.85fr]">
                            <div className="min-w-0">
                                <p className="inline-flex rounded-full border border-borderc/70 bg-surface/45 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-accent/90 dark:text-white">
                                    Who Am I?
                                </p>

                                <h2 className="mt-5 text-[clamp(1.6rem,4.05vw,3.25rem)] font-black leading-[1.05] md:whitespace-nowrap">
                                    Muhamad Sazidan Al-Zahran
                                </h2>
                                <p className="mt-2 text-[clamp(0.98rem,2vw,1.25rem)] font-semibold text-text/72">
                                    Fullstack &amp; Mobile Developer
                                </p>

                                <p className="mt-5 max-w-3xl text-balance text-base leading-relaxed text-text/82 md:text-[1.12rem] md:leading-relaxed">
                                    As a Workflow Integration and Automation Specialist and Full-Stack &amp; Mobile Developer
                                    with over one year of hands-on experience, I design and deliver scalable web, mobile,
                                    and automation products from concept to deployment. I architect reliable solutions with
                                    Laravel, React, and Flutter, while optimizing business operations through n8n and
                                    API-driven integrations.
                                </p>

                                <p className="mt-5 max-w-3xl text-balance text-base leading-relaxed text-text/78 md:text-[1.12rem] md:leading-relaxed">
                                    With a strong focus on UI/UX design in Figma, disciplined debugging, and continuous
                                    system optimization, I build clean, efficient, and user-centered digital experiences
                                    aligned with evolving technical standards and business goals.
                                </p>

                                <div className="mt-8 grid w-fit grid-cols-2 gap-8 border-t border-borderc/55 pt-6 md:gap-12">
                                    <div className="text-center">
                                        <p className="text-[clamp(2rem,4vw,3rem)] font-black leading-none text-text">1+</p>
                                        <p className="mt-2 text-sm font-semibold text-text/75 md:text-base">Years Experience</p>
                                    </div>

                                    <div className="text-center">
                                        <p className="text-[clamp(2rem,4vw,3rem)] font-black leading-none text-text">13+</p>
                                        <p className="mt-2 text-sm font-semibold text-text/75 md:text-base">Projects</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mx-auto w-full max-w-[340px] self-center">
                                <div className="relative mx-auto max-w-[270px] rounded-[30px] border border-borderc/60 bg-surface/45 p-3 shadow-[0_20px_40px_hsl(var(--accent)/0.2)] backdrop-blur-sm transition-transform duration-500 group-hover:translate-y-[-2px]">
                                    <div className="overflow-hidden rounded-[24px] border border-borderc/45 bg-[hsl(var(--bg)/0.92)]">
                                        <Image
                                            src="/images/Img-About.jpg"
                                            alt="Muhamad Sazidan Al-Zahran"
                                            width={820}
                                            height={980}
                                            className="h-[305px] w-full object-cover object-center transition duration-500 group-hover:scale-[1.025] md:h-[340px]"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="relative mt-10 border-t border-borderc/55 pt-7">
                            <GitHubRealtimeCard />
                        </div>
                    </div>
                </Reveal>

                <Projects />

                <Reveal id="contact" className="relative pb-24">
                    <div className="mx-auto w-[min(1120px,92vw)] rounded-3xl border border-accent/35 bg-surface/30 p-8 text-center backdrop-blur-xl">
                        <h2 className="text-3xl font-bold">Let&apos;s Build Something Bold</h2>
                        <p className="mx-auto mt-3 max-w-xl text-text/80">
                            Siap kolaborasi untuk project web modern dengan visual karakter kuat dan performa yang terukur.
                        </p>
                        <a
                            href="mailto:hello@antigravity.dev"
                            className="mt-6 inline-flex rounded-full border border-accent/70 bg-accent px-5 py-3 text-sm font-semibold text-white shadow-neon"
                        >
                            hello@antigravity.dev
                        </a>
                    </div>
                </Reveal>
            </div>
        </main>
    );
}
