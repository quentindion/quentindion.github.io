import { useState } from 'react';
import { LucideIcon, BarChart2, Layout, Server, Database, Globe, Palette, Sun, Moon, SunMoon } from 'lucide-react';
import { Menu } from '@headlessui/react';
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from '../../tailwind.config.js';
import Lottie from 'lottie-react';
import Timeline from './Timeline.js';
import githubIconAnimation from '../assets/github.json';
import linkedinIconAnimation from '../assets/linkedin.json';
import mailIconAnimation from '../assets/mail.json';
import youtubeIconAnimation from '../assets/youtube.json';
import scrollDownIconAnimation from '../assets/scrollDown.json';
import LottieIcon from './LottieIcon.js';
import profilImg from '../assets/profil.webp';
import { useMediaQuery } from 'react-responsive';
import useAnimateInView from '../hooks/animateInView.js';

export type Theme = null | 'light' | 'dark';

export type Skill = {
    category: string,
    icon: LucideIcon,
    items: string[],
    description: string
}

export type Experience = {
    title?: string,
    company: string,
    dates: string[],
    description: string
}

export default function App () {

    const seniority: number = (new Date).getFullYear() - 2013;

    const skills: Skill[] = [
        {
            category: 'BI',
            icon: BarChart2,
            items: ['Qlik Sense', 'Power BI'],
            description: 'Collecte et agrégation de données multi-plateformes en indicateurs de gestion et publication de rapports aux collaborateurs.'
        },
        {
            category: 'Interface Web',
            icon: Layout,
            items: ['HTML', 'CSS', 'JS', 'React', 'Angular', 'Tailwind'],
            description: 'Développement de PWA et d\'interfaces utilisateur pour de la gestion métier (planifications, gestion de ressources internes).'
        },
        {
            category: 'Langage Serveur',
            icon: Server,
            items: ['PHP', 'NodeJS', 'Laravel'],
            description: 'Développement d\'applications backend de gestion, d\'API Rest pour applications mobiles et gestion de tâches automatiques entre systèmes.'
        },
        {
            category: 'Base de donnée',
            icon: Database,
            items: ['SQL', 'MongoDB', 'Redis'],
            description: 'Développement de requêtes et de modèles de base de donnée pour des applications temps réel et des rapports BI.'
        },
        {
            category: 'CMS',
            icon: Globe,
            items: ['Wordpress'],
            description: 'Maintenance de sites internet et développement de thèmes et plugins sous Wordpress.'
        }
    ];

    const experiences: Experience[] = [
        {
            title: 'Lead développeur web',
            company: 'Oxance',
            dates: ['2016'],
            description: 'Développement, maintenance et gestion de plusieurs projets web'
        }, {
            title: 'Développeur/Animateur Web',
            company: 'Laboratoire ALPA',
            dates: ['2016', '2013'],
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
            company: 'Licence Pro SIL',
            description: 'Métiers de l\'internet et des applications multimédia',
            dates: ['2013', '2012']
        }, {
            company: 'BTS IRIS',
            description: 'Informatique et réseau pour l\'industrie et les services',
            dates: ['2012', '2010']
        }
    ];

    const mailMe = () => {
        location.href = 'mailto:' + ['contact@quentindion', 'me'].join('.');
    }

    const {theme: {screens}} = resolveConfig(tailwindConfig);

    const isMd = useMediaQuery({query: `(min-width: ${screens.md})`});

    const themes: {name: string, icon: LucideIcon, action: () => void}[] = [
        {name: 'Clair', icon: Sun, action: () => updateTheme('light')},
        {name: 'Sombre', icon: Moon, action: () => updateTheme('dark')},
        {name: 'Système', icon: SunMoon, action: () => updateTheme(null)}
    ];

    const [, setTheme] = useState<Theme>(localStorage.getItem('theme') as Theme);

    const updateTheme = (theme: Theme) => {

        setTheme(theme);

        if(theme) localStorage.setItem('theme', theme);
        else localStorage.removeItem('theme');

        window.applyTheme();
    }

    const { scrollY } = useScroll();

    const navScrollYProgress = useTransform(scrollY, [80, 400], [0, 1]);

    const navMaxWidth = useTransform(navScrollYProgress, [0, 1], [`${isMd ? 50 : 75}%`, '100%']);
    const navBgOpacity = useTransform(navScrollYProgress, [0, 1], [0, 0.5]);
    const navBorderRadius = useTransform(navScrollYProgress, [0, 1], [40, 0]);

    const menuAnimations = {
        hidden: {
            scale: 0,
            opacity: 0
        },
        visible: {
            scale: 1,
            opacity: 1,
            transition: {
                delayChildren: 0.15,
                staggerChildren: 0.05,
            }
        },
        exit: {opacity: 0}
    };

    const menuItemAnimation = {
        hidden: {y: 25, opacity: 0},
        visible: {y: 0, opacity: 1},
        exit: {opacity: 0}
    };

    useAnimateInView('.motion-fade', {initial: {opacity: 0}, animate: {opacity: 1}});
    useAnimateInView('.motion-fade-up', {initial: {opacity: 0, y: 75}, animate: {opacity: 1, y: 0}});
    useAnimateInView('.motion-fade-left', {initial: {opacity: 0, x: -75}, animate: {opacity: 1, x: 0}});
    useAnimateInView('.motion-fade-right', {initial: {opacity: 0, x: 75}, animate: {opacity: 1, x: 0}});
    useAnimateInView('.motion-fade-scale', {initial: {opacity: 0, scale: 0}, animate: {opacity: 1, scale: 1}});

    return <>
        <section className="h-20"></section>
        <motion.section className="mx-auto sticky top-0 z-10 max-w-screen-xl container backdrop-blur-md min-w-[75%] md:min-w-[50%]
            bg-neutral-100 dark:bg-neutral-900 motion-fade-up"
            style={{
                maxWidth: navMaxWidth,
                borderRadius: navBorderRadius,
                '--tw-bg-opacity': navBgOpacity
            }}>
            <nav className="relative flex items-center justify-between p-2">
                <div className="flex flex-row gap-2">
                    <a className="button-icon" onClick={mailMe} role="button" aria-label="Mail">
                        <LottieIcon animationData={mailIconAnimation} />
                    </a>
                    <a className="button-icon" href="https://www.linkedin.com/in/quentindion" role="button" aria-label="LinkedIn">
                        <LottieIcon animationData={linkedinIconAnimation} />
                    </a>
                    <a className="button-icon" href="https://github.com/quentindion" role="button" aria-label="Github">
                        <LottieIcon animationData={githubIconAnimation} />
                    </a>
                    <a className="button-icon" href="https://www.youtube.com/@vs2kf" role="button" aria-label="Youtube">
                        <LottieIcon animationData={youtubeIconAnimation} />
                    </a>
                </div>
                <Menu as="div">
                    <Menu.Button className="button-icon" role="button" aria-label="Theme">
                        <Palette />
                    </Menu.Button>
                    <AnimatePresence>
                        <Menu.Items className="absolute top-2 right-2 w-full sm:w-auto">
                            <motion.div key="theme-menu" 
                                className="flex flex-col outline-none p-2 shadow-xl rounded-xl overflow-hidden bg-neutral-50 dark:bg-neutral-950 origin-top-right"
                                initial="hidden" animate="visible" exit="exit" variants={menuAnimations}>
                                {themes.map(({name, icon, action}, i) => {
                                    const LucideIcon = icon;
                                    return <Menu.Item key={'theme-menu-item' + i}>
                                        <motion.button onClick={action} className="text-left z-[1]" variants={menuItemAnimation}>
                                            <LucideIcon /> {name}
                                        </motion.button>
                                    </Menu.Item>;
                                })}
                            </motion.div>
                        </Menu.Items>
                    </AnimatePresence>
                </Menu>
            </nav>
        </motion.section>
        <section className="container mx-auto px-4 justify-center py-10 md:py-16">
            <img src={profilImg} alt="Image"
                className="h-[262px] w-[262px] mx-auto my-8 object-cover object-[center_60%] rounded-full motion-fade-up" />
            
            <h1 className="flex justify-center title mb-8 motion-fade-up">Quentin Dion</h1>

            <h2 className="flex justify-center text-4xl md:text-6xl leading-none mb-8 text-transparent bg-clip-text bg-gradient-main motion-fade-up">
                Lead Web Developer
            </h2>

            <p className="flex justify-center mb-10 md:mb-16 motion-fade-up">
                Depuis {seniority}ans, passionné d’informatique et des nouvelles technologies qui font le web d'aujourd'hui
            </p>

            <Lottie animationData={scrollDownIconAnimation} className="lottie lottie-icon mx-auto w-10 motion-fade-up" />
        </section>

        <section className="container mx-auto px-4 max-w-screen-xl py-10 md:py-16">
            <h3 className="title mb-5 motion-fade-left">Compétences</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {skills.map(({category, items, description, icon}, i) => {

                    const LucideIcon = icon;
                    
                    return <div key={'skill-' + i} className="p-[1px] rounded-xl shadow-primer-lg bg-gradient-main motion-fade-scale">
                        <div className="px-6 py-8 h-full bg-white/90 dark:bg-neutral-900/90 rounded-[11px]">
                            <div className="flex flex-row items-start gap-4">
                                <div className="w-20 min-w-[5rem] py-6 flex justify-center bg-white dark:bg-neutral-900 rounded-xl mb-4">
                                    <LucideIcon />
                                </div>
                                <div>
                                    <h4 className="text-lg font-medium mb-4">{category}</h4>
                                    <div className="text-md flex flex-row flex-wrap gap-1">
                                        {items.map((item, j) =>
                                            <span key={'skill-item-' + j} className="text-xs font-bold bg-white dark:bg-neutral-900 text-center px-2 py-1 rounded-xl">
                                                {item}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <p className="text-md">{description}</p>
                        </div>
                    </div>
                })}
            </div>
        </section>
            
        <section className="container mx-auto px-4 max-w-screen-xl py-10 md:py-16">
            <div className="flex flex-col lg:flex-row justify-between gap-6">
                <div className="mb-10 lg:mb-0">
                    <h3 className="title motion-fade-left">Expériences</h3>
                </div>
                <Timeline experiences={experiences} />
            </div>
        </section>

        <section className="container mx-auto px-4 max-w-screen-xl py-10 md:py-16 mb-12">
            <div className="flex flex-col lg:flex-row justify-between gap-6">
                <div className="mb-10 lg:mb-0">
                    <h3 className="title motion-fade-left">Formations</h3>
                </div>
                <Timeline experiences={training} />
            </div>
        </section>
    </>
}
