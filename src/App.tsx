import { HTMLProps, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import wavingHand from '../src/assets/Waving Hand.webp'
import { cn } from './utils';
import { animate, motion, MotionValue, useAnimation, useMotionValue, useMotionValueEvent, useScroll, useSpring, useTransform } from 'framer-motion';
import GithubIcon from "./assets/github-181717.svg?react";
import LinkedinIcon from "./assets/linkedin-0A66C2.svg?react";
import YoutubeIcon from "./assets/youtube-FF0000.svg?react";
import { useCopyToClipboard } from 'usehooks-ts';
import { toast, Toaster } from 'sonner';
import DockerIcon from "./assets/docker-2496ED.svg?react";
import LaravelIcon from "./assets/laravel-FF2D20.svg?react";
import BunIcon from "./assets/bun-f472b6.svg?react";
import ViteIcon from "./assets/vite-9135FF.svg?react";
import TSIcon from "./assets/typescript-3178C6.svg?react";
import ReactIcon from "./assets/react-61DAFB.svg?react";
import HonoIcon from "./assets/hono-E36002.svg?react";
import TailwindCssIcon from "./assets/tailwindcss-06B6D4.svg?react";
import InfiniteLooper from './InfiniteLooper';
import { useAnimateInView, useTheme } from './hooks';
import { AtSignIcon, LucideIcon } from 'lucide-react';
import { RulerCrossPen } from '@solar-icons/react-perf/category/tools/BoldDuotone';
import { StarsMinimalistic } from '@solar-icons/react-perf/category/astronomy/BoldDuotone';
import { Widget5 } from '@solar-icons/react-perf/category/settings/BoldDuotone';
import { CheckCircle, Database } from '@solar-icons/react-perf/category/ui/BoldDuotone';
import { WindowFrame } from '@solar-icons/react-perf/category/it/BoldDuotone';
import { ClipboardCheck, Documents } from '@solar-icons/react-perf/category/notes/BoldDuotone';
import { History2 } from '@solar-icons/react-perf/category/time/BoldDuotone';
import { Letter } from '@solar-icons/react-perf/category/messages/BoldDuotone';
import { SquareAcademicCap2 } from '@solar-icons/react-perf/category/school/BoldDuotone';

declare global {
    function isDark(): boolean
    function applyTheme(): void
}

export type Skill = {
    category: string,
    icon: LucideIcon,
    items: string[],
    description: string[],
    titleClassName: string,
    lineClassName: string,
    glowClassName: string
}

export type Experience = {
    title: string,
    company?: string,
    dates: string[],
    description: string
}

export default function App () {

    const seniority: number = useMemo(() => (new Date).getFullYear() - 2013, []);

    const experiences: Experience[] = useMemo(() => [
        {
            title: "Lead développeur web",
            company: "Oxance",
            dates: ["Aujourd'hui", "2016"],
            description: "Développement, maintenance et gestion de plusieurs projets web"
        }, {
            title: "Développeur/Animateur Web",
            company: "Laboratoire ALPA",
            dates: ["2016", "2013"],
            description: "Développement, maintenance et gestion de plusieurs projets web, contact auprès des clients"
        }, {
            title: "Développeur Web",
            company: "Novalto",
            dates: ["2013", "2012"],
            description: "Développement, maintenance et évolution d'un site e-commerce sous Drupal."
        }, {
            title: "Développeur/Animateur Web",
            company: "Laval (Canada)",
            dates: ["2011"],
            description: "Création de site web sous Joomla (développement, design, contenu, traduction), principalement pour des communes. Formation et création de documentation technique."
        }
    ], []);

    const training: Experience[] = useMemo(() => [
        {
            title: "Licence Pro SIL",
            description: "Métiers de l'internet et des applications multimédia",
            dates: ["2013"]
        }, {
            title: "BTS IRIS",
            description: "Informatique et réseau pour l'industrie et les services",
            dates: ["2012"]
        }
    ], []);

    const tech = useMemo(() => [
        {Icon: DockerIcon,      className: "fill-[#2496ED]", name: "Docker"},
        {Icon: LaravelIcon,     className: "fill-[#FF2D20]", name: "Laravel"},
        {Icon: BunIcon,         className: "fill-[#f472b6]", name: "Bun"},
        {Icon: ViteIcon,        className: "fill-[#9135FF]", name: "Vite"},
        {Icon: TSIcon,          className: "fill-[#3178C6]", name: "Typescript"},
        {Icon: ReactIcon,       className: "fill-[#61DAFB]", name: "React"},
        {Icon: HonoIcon,        className: "fill-[#E36002]", name: "Hono"},
        {Icon: TailwindCssIcon, className: "fill-[#06B6D4]", name: "Tailwind CSS"}
    ], []);

    const [theme, toggleTheme] = useTheme();

    const isDarkMode = useMemo(() => {
        if (typeof window === "undefined")
            return false;

        return (theme === "dark") || (!theme && window.matchMedia("(prefers-color-scheme: dark)").matches);
    }, [theme]);

    const animateVariants = useMemo(() => ({
        ".motion-fade": {initial: { opacity: 0 }, animate: { opacity: 1 }},
        ".motion-fade-up": {initial: { opacity: 0, y: 25 }, animate: { opacity: 1, y: 0 }},
        ".motion-fade-down": {initial: { opacity: 0, y: -25 }, animate: { opacity: 1, y: 0 }},
        ".motion-fade-left": {initial: { opacity: 0, x: -25 }, animate: { opacity: 1, x: 0 }},
        ".motion-fade-right": {initial: { opacity: 0, x: 25 }, animate: { opacity: 1, x: 0 }},
        ".motion-fade-scale": {initial: { opacity: 0, scale: 0 }, animate: { opacity: 1, scale: 1 }}
    }), []);

    useAnimateInView(animateVariants);

    const mouseX = useMotionValue(window.innerWidth / 2);
    const mouseY = useMotionValue((window.innerHeight / 2) + window.scrollY);

    useEffect(() => {

        const updateMousePosition = (event: MouseEvent) => {
            animate(mouseX, event.clientX, {duration: 0});
            animate(mouseY, event.clientY, {duration: 0});
        };

        window.addEventListener("mousemove", updateMousePosition);

        return () => {
            window.removeEventListener("mousemove", updateMousePosition);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [, copy] = useCopyToClipboard();

    const copyContact = async () => {

        await copy("contact@quentindion.me");
        
        toast.success("Copié dans le presse-papiers.", {
            dismissible: true,
            icon: <ClipboardCheck className="size-10 *:first:opacity-15" />
        });
    }

    return <>
        <div className="relative">
            <div className="absolute h-screen w-full bg-[radial-gradient(#71717140_1px,transparent_1px)] bg-size-[16px_16px] 
                mask-[radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
        </div>
        <article className="container p-0 grid grid-cols-[1rem_1fr_1rem] md:grid-cols-[2rem_1fr_2rem]">
            <div className="min-w-4 md:min-w-8 bg-dashed border-x border-border" />
            <div>
                <section className="h-12"></section>
                <div className="flex flex-row items-start justify-between mx-2 md:mx-8">
                    <nav className="flex flex-wrap gap-4 justify-start">
                        <div className="motion-fade-up">
                            <a className="button button--ripple" href="https://github.com/quentindion" role="button" aria-label="Github">
                                <GithubIcon className="-ml-1 size-6 fill-current github-icon" /> Github
                            </a>
                        </div>
                        <div className="motion-fade-up">
                            <a className="button button--ripple group" href="https://www.youtube.com/@vs2kf" role="button" aria-label="Youtube">
                                <YoutubeIcon className="-ml-1 size-6 fill-current youtube-icon transition-[fill] group-hover:fill-[#ff0000]" /> Youtube
                            </a>
                        </div>
                        <div className="motion-fade-up">
                            <a className="button button--ripple group" href="https://www.linkedin.com/in/quentindion" role="button" aria-label="LinkedIn">
                                <LinkedinIcon className="-ml-1 size-6 fill-current youtube-icon transition-[fill] group-hover:fill-[#0A66C2]" /> LinkedIn
                            </a>
                        </div>
                        <div className="motion-fade-up">
                            <a className="button button--ripple" onClick={copyContact} role="button" aria-label="Mail">
                                <AtSignIcon className="-ml-1 transition-colors" /> Contact
                            </a>
                        </div>
                    </nav>
                    <div className="motion-fade-up">
                        <button className="size-9 p-0 justify-center" onClick={toggleTheme}>
                            <div className={`theme-toggle ${!isDarkMode && "theme-toggle--toggled"}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="currentColor" viewBox="0 0 32 32"
                                    className="theme-toggle__expand size-6">
                                    <clipPath id="theme-toggle__expand__cutout">
                                        <path d="M0-11h25a1 1 0 0017 13v30H0Z" />
                                    </clipPath>
                                    <g clipPath="url(#theme-toggle__expand__cutout)">
                                        <circle cx="16" cy="16" r="8.4" />
                                        <path d="M18.3 3.2c0 1.3-1 2.3-2.3 2.3s-2.3-1-2.3-2.3S14.7.9 16 .9s2.3 1 2.3 2.3zm-4.6 25.6c0-1.3 1-2.3 2.3-2.3s2.3 1 2.3 2.3-1 2.3-2.3 2.3-2.3-1-2.3-2.3zm15.1-10.5c-1.3 0-2.3-1-2.3-2.3s1-2.3 2.3-2.3 2.3 1 2.3 2.3-1 2.3-2.3 2.3zM3.2 13.7c1.3 0 2.3 1 2.3 2.3s-1 2.3-2.3 2.3S.9 17.3.9 16s1-2.3 2.3-2.3zm5.8-7C9 7.9 7.9 9 6.7 9S4.4 8 4.4 6.7s1-2.3 2.3-2.3S9 5.4 9 6.7zm16.3 21c-1.3 0-2.3-1-2.3-2.3s1-2.3 2.3-2.3 2.3 1 2.3 2.3-1 2.3-2.3 2.3zm2.4-21c0 1.3-1 2.3-2.3 2.3S23 7.9 23 6.7s1-2.3 2.3-2.3 2.4 1 2.4 2.3zM6.7 23C8 23 9 24 9 25.3s-1 2.3-2.3 2.3-2.3-1-2.3-2.3 1-2.3 2.3-2.3z" />
                                    </g>
                                </svg>
                            </div>
                        </button>
                    </div>
                </div>

                <section className="relative mt-20 md:mt-32 px-0 flex flex-col items-start *:backdrop-blur-lg">
                    <span className="font-medium text-lg px-4 py-2 text-muted motion-fade-up">
                        Hello <img src={wavingHand} alt="Waving hand" className="inline size-8 align-text-bottom" />, je suis Quentin Dion
                    </span>
                    <h1 className="inline-block px-4 py-2 z-1 motion-fade-up">
                        <span className="drop-shadow-lg drop-shadow-black/25">Lead Web</span>
                        <span className="relative">
                            <span className="absolute inset-0 left-4 top-3 text-gradient-primary-shadow opacity-33 blur-lg"> Developer</span>
                            <span className="relative text-gradient-primary"> Developer</span>
                        </span>
                    </h1>
                    <p className="font-medium text-lg px-4 py-2 max-w-(--breakpoint-md) text-muted motion-fade-up">
                        Depuis {seniority} ans, passionné d’informatique et des nouvelles technologies qui font le web d'aujourd'hui.
                    </p>
                </section>

                <section className="relative pb-4 mt-20 md:mt-32 backdrop-blur-lg">
                    <div className="absolute -left-[100vw] w-[200vw] h-px bg-border" />
                    <h2 className="p-4 motion-fade-up"><RulerCrossPen /> Mes outlis</h2>
                    <InfiniteLooper className="mask-x-from-90% mask-x-to-100% motion-fade" duration={10} direction="left">
                        {tech.map(({Icon, className, name}) => <div key={name} className="flex gap-2 items-center w-max text-2xl font-bold">
                            <Icon className={cn("h-12 w-auto", className)} /> {name}
                        </div>)}
                    </InfiniteLooper>
                    <div className="absolute -left-[100vw] w-[200vw] bottom-0 h-px bg-border" />
                </section>

                <section className="relative mt-20 md:mt-32 backdrop-blur-lg">
                    <div className="absolute -left-[100vw] w-[200vw] h-px bg-border" />
                    <h2 className="p-4 motion-fade-up"><StarsMinimalistic /> Compétences</h2>
                    <div className="flex flex-wrap items-stretch justify-start gap-4 px-4 pb-4">
                        <div className="flex-[1_1_28rem] motion-fade-scale">
                            <Card className="h-full" mousePosition={{x: mouseX, y: mouseY}}>
                                <h3><Widget5 /> Interface Web & UI</h3>
                                <div className="labels mb-4">
                                    <div className="label">Vite</div>
                                    <div className="label">React</div>
                                    <div className="label">Angular</div>
                                    <div className="label">HTML</div>
                                    <div className="label">Tailwind</div>
                                </div>
                                <p className="relative text-pretty">
                                    Développement de <span className="highlight">PWA </span>
                                    et <span className="highlight">d'interfaces utilisateur </span>
                                    pour de la gestion métier (planifications, gestion de ressources internes).
                                </p>
                            </Card>
                        </div>
                        <div className="flex-[1_1_28rem] motion-fade-scale">
                            <Card className="h-full" mousePosition={{x: mouseX, y: mouseY}}>
                                <h3><Database /> Base de donnée & BI</h3>
                                <div className="labels mb-4">
                                    <div className="label">Qlik Sense</div>
                                    <div className="label">Power BI</div>
                                    <div className="label">MSSQL</div>
                                    <div className="label">Postgres</div>
                                    <div className="label">MongoDB</div>
                                    <div className="label">Supabase</div>
                                </div>
                                <p className="relative text-pretty">
                                    Gestion de <span className="highlight">bases de données </span>
                                    pour des applications temps réel et agrégation de données multi-plateformes en indicateurs de gestion pour des
                                    <span className="highlight"> rapports BI </span>
                                    publiés aux collaborateurs.
                                </p>
                            </Card>
                        </div>
                        <div className="flex-[1_1_28rem] motion-fade-scale">
                            <Card className="h-full" mousePosition={{x: mouseX, y: mouseY}}>
                                <h3><WindowFrame /> Applications & API</h3>
                                <div className="labels mb-4">
                                    <div className="label">PHP</div>
                                    <div className="label">Laravel</div>
                                    <div className="label">NodeJS</div>
                                    <div className="label">ElectronJS</div>
                                </div>
                                <p className="relative text-pretty">
                                    Développement d'<span className="highlight">API </span>
                                    backend pour intranet et applications mobiles, d'
                                    <span className="highlight">applications de bureau </span>
                                    et de tâches automatiques d'intégration de données.
                                </p>
                            </Card>
                        </div>
                        <div className="flex-[1_1_28rem] motion-fade-scale">
                            <Card className="h-full" mousePosition={{x: mouseX, y: mouseY}}>
                                <h3><Documents /> CMS</h3>
                                <div className="labels">
                                    <div className="label mb-4">Wordpress</div>
                                </div>
                                <p className="relative text-pretty">
                                    Maintenance de sites internet et développement de plugins et thèmes sous
                                    <span className="highlight"> Wordpress</span>.
                                </p>
                            </Card>
                        </div>
                    </div>
                    <div className="absolute -left-[100vw] w-[200vw] h-px bg-border" />
                </section>

                <section className="relative mt-20 md:mt-32">
                    <div className="absolute -left-[100vw] w-[200vw] h-px bg-border" />
                    <h2 className="p-4 motion-fade-up"><History2 /> Expériences</h2>
                    <Timeline items={experiences} className="mx-4" />
                    <div className="absolute -left-[100vw] w-[200vw] h-px bg-border" />
                </section>

                <section className="relative mt-20 md:mt-32">
                    <div className="absolute -left-[100vw] w-[200vw] h-px bg-border" />
                    <h2 className="p-4 motion-fade-up"><SquareAcademicCap2 /> Formations</h2>
                    <Timeline items={training} className="mx-4" />
                    <div className="absolute -left-[100vw] w-[200vw] h-px bg-border" />
                </section>

                <section id="contact" className="relative mt-20 md:mt-32">
                    <div className="absolute -left-[100vw] w-[200vw] h-px bg-border" />
                    <h2 className="p-4 mb-0 motion-fade-up"><Letter /> Contact</h2>
                    <p className="pb-4 px-4">
                        <a className="motion-fade cursor-pointer select-none" onClick={copyContact}>contact@quentindion.me</a>
                    </p>
                    <div className="absolute -left-[100vw] w-[200vw] h-px bg-border" />
                </section>

                <section className="h-36"></section>
            </div>

            <div className="min-w-4 md:min-w-8 bg-dashed border-x border-border" />
        </article>
        <Toaster position="bottom-center" swipeDirections={["bottom", "left", "right"]} toastOptions={{
            unstyled: true,
            classNames: {
                toast: "flex flex-shrink-0 gap-4 w-fit overflow-hidden px-4 py-3 rounded-3xl transition-all transform-gpu \
                    shadow shadow-2xl shadow-black/50 bg-background/25 backdrop-blur-lg",
                content: "flex-1 flex flex-col justify-center",
                title: "font-semibold",
                icon: "size-10",
                success: "text-lime-600 bg-ambilight to-lime-400/75 shadow-lime-900/50 \
                    dark:to-lime-950/75 dark:shadow-black"
            }
        }} icons={{
            success: <CheckCircle className="size-10 *:first:opacity-15" />
        }} />
    </>
}    

type CardProps = HTMLProps<HTMLElement> & {
    mousePosition: {
        x: MotionValue<number>,
        y: MotionValue<number>
    }
}

function Card ({children, className, mousePosition}: CardProps) {

    const ref = useRef<HTMLDivElement>(null);

    const { scrollY, scrollX } = useScroll();
    
    const bounds = useCallback(() => ref.current?.getBoundingClientRect(), []);

    const relativeX = useTransform<number, string>([mousePosition.x, scrollX], ([x]) => `${x - (bounds()?.left ?? 0)}px`);
    const relativeY = useTransform<number, string>([mousePosition.y, scrollY], ([y]) => `${y - (bounds()?.top ?? 0)}px`);

    return <motion.div ref={ref} className={cn("card", className)} style={{
        "--spotlight-x": relativeX,
        "--spotlight-y": relativeY,
    }}>
        <div className="card-content transition-all">{children}</div>
    </motion.div>
    
}

function Timeline ({items, className}: HTMLProps<HTMLElement> & {items: Experience[]}) {

    const ref = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start 75%", "end 75%"]
    });

    const lineHeight = useSpring(scrollYProgress);

    return <div ref={ref} className={cn("relative contain-paint", className)}>

        <motion.div className="absolute w-0.5 h-full top-0 left-1.75 sm:left-29.75 bg-linear-to-b from-accent to-primary z-1 origin-top" 
            style={{scaleY: lineHeight}} />

        {items.map(({dates, title, company, description}, i) => <div key={i} className="relative flex flex-col">
            {dates[0] && <h3 className="flex sm:flex-row-reverse w-32 mb-0 text-muted">
                <div className="motion-fade-scale z-1">
                    <TimelineDot />
                </div>
                <div className="flex-1 motion-fade-right">{dates[0]}</div>
            </h3>}
            <div className="flex flex-col items-start pl-6 ml-1.75 sm:ml-29.75 pb-8 border-l-2 border-border">
                <h3 className="mt-4 sm:-mt-4.5 motion-fade-left">{title}</h3>
                {company && <h3 className="motion-fade-left">{company}</h3>}
                <p className="text-muted leading-4 motion-fade-left">{description}</p>
            </div>
            {dates[1] && (dates[1] !== items[i + 1].dates[0]) && 
                <h3 className="flex sm:flex-row-reverse w-32 mb-4 text-muted">
                    <div className="motion-fade-scale z-1">
                        <TimelineDot />
                    </div>
                    <div className="flex-1 motion-fade-right">{dates[1]}</div>
                </h3>}
        </div>)}
    </div>
}

function TimelineDot ({className}: {className?: string}) {

    const ref = useRef<HTMLDivElement>(null);

    const [isMounted, setIsMounted] = useState<boolean>(false);

    useEffect(() => setIsMounted(true), []);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start 75%", "end 75%"]
    });

    const backgroundColor = useTransform(
        scrollYProgress,
        [0, 1],
        ["var(--color-background)", "var(--color-primary)"]
    );

    const borderColor = useTransform(
        scrollYProgress,
        [0, 1],
        ["var(--color-border)", "var(--color-background)"]
    );

    const controls = useAnimation();
    const hasPlayed = useRef<boolean>(false);

    useMotionValueEvent(scrollYProgress, "change", (v) => {
        if (v === 0)
            hasPlayed.current = false;
        else if(!hasPlayed.current) {
            hasPlayed.current = true;
            controls.start({
                scale: [1, 1.5, 1],
                transition: {
                    duration: 0.4,
                    ease: "easeInOut"
                }
            });
        }
    });

    return <motion.div ref={ref} initial={{ scale: 1 }} animate={controls} 
        style={{
            backgroundColor: isMounted ? backgroundColor : "var(--color-background)",
            borderColor: isMounted ? borderColor : "var(--color-border)"
        }}
        className={cn(
            "relative rounded-full size-4 border-2 border-border transition-colors",
            "bg-background ring-2 ring-background",
            className
        )}
    />
}