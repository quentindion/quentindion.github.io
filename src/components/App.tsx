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
import { Config } from 'tailwindcss';
import { useMediaQuery } from 'react-responsive';
import useInView from '../hooks/inView.js';

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

    const {theme: {screens}} = resolveConfig(tailwindConfig) as {theme: Partial<Config>};

    const isMd = useMediaQuery({query: `(min-width: ${screens.md})`});

    const themes: {name: string, icon: LucideIcon, action: () => void}[] = [
        {name: 'Clair', icon: Sun, action: () => updateTheme('light')},
        {name: 'Sombre', icon: Moon, action: () => updateTheme('dark')},
        {name: 'Système', icon: SunMoon, action: () => updateTheme(null)}
    ];

    const [_theme, setTheme] = useState<Theme>(localStorage.getItem('theme') as Theme);

    const updateTheme = (theme: Theme) => {

        setTheme(theme);

        if(theme) localStorage.setItem('theme', theme);
        else localStorage.removeItem('theme');

        window.applyTheme();
    }

    const { scrollY } = useScroll();

    const navScrollYProgress = useTransform(scrollY, [80, 400], [0, 1]);

    const navMaxWidth = useTransform(navScrollYProgress, [0, 1], [`${isMd ? 50 : 75}%`, '100%']);
    const navBgOpacity = useTransform(navScrollYProgress, [0, 1], [0, 0.75]);
    const navBorderRadius = useTransform(navScrollYProgress, [0, 1], [40, 0]);
    const navShadowOpacity = useTransform(navScrollYProgress, [0, 1], [
        '0 0px 0px -5px var(--tw-shadow-color), 0 0px 0px -5px var(--tw-shadow-color)',
        '0 20px 25px -5px var(--tw-shadow-color), 0 20px 25px -5px var(--tw-shadow-color)'
    ]);

    const menuAnimations = {
        hidden: {
            scale: 0,
            opacity: 0
        },
        visible: {
            scale: 1,
            opacity: 1,
            transition: {
                // type: 'spring',
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

    useInView('.motion-fade', {initial: {opacity: 0}, animate: {opacity: 1}});
    useInView('.motion-fade-up', {initial: {opacity: 0, y: 75}, animate: {opacity: 1, y: 0}});
    useInView('.motion-fade-left', {initial: {opacity: 0, x: -75}, animate: {opacity: 1, x: 0}});
    useInView('.motion-fade-right', {initial: {opacity: 0, x: 75}, animate: {opacity: 1, x: 0}});
    useInView('.motion-fade-scale', {initial: {opacity: 0, scale: 0}, animate: {opacity: 1, scale: 1}});

    return <>
        <section className="h-20"></section>
        <motion.section className="mx-auto sticky top-0 z-10 max-w-screen-xl container backdrop-blur-md min-w-[75%] md:min-w-[50%]
            bg-gray-100 shadow-xl shadow-gray-500/25 dark:bg-gray-800 dark:shadow-black/25 motion-fade-up"
            style={{
                maxWidth: navMaxWidth,
                borderRadius: navBorderRadius,
                '--tw-shadow-colored': navShadowOpacity,
                '--tw-bg-opacity': navBgOpacity
            }}>
            <nav className="relative flex items-center justify-between p-2">
                <div className="flex flex-row gap-2">
                    <a className="button-icon dark:hover:after:bg-gray-700" onClick={mailMe} role="navigation" aria-label="Mail">
                        <LottieIcon animationData={mailIconAnimation} />
                    </a>
                    <a className="button-icon dark:hover:after:bg-gray-700" href="https://www.linkedin.com/in/quentindion" role="navigation" aria-label="LinkedIn">
                        <LottieIcon animationData={linkedinIconAnimation} />
                    </a>
                    <a className="button-icon dark:hover:after:bg-gray-700" href="https://github.com/quentindion" role="navigation" aria-label="Github">
                        <LottieIcon animationData={githubIconAnimation} />
                    </a>
                    <a className="button-icon dark:hover:after:bg-gray-700" href="https://www.youtube.com/@vs2kf" role="navigation" aria-label="Youtube">
                        <LottieIcon animationData={youtubeIconAnimation} />
                    </a>
                </div>
                <Menu as="div">
                    <Menu.Button className="button-icon hover:after:bg-gray-200 dark:hover:after:bg-gray-700">
                        <Palette />
                    </Menu.Button>
                    <AnimatePresence>
                        <Menu.Items className="absolute top-2 right-2 w-full sm:w-auto">
                            <motion.div key="theme-menu" 
                                className="flex flex-col outline-none p-2 shadow-xl rounded-xl overflow-hidden bg-gray-50 dark:bg-gray-900 origin-top-right"
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
        <section className="justify-center py-10 md:py-16">
            <img src={profilImg} alt="Image" loading="lazy"
                className="h-[262px] w-[262px] mx-auto my-8 object-cover object-[center_60%] rounded-full motion-fade-up" />
            
            <h1 className="flex justify-center text-gray-600 dark:text-gray-400 text-lg md:text-2xl mb-8 motion-fade-up">Quentin Dion</h1>

            <h2 className="flex justify-center md:font-light text-4xl md:text-7xl leading-none mb-8 text-transparent bg-clip-text
                bg-gradient-to-br from-emerald-600 to-lime-500 dark:from-emerald-500 dark:to-lime-300 motion-fade-up">
                Lead Web Developer
            </h2>

            <p className="flex justify-center text-gray-600 dark:text-gray-400 mb-10 md:mb-16 px-4 motion-fade-up">
                Depuis {seniority}ans, passionné d’informatique et des nouvelles technologies qui font le web d'aujourd'hui
            </p>

            <Lottie animationData={scrollDownIconAnimation} className="lottie lottie-icon mx-auto w-10 text-gray-500 motion-fade-up" />
        </section>

        <section className="container max-w-screen-xl mx-auto px-4 py-10 md:py-16">
            <h3 className="font-light text-gray-700 dark:text-gray-300 text-3xl md:text-4xl mb-5 motion-fade-left">Compétences</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {skills.map(({category, items, description, icon}, i) => {

                    const LucideIcon = icon;
                    
                    return <div key={'skill-' + i} className="bg-gray-50 dark:bg-gray-900 px-6 py-8 rounded-xl shadow-primer-lg motion-fade-scale">
                        <div className="flex flex-row items-start gap-4">
                            <div className="w-20 min-w-[5rem] py-6 flex justify-center bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 rounded-xl mb-4 shadow-inner">
                                <LucideIcon />
                            </div>
                            <div>
                                <h4 className="font-medium text-gray-700 dark:text-gray-300 text-lg mb-4">{category}</h4>
                                <div className="text-gray-600 dark:text-gray-400 text-md flex flex-row flex-wrap gap-1">
                                    {items.map((item, j) =>
                                        <span key={'skill-item-' + j} className="bg-gray-100 dark:bg-gray-800 text-xs text-center font-medium px-2 py-1 rounded-xl">
                                            {item}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 text-md">{description}</p>
                    </div>
                })}
            </div>
        </section>
            
        <section className="container max-w-screen-xl mx-auto px-4 py-10 md:py-16">
            <div className="flex flex-col lg:flex-row justify-between gap-6">
                <div className="mb-10 lg:mb-0">
                    <h3 className="font-light text-gray-700 dark:text-gray-300 text-3xl md:text-4xl motion-fade-left">Expériences</h3>
                </div>
                <Timeline experiences={experiences} />
            </div>
        </section>

        <section className="container max-w-screen-xl mx-auto px-4 py-10 md:py-16 mb-12">
            <div className="flex flex-col lg:flex-row justify-between gap-6">
                <div className="mb-10 lg:mb-0">
                    <h3 className="font-light text-gray-700 dark:text-gray-300 text-3xl md:text-4xl motion-fade-left">Formations</h3>
                </div>
                <Timeline experiences={training} />
            </div>
        </section>
    </>
}
