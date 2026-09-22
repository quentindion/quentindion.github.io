import { useEffect, useMemo } from 'react';
import { cn } from "cn"
import wavingHand from '../src/assets/Waving Hand.webp'
import { animate, AnimatePresence, motion, useMotionValue } from 'framer-motion';
import GithubIcon from "./assets/github-181717.svg?react";
import LinkedinIcon from "./assets/linkedin-0A66C2.svg?react";
import YoutubeIcon from "./assets/youtube-FF0000.svg?react";
import DockerIcon from "./assets/docker-2496ED.svg?react";
import LaravelIcon from "./assets/laravel-FF2D20.svg?react";
import BunIcon from "./assets/bun-f472b6.svg?react";
import ViteIcon from "./assets/vite-9135FF.svg?react";
import TSIcon from "./assets/typescript-3178C6.svg?react";
import ReactIcon from "./assets/react-61DAFB.svg?react";
import HonoIcon from "./assets/hono-E36002.svg?react";
import TailwindCssIcon from "./assets/tailwindcss-06B6D4.svg?react";
import N8nIcon from "./assets/n8n-EA4B71.svg?react";
import InfiniteLoops from './components/InfiniteLoops';
import { useAnimateInView, useCopyToClipboard, useTheme } from './hooks';
import { AtSignIcon, LucideIcon } from 'lucide-react';
import { RulerCrossPen } from '@solar-icons/react-perf/category/tools/BoldDuotone';
import { StarsMinimalistic } from '@solar-icons/react-perf/category/astronomy/BoldDuotone';
import { Widget5 } from '@solar-icons/react-perf/category/settings/BoldDuotone';
import { CheckCircle, Database } from '@solar-icons/react-perf/category/ui/BoldDuotone';
import { WindowFrame } from '@solar-icons/react-perf/category/it/BoldDuotone';
import { History2 } from '@solar-icons/react-perf/category/time/BoldDuotone';
import { Letter, Pen2 } from '@solar-icons/react-perf/category/messages/BoldDuotone';
import { SquareAcademicCap2 } from '@solar-icons/react-perf/category/school/BoldDuotone';
import Card from './components/Card';
import Timeline from './components/Timeline';
import { MorphIcon } from "morphicons/react";
import { Moon, Sun } from "lucide"

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
        {Icon: N8nIcon,         className: "fill-[#EA4B71]", name: "N8N"},
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

    const [copyState, copyToClipboard] = useCopyToClipboard();
    
    function copyContact () {
        copyToClipboard("contact@quentindion.me");
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
                <div className="flex flex-row items-start justify-between gap-4 mx-2 md:mx-8">
                    <nav className="flex flex-wrap gap-4 justify-start">
                        <div className="motion-fade-up">
                            <a className="button button--ripple" href="https://github.com/quentindion" role="button" aria-label="Github">
                                <GithubIcon className="-ml-2 mr-1 size-5 fill-current github-icon" /> Github
                            </a>
                        </div>
                        <div className="motion-fade-up">
                            <a className="button button--ripple group" href="https://www.youtube.com/@vs2kf" role="button" aria-label="Youtube">
                                <YoutubeIcon className="-ml-2 mr-1 size-5 fill-current youtube-icon transition-[fill] group-hover:fill-[#ff0000]" /> Youtube
                            </a>
                        </div>
                        <div className="motion-fade-up">
                            <a className="button button--ripple group" href="https://www.linkedin.com/in/quentindion" role="button" aria-label="LinkedIn">
                                <LinkedinIcon className="-ml-2 mr-1 size-5 fill-current youtube-icon transition-[fill] group-hover:fill-[#0A66C2]" /> LinkedIn
                            </a>
                        </div>
                        <div className="motion-fade-up">
                            <a className="button button--ripple" onClick={copyContact} role="button" aria-label="Mail">
                                <AtSignIcon className="-ml-2 mr-1 size-5 transition-colors" /> Contact
                            </a>
                        </div>
                    </nav>
                    <div className="motion-fade-up">
                        <button className="size-10 p-0 justify-center" aria-label="Change theme" onClick={toggleTheme}>
                            <MorphIcon icon={isDarkMode ? Sun : Moon} />
                        </button>
                    </div>
                </div>

                <section className="relative mt-20 md:mt-32 px-0 flex flex-col items-start *:backdrop-blur-lg">
                    <span className="font-medium text-lg px-4 py-2 text-muted motion-fade-up">
                        Hello <img src={wavingHand} loading="lazy" alt="Waving hand" className="inline size-8 align-text-bottom" />, je suis Quentin Dion
                    </span>
                    <h1 className="inline-block px-4 py-2 z-1 motion-fade-up">
                        Lead Web <span className="relative drop-shadow-lg drop-shadow-foreground/50">Developer</span>
                    </h1>
                    <p className="font-medium text-lg px-4 py-2 max-w-(--breakpoint-md) text-muted motion-fade-up">
                        Depuis {seniority} ans, passionné d’informatique et des nouvelles technologies qui font le web d'aujourd'hui.
                    </p>
                </section>

                <section className="relative pb-4 mt-20 md:mt-32 backdrop-blur-lg">
                    <div className="absolute left-[-100vw] w-[200vw] h-px bg-border" />
                    <h2 className="p-4 motion-fade-up"><RulerCrossPen className="size-8" /> Mes outlis</h2>
                    <InfiniteLoops className="mask-x-from-90% mask-x-to-100% motion-fade" duration={20} direction="left">
                        {tech.map(({Icon, className, name}) => <div key={name} className="flex gap-2 items-center w-max text-2xl font-bold">
                            <Icon className={cn("h-12 w-auto", className)} /> {name}
                        </div>)}
                    </InfiniteLoops>
                    <div className="absolute left-[-100vw] w-[200vw] bottom-0 h-px bg-border" />
                </section>

                <section className="relative mt-20 md:mt-32 backdrop-blur-lg">
                    <div className="absolute left-[-100vw] w-[200vw] h-px bg-border" />
                    <h2 className="p-4 motion-fade-up"><StarsMinimalistic className="size-8" /> Compétences</h2>
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
                                    <div className="label">MSSQL</div>
                                    <div className="label">Postgres</div>
                                    <div className="label">MongoDB</div>
                                    <div className="label">Supabase</div>
                                    <div className="label">N8N</div>
                                    <div className="label">Qlik Sense</div>
                                    <div className="label">Power BI</div>
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
                                    <div className="label">Bun</div>
                                    <div className="label">Electron</div>
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
                                <h3><Pen2 /> CMS</h3>
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
                    <div className="absolute left-[-100vw] w-[200vw] h-px bg-border" />
                </section>

                <section className="relative mt-20 md:mt-32">
                    <div className="absolute left-[-100vw] w-[200vw] h-px bg-border" />
                    <h2 className="p-4 motion-fade-up"><History2 className="size-8" /> Expériences</h2>
                    <Timeline items={experiences} className="mx-4" />
                    <div className="absolute left-[-100vw] w-[200vw] h-px bg-border" />
                </section>

                <section className="relative mt-20 md:mt-32">
                    <div className="absolute left-[-100vw] w-[200vw] h-px bg-border" />
                    <h2 className="p-4 motion-fade-up"><SquareAcademicCap2 className="size-8" /> Formations</h2>
                    <Timeline items={training} className="mx-4" />
                    <div className="absolute left-[-100vw] w-[200vw] h-px bg-border" />
                </section>

                <section id="contact" className="relative mt-20 md:mt-32">
                    <div className="absolute left-[-100vw] w-[200vw] h-px bg-border" />
                    <h2 className="p-4 mb-0 motion-fade-up"><Letter className="size-8" /> Contact</h2>
                    <p className="pb-4 px-4">
                        <button className="motion-fade cursor-pointer select-none button--ripple" onClick={copyContact}>contact@quentindion.me</button>
                    </p>
                    <div className="absolute left-[-100vw] w-[200vw] h-px bg-border" />
                </section>

                <section className="h-36"></section>
            </div>
            <div className="min-w-4 md:min-w-8 bg-dashed border-x border-border" />
        </article>
        <div className="fixed top-4 left-0 w-full flex items-center justify-center z-1">
            <div className={`relative flex items-center text-sm font-semibold rounded-3xl transition-all origin-center
                overflow-hidden *:overflow-hidden
                bg-black dark:bg-white text-background 
                not-empty:shadow-2xl not-empty:shadow-black
                ${copyState.copied && "not-dark:bg-ambilight to-lime-500/30 dark:not-empty:shadow-lime-950"}
            `}>
                <AnimatePresence>
                    {copyState.copied && <>
                        <motion.div
                            initial={{width: 0, height: 0, margin: 0}}
                            animate={{width: 32, height: 32, margin: 4}}
                            exit={{width: 0, height: 0, margin: 0, transition: {delay: 0}}}>
                            <CheckCircle className="relative size-8 *:first:opacity-100 *:first:fill-lime-300 in-dark:*:first:fill-lime-500 *:last:fill-black" />
                        </motion.div>
                        <motion.div className="relative whitespace-nowrap"
                            initial={{width: 0, marginLeft: 0, marginRight: 0}}
                            animate={{width: "auto", marginLeft: 4, marginRight: 16, transition: {delay: 0}}}
                            exit={{width: 0, marginLeft: 0, marginRight: 0, height: ["auto", 0]}}>
                            Copié dans le presse papier.
                        </motion.div>
                    </>}
                </AnimatePresence>
            </div>
        </div>
    </>
}