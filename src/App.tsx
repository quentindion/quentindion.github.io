import { ComponentPropsWithoutRef, forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { LucideIcon, Sun, Moon, AtSign } from 'lucide-react';
import { SiGithub, SiLinkedin, SiYoutube } from '@icons-pack/react-simple-icons';
import wavingHand from '../src/assets/Waving Hand.webp'
import { cn } from './utils';
import { useLocalStorage } from 'usehooks-ts';
import useAnimateInView from './useAnimateInView';
import { animate, AnimatePresence, motion, MotionValue, useMotionValue, useScroll, useTransform } from 'framer-motion';

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
    
    const updateTheme = () => {
        if(theme === null && window.matchMedia('screen and (prefers-color-scheme: dark)').matches)
            setTheme('light');
        else if(theme === null && !window.matchMedia('screen and (prefers-color-scheme: dark)').matches)
            setTheme('dark');
        else
            removeTheme();

        window.applyTheme();
    };

    const [activeMenu, setActiveMenu] = useState<number>();

    useAnimateInView('.motion-fade', {initial: {opacity: 0}, animate: {opacity: 1}});
    useAnimateInView('.motion-fade-up', {initial: {opacity: 0, y: 25}, animate: {opacity: 1, y: 0}});
    useAnimateInView('.motion-fade-down', {initial: {opacity: 0, y: -25}, animate: {opacity: 1, y: 0}});
    useAnimateInView('.motion-fade-left', {initial: {opacity: 0, x: -25}, animate: {opacity: 1, x: 0}});
    useAnimateInView('.motion-fade-right', {initial: {opacity: 0, x: 25}, animate: {opacity: 1, x: 0}});
    useAnimateInView('.motion-fade-scale', {initial: {opacity: 0, scale: 0}, animate: {opacity: 1, scale: 1}});

    const mouseX = useMotionValue(window.innerWidth / 2);
    const mouseY = useMotionValue((window.innerHeight / 2) + window.scrollY);

    useEffect(() => {

        const updateMousePosition = (event: MouseEvent) => {
            animate(mouseX, event.clientX, {duration: 0});
            animate(mouseY, event.clientY, {duration: 0});
        };

        window.addEventListener('mousemove', updateMousePosition);

        return () => {
            window.removeEventListener('mousemove', updateMousePosition);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <>
        <article className="relative flex flex-col z-[3] bg-neutral-50 dark:bg-neutral-900">
            <div className="relative">
                <div className="absolute h-screen w-full bg-[radial-gradient(#71717a40_1px,transparent_1px)] [background-size:16px_16px] 
                    [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
            </div>
            
            <section className="h-12"></section>

            <section className="container items-start inline-flex w-auto gap-2" onMouseLeave={() => setActiveMenu(undefined)}>
                <nav className="menu motion-fade-down">
                    <motion.a className="relative group button" href="https://github.com/quentindion" role="button" aria-label="Github"
                        onHoverStart={() => setActiveMenu(0)}>
                        <AnimatePresence>{activeMenu === 0 && <MenuHighlight />}</AnimatePresence>
                        <div className="relative inline-flex gap-2 items-center">
                            <SiGithub className="dark:group-hover:text-[#181717] group-hover:text-neutral-50" /> Github
                        </div>
                    </motion.a>
                    <motion.a className="relative group button" href="https://www.youtube.com/@vs2kf" role="button" aria-label="Youtube"
                        onHoverStart={() => setActiveMenu(1)}>
                        <AnimatePresence>{activeMenu === 1 && <MenuHighlight />}</AnimatePresence>
                        <div className="relative inline-flex gap-2 items-center">
                            <SiYoutube className="group-hover:text-[#ff0000]" /> Youtube
                        </div>
                    </motion.a>
                    <motion.a className="relative group button" href="https://www.linkedin.com/in/quentindion" role="button" aria-label="LinkedIn"
                        onHoverStart={() => setActiveMenu(2)}>
                        <AnimatePresence>{activeMenu === 2 && <MenuHighlight />}</AnimatePresence>
                        <div className="relative inline-flex gap-2 items-center">
                            <SiLinkedin className="group-hover:text-[#0A66C2]" /> LinkedIn
                        </div>
                    </motion.a>
                    <motion.a className="relative button" onClick={mailMe} role="button" aria-label="Mail"
                        onHoverStart={() => setActiveMenu(3)}>
                        <AnimatePresence>{activeMenu === 3 && <MenuHighlight />}</AnimatePresence>
                        <div className="relative inline-flex gap-2 items-center">
                            <AtSign /> Mail
                        </div>
                    </motion.a>
                </nav>
                <nav className="menu motion-fade-down">
                    <motion.button className="relative button-icon" onClick={updateTheme} aria-label="Thème"
                        onHoverStart={() => setActiveMenu(4)}>
                        <AnimatePresence>{activeMenu === 4 && <MenuHighlight />}</AnimatePresence>
                        <div className="relative inline-flex gap-2 items-center">
                            {(theme === 'dark' && window.matchMedia('screen').matches) || (!theme && window.matchMedia('screen and (prefers-color-scheme: dark)').matches) ?
                                <Sun /> :
                                <Moon />}
                        </div>
                    </motion.button>
                </nav>
            </section>

            <section className="container mt-20 md:mt-32 flex flex-col">
                <div className="font-medium text-lg text-neutral-600 dark:text-neutral-400 motion-fade-up">
                    Hello <img src={wavingHand} alt="Waving hand" className="inline size-8 align-text-bottom" />, je suis Quentin Dion
                </div>
                <h1 className="mb-4 motion-fade-up drop-shadow-md dark:shadow-black">
                    Lead Web
                    <span className="text-gradient-primary"> Developer</span>
                </h1>
                <p className="font-medium text-lg max-w-screen-md text-neutral-600 dark:text-neutral-400 motion-fade-up">
                    Depuis {seniority} ans, passionné d’informatique et des nouvelles technologies qui font le web d'aujourd'hui.
                </p>
            </section>

            <section className="container mt-20 md:mt-32">
                <h2 className="motion-fade-up">Compétences</h2>
                <div className="flex flex-wrap items-stretch justify-start gap-8">
                    <div className="flex-[1_1_28rem] motion-fade-scale">
                        <Card className="h-full" mouseX={mouseX} mouseY={mouseY}>
                            <h3>Interface Web & UI</h3>
                            <div className="labels mb-4">
                                <div className="label">React</div>
                                <div className="label">Angular</div>
                                <div className="label">HTML</div>
                                <div className="label">Sass</div>
                                <div className="label">Tailwind</div>
                            </div>
                            <p className="relative text-pretty">
                                Développement de <span className="font-semibold">PWA </span>
                                et <span className="font-semibold">d'interfaces utilisateur </span>
                                pour de la gestion métier (planifications, gestion de ressources internes).
                            </p>
                        </Card>
                    </div>
                    <div className="flex-[1_1_28rem] motion-fade-scale">
                        <Card className="h-full" mouseX={mouseX} mouseY={mouseY}>
                            <h3>Base de donnée & BI</h3>
                            <div className="labels mb-4">
                                <div className="label">Qlik Sense</div>
                                <div className="label">Power BI</div>
                                <div className="label">MSSQL</div>
                                <div className="label">Postgres</div>
                                <div className="label">MongoDB</div>
                                <div className="label">Supabase</div>
                            </div>
                            <p className="relative text-pretty">
                                Gestion de <span className="font-semibold">bases de données </span>
                                pour des applications temps réel et agrégation de données multi-plateformes en indicateurs de gestion pour des
                                <span className="font-semibold"> rapports BI </span>
                                publiés aux collaborateurs.
                            </p>
                        </Card>
                    </div>
                    <div className="flex-[1_1_28rem] motion-fade-scale">
                        <Card className="h-full" mouseX={mouseX} mouseY={mouseY}>
                            <h3>Applications & API</h3>
                            <div className="labels mb-4">
                                <div className="label">PHP</div>
                                <div className="label">Laravel</div>
                                <div className="label">NodeJS</div>
                                <div className="label">ElectronJS</div>
                            </div>
                            <p className="relative text-pretty">
                                Développement d'<span className="font-semibold">API </span>
                                backend pour intranet et applications mobiles, d'
                                <span className="font-semibold">applications de bureau </span>
                                et de tâches automatiques d'intégration de données.
                            </p>
                        </Card>
                    </div>
                    <div className="flex-[1_1_28rem] motion-fade-scale">
                        <Card className="h-full" mouseX={mouseX} mouseY={mouseY}>
                            <h3>CMS</h3>
                            <div className="labels">
                                <div className="label mb-4">Wordpress</div>
                            </div>
                            <p className="relative text-pretty">
                                Maintenance de sites internet et développement de plugins et thèmes sous
                                <span className="font-semibold"> Wordpress</span>.
                            </p>
                        </Card>
                    </div>
                </div>
            </section>

            <section className="container mt-20 md:mt-32">
                <h2 className="motion-fade-up">Expériences</h2>
                <Timeline items={experiences} />
            </section>

            <section className="flex flex-col mt-20 md:mt-32">
                <div className="container">
                    <h2 className="motion-fade-up">Formations</h2>
                    <Timeline items={training} />
                </div>
            </section>
        </article>

        <section className="h-36"></section>
    </>
}

const MenuHighlight = () => <motion.div layoutId="active-menu" initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} 
    className="absolute top-0 left-0 inset-0 bg-black dark:bg-white" style={{ borderRadius: 18 }} />

const Card = motion.create(forwardRef<HTMLDivElement, ComponentPropsWithoutRef<'div'> & {mouseX: MotionValue<number>, mouseY: MotionValue<number>}>(
    ({children, className, mouseX, mouseY}, forwardedRef) => {

        const ref = useRef<HTMLDivElement>(null);
        useImperativeHandle(forwardedRef, () => ref.current as HTMLDivElement);

        const refX = useMotionValue(0);
        const refY = useMotionValue(0);

        useEffect(() => {
            
            const updateRefPosition = () => {
                if(ref.current) {
                    animate(refX, ref.current.getBoundingClientRect().left, {duration: 0});
                    animate(refY, ref.current.getBoundingClientRect().top, {duration: 0});
                }
            }

            updateRefPosition();
            window.addEventListener('scroll', updateRefPosition);

            return () => {
                window.removeEventListener('scroll', updateRefPosition);
            }
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [])

        const relativeX = useTransform<number, string>([mouseX, refX], ([mouseX, refX]) => `${ref.current ? mouseX - refX : mouseX}px`);
        const relativeY = useTransform<number, string>([mouseY, refY], ([mouseY, refY]) => `${ref.current ? mouseY - refY : mouseY}px`);

        return <motion.div ref={ref} className={cn("card", className)} style={{
            '--spotlight-x': relativeX,
            '--spotlight-y': relativeY,
        }}
        whileHover={{
            scale: 1.025
        }}>
            <div className="card-content">{children}</div>
        </motion.div>
    })
);

const Timeline = forwardRef<HTMLDivElement, ComponentPropsWithoutRef<'div'> & {items: Experience[]}>(
    ({items, className}, forwardedRef) => {

        const ref = useRef<HTMLDivElement>(null);
        useImperativeHandle(forwardedRef, () => ref.current as HTMLDivElement);

        const { scrollY } = useScroll();

        const relativeScrollY = useTransform(scrollY, () => {
            if(ref.current) {
                const {top, height} = ref.current.getBoundingClientRect();
                return `${Math.max(Math.min(window.innerHeight - top - 176, height), 0)}px`
            }
        });

        return <div ref={ref} className={cn("relative", className)}>
            <div className="absolute left-0 md:left-40 w-1 h-full rounded-md bg-neutral-200 dark:bg-neutral-700">
                <motion.div className="top-0 h-[50px] w-1 rounded-md bg-gradient-to-b gradient-primary" style={{height: relativeScrollY}}></motion.div>
            </div>
            {items.map(({dates, title, company, description}, i) => <div key={i} className="relative flex flex-col items-start w-[calc(100%_-_2rem)] ml-8 mb-10 
                md:ml-48 md:w-[calc(100%_-_12rem)]">
                {dates[0] && <h3 className="w-[8rem] -ml-4 motion-fade-right md:absolute md:text-right md:-ml-48">{dates[0]}</h3>}
                <h3 className="mb-2 motion-fade-left">{title}</h3>
                {company && <h3 className="mb-2 font-bold text-gradient-primary motion-fade-left">{company}</h3>}
                <p className="text-neutral-600 dark:text-neutral-400 motion-fade-left">{description}</p>
                {dates[1] && <h3 className="w-[8rem] -ml-4 mt-4 mb-0 motion-fade-right md:absolute md:text-right md:-ml-48 md:bottom-0">{dates[1]}</h3>}
            </div>)}
        </div>
    }
);