import { createElement, ReactNode, useRef } from 'react';
import { LucideIcon, Sun, Moon, SunMoon, AtSign, Check } from 'lucide-react';
import { AnimatePresence, Variants, motion } from "framer-motion";
import { SiGithub, SiLinkedin, SiYoutube } from '@icons-pack/react-simple-icons';
import wavingHand from '../src/assets/Waving Hand.png'
import { cn } from './utils/cn.js';
import { useBoolean, useLocalStorage, useOnClickOutside } from 'usehooks-ts';
import { AuroraBackground } from './components/AuroraBackground.js';
import useAnimateInView from './hooks/useAnimateInView.js';

declare global {
    function applyTheme(): void
}

export type Theme = null | 'light' | 'dark';

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

    const seniority: number = (new Date).getFullYear() - 2013;

    const experiences: Experience[] = [
        {
            title: 'Lead développeur web',
            company: 'Oxance',
            dates: ['Aujourd\'hui'],
            description: 'Développement, maintenance et gestion de plusieurs projets web'
        }, {
            title: 'Développeur/Animateur Web',
            company: 'Laboratoire ALPA',
            dates: ['2016'],
            description: 'Développement, maintenance et gestion de plusieurs projets web, contact auprès des clients'
        }, {
            title: 'Développeur Web',
            company: 'Novalto',
            dates: ['2013', '2012'],
            description: 'Développement, maintenance et évolution d\'un site e-commerce sous Drupal.'
        }, {
            title: 'Développeur/Animateur Web',
            company: 'Laval (Canada)',
            dates: ['2011'],
            description: 'Création de site web sous Joomla (développement, design, contenu, traduction), principalement pour des communes. Formation et création de documentation technique.'
        }
    ];

    const training: Experience[] = [
        {
            title: 'Licence Pro SIL',
            description: 'Métiers de l\'internet et des applications multimédia',
            dates: ['2013']
        }, {
            title: 'BTS IRIS',
            description: 'Informatique et réseau pour l\'industrie et les services',
            dates: ['2012']
        }
    ];

    const mailMe = () => {
        location.href = 'mailto:' + ['contact@quentindion', 'me'].join('.');
    };

    const [theme, setTheme, removeTheme] = useLocalStorage<Theme>('theme', null);

    const updateTheme = (theme?: Theme) => {

        if(theme) setTheme(theme);
        else removeTheme();

        window.applyTheme();

        closeThemeMenu();
    };

    const { value: themeMenuOpened, setTrue: openThemeMenu, setFalse: closeThemeMenu } = useBoolean(false);

    const themeMenuRef = useRef<HTMLElement>(null);

    useOnClickOutside(themeMenuRef, closeThemeMenu);

    const menuAnimations: Variants = {
        initial: {
            scale: 0,
            opacity: 0
        },
        animate: {
            scale: 1,
            opacity: 1,
            transition: {
                delayChildren: 0.10,
                staggerChildren: 0.05
            }
        },
        exit: {opacity: 0}
    };

    const menuItemAnimation: Variants = {
        initial: {y: -30, opacity: 0},
        animate: {y: 0, opacity: 1},
        exit: {opacity: 0}
    };

    useAnimateInView('.motion-fade', {initial: {opacity: 0}, animate: {opacity: 1}});
    useAnimateInView('.motion-fade-up', {initial: {opacity: 0, y: 25}, animate: {opacity: 1, y: 0}});
    useAnimateInView('.motion-fade-down', {initial: {opacity: 0, y: -25}, animate: {opacity: 1, y: 0}});
    useAnimateInView('.motion-fade-left', {initial: {opacity: 0, x: -25}, animate: {opacity: 1, x: 0}});
    useAnimateInView('.motion-fade-right', {initial: {opacity: 0, x: 25}, animate: {opacity: 1, x: 0}});
    useAnimateInView('.motion-fade-scale', {initial: {opacity: 0, scale: 0}, animate: {opacity: 1, scale: 1}});

    return <>
        <AuroraBackground />
        <section className="h-12"></section>

        <section className="container self-center items-start inline-flex w-auto gap-2">
            <nav className="menu motion-fade-down">
                <a className="group button" href="https://github.com/quentindion" role="button" aria-label="Github">
                    <SiGithub className="group-hover:text-[#181717] transition-colors" />
                    <span>Github</span>
                </a>
                <a className="group button" href="https://www.youtube.com/@vs2kf" role="button" aria-label="Youtube">
                    <SiYoutube className="group-hover:text-[#ff0000] transition-colors" />
                    <span>Youtube</span>
                </a>
                <a className="group button" href="https://www.linkedin.com/in/quentindion" role="button" aria-label="LinkedIn">
                    <SiLinkedin className="group-hover:text-[#0A66C2] transition-colors" />
                    <span>LinkedIn</span>
                </a>
                <a className="group button" onClick={mailMe} role="button" aria-label="Mail">
                    <AtSign />
                    <span>Mail</span>
                </a>
            </nav>
            <nav className="menu motion-fade-down" ref={themeMenuRef}>
                <button className="relative button-icon" onClick={() => openThemeMenu()}>
                    {theme === 'dark' ? <Moon /> :
                    theme === 'light' ? <Sun /> :
                    <SunMoon />}
                </button>
                <AnimatePresence>
                {themeMenuOpened && <motion.div className="absolute menu flex-col overflow-hidden top-0 right-0 bg-white dark:bg-black shadow-xl" 
                    initial="initial" animate="animate" exit="exit" variants={menuAnimations}>
                    <motion.div variants={menuItemAnimation}>
                        <button onClick={() => updateTheme()} className="w-full"><SunMoon /> Auto</button>
                    </motion.div>
                    <motion.div variants={menuItemAnimation}>
                        <button onClick={() => updateTheme("light")} className="w-full"><Sun /> Clair</button>
                    </motion.div>
                    <motion.div variants={menuItemAnimation}>
                        <button onClick={() => updateTheme("dark")} className="w-full"><Moon /> Sombre</button>
                    </motion.div>
                </motion.div>}
                </AnimatePresence>
            </nav>
        </section>

        <section className="container mt-20 md:mt-36 flex flex-col">
            <div className="font-medium text-lg md:text-xl text-neutral-600 dark:text-neutral-400 motion-fade-up">
                Hello <img src={wavingHand} className="inline size-8 align-text-bottom" />, je suis Quentin Dion
            </div>
            <h1 className="motion-fade-up drop-shadow-md dark:shadow-black">
                Lead Web
                <span className="text-gradient-primary"> Developer</span>
            </h1>
            <p className="font-medium text-lg md:text-xl max-w-screen-md text-neutral-600 dark:text-neutral-400 motion-fade-up">
                Depuis {seniority} ans, passionné d’informatique et des nouvelles technologies qui font le web d'aujourd'hui.
            </p>
        </section>

        <section className="container mt-20 md:mt-36">
            <h2 className="motion-fade-up">Compétences</h2>
            <div className="flex flex-wrap items-stretch justify-start gap-8">
                <Card className="shadow-primary motion-fade-scale" borderClassName="border-primary">
                    <CardTitle className="text-gradient-primary">Interface Web & UI</CardTitle>
                    <CardLabels>
                        <Label>React</Label>
                        <Label>Angular</Label>
                        <Label>HTML</Label>
                        <Label>Sass</Label>
                        <Label>Tailwind</Label>
                    </CardLabels>
                    <p className="relative text-pretty">
                        Développement de <span className="font-semibold text-gradient-primary">PWA </span>
                        et <span className="font-semibold text-gradient-primary">d'interfaces utilisateur </span>
                        pour de la gestion métier (planifications, gestion de ressources internes).
                    </p>
                </Card>
                <Card className="shadow-accent-1 motion-fade-scale" borderClassName="border-accent-1">
                    <CardTitle className="text-accent-1">Base de donnée & BI</CardTitle>
                    <CardLabels>
                        <Label>Qlik Sense</Label>
                        <Label>Power BI</Label>
                        <Label>MSSQL</Label>
                        <Label>Postgres</Label>
                        <Label>MongoDB</Label>
                        <Label>Supabase</Label>
                    </CardLabels>
                    <p className="relative text-pretty">
                        Gestion de <span className="font-semibold text-accent-1">bases de données </span>
                        pour des applications temps réel et agrégation de données multi-plateformes en indicateurs de gestion pour des
                        <span className="font-semibold text-accent-1"> rapports BI </span>
                        publiés aux collaborateurs.
                    </p>
                </Card>
                <Card className="shadow-accent-2 motion-fade-scale" borderClassName="border-accent-2">
                    <CardTitle className="text-accent-2">Applications & API</CardTitle>
                    <CardLabels>
                        <Label>PHP</Label>
                        <Label>Laravel</Label>
                        <Label>NodeJS</Label>
                        <Label>ElectronJS</Label>
                    </CardLabels>
                    <p className="relative text-pretty">
                        Développement d'<span className="font-semibold text-accent-2">API </span>
                        backend pour intranet et applications mobiles, d'
                        <span className="font-semibold text-accent-2">applications de bureau </span>
                        et de tâches automatiques d'intégration de données.
                    </p>
                </Card>
                <Card className="shadow-accent-3 motion-fade-scale" borderClassName="border-accent-3">
                    <CardTitle className="text-accent-3">CMS</CardTitle>
                    <CardLabels>
                        <Label>Wordpress</Label>
                    </CardLabels>
                    <p className="relative text-pretty">
                        Maintenance de sites internet et développement de plugins et thèmes sous
                        <span className="font-semibold text-accent-3"> Wordpress</span>.
                    </p>
                </Card>
            </div>
        </section>

        <section className="container mt-20 md:mt-36">
            <h2 className="motion-fade-up">Expériences</h2>
            <Timeline items={experiences} />
        </section>

        <section className="container mt-20 md:mt-36">
            <h2 className="motion-fade-up">Formations</h2>
            <Timeline items={training} />
        </section>

        <section className="h-44 md:h-48"></section>
    </>
}

const Card = ({children, className, borderClassName}: {children: ReactNode, className?: string, borderClassName?: string}) => 
    <div className={cn("relative flex-[1_1_28rem] rounded-[13px] shadow-2xl", className)}>
        <div className={cn("absolute -bottom-[1px] -right-[1px] w-4/5 h-4/5 rounded-br-[13px] bg-gradient-to-tl to-transparent to-50%", borderClassName)} />
        <div className="relative size-full p-4 rounded-xl backdrop-blur-3xl bg-white/75 dark:bg-black/75">
            {children}
        </div>
    </div>

const CardTitle = ({children, className}: {children: ReactNode, className?: string}) =>
    <h3 className={cn("bg-gradient-to-br", className)}>{children}</h3>

const CardLabels = ({children, className}: {children: ReactNode, className?: string}) =>
    <div className={cn("flex flex-wrap gap-2 mb-2", className)}>{children}</div>

const Label = ({children, className, icon = Check}: {children: ReactNode, className?: string, icon?: LucideIcon}) => {
    const iconElement = createElement(icon, {className: "inline size-4 mr-0.5"});
    return <span className={cn("text-sm font-semibold px-1.5 rounded-full bg-neutral-500/5 border dark:bg-neutral-500/20 dark:border-neutral-700", className)}>{iconElement}{children}</span>
}

const Timeline = ({items, className}: {items: Experience[], className?: string}) => <div className={cn("relative", className)}>
    <div className="absolute left-0 md:left-40 w-1 h-full bg-neutral-200 dark:bg-neutral-700 rounded-full" style={{clipPath: 'xywh(0 0 100% 100% round 3px 3px)'}}>
        <div className="fixed top-0 h-[76vh] w-1 rounded-full bg-gradient-to-b from-cyan-500 to-blue-500"></div>
    </div>
    {items.map(({dates, title, company, description}, i) => <div key={i} className="relative flex flex-col items-start w-[calc(100%_-_2rem)] ml-8 mb-10 
        md:ml-48 md:w-[calc(100%_-_12rem)]">
        {dates[0] && <h3 className="w-[8rem] -ml-4 motion-fade-right md:absolute md:text-right md:-ml-48">{dates[0]}</h3>}
        <h3 className="mb-0 text-gradient-primary motion-fade-left">{title}</h3>
        {company && <div className="font-bold text-xl motion-fade-left">{company}</div>}
        <p className="text-neutral-600 dark:text-neutral-400 motion-fade-left">{description}</p>
        {dates[1] && <h3 className="w-[8rem] -ml-4 mt-4 mb-0 motion-fade-right md:absolute md:text-right md:-ml-48 md:bottom-0">{dates[1]}</h3>}
    </div>)}
</div>