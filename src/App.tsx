import { ComponentPropsWithoutRef, forwardRef, Fragment, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { LucideIcon, Sun, Moon, AtSign, SquareArrowOutUpRight } from 'lucide-react';
import { SiGithub, SiLinkedin, SiYoutube } from '@icons-pack/react-simple-icons';
import wavingHand from '../src/assets/Waving Hand.webp'
import { cn } from './utils';
import { useLocalStorage } from 'usehooks-ts';
import useAnimateInView from './useAnimateInView';
import { animate, motion, MotionValue, useMotionValue, useScroll, useTransform } from 'framer-motion';
import { version } from '../package.json';

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

        if(theme === null && window.matchMedia('prefers-color-scheme: dark').matches)
            setTheme('light');
        else if(theme === null && !window.matchMedia('prefers-color-scheme: dark').matches)
            setTheme('dark');
        else
            removeTheme();

        window.applyTheme();
    };

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

    const [changelog, setChangelog] = useState<unknown[]>([]);

    useEffect(() => {

        fetch('changelog.json')
            .then(response => response.json() as Promise<{commits: {oid: string, message: string, author: {date: string}}[]}>)
            .then(response => response.commits.map(({message, author: {date}}) => {
                const lines = message.split('\n');
                return ({message: lines.length > 1 ? lines : message, date});
            }))
            .then(setChangelog);

    }, []);

    return <>
        {/* <BackgroundBeams /> */}
        <article className="relative flex flex-col z-[3] bg-neutral-50 dark:bg-neutral-900">

            <div className="relative">
                <div className="absolute h-screen w-full bg-[radial-gradient(#71717a40_1px,transparent_1px)] [background-size:16px_16px] 
                    [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
            </div>
            
            <section className="h-12"></section>

            <section className="container items-start inline-flex w-auto gap-2">
                <nav className="menu motion-fade-down">
                    <a className="group button" href="https://github.com/quentindion" role="button" aria-label="Github">
                        <SiGithub className="dark:group-hover:text-[#181717] group-hover:text-neutral-50" />
                        <span>Github</span>
                    </a>
                    <a className="group button" href="https://www.youtube.com/@vs2kf" role="button" aria-label="Youtube">
                        <SiYoutube className="group-hover:text-[#ff0000]" />
                        <span>Youtube</span>
                    </a>
                    <a className="group button" href="https://www.linkedin.com/in/quentindion" role="button" aria-label="LinkedIn">
                        <SiLinkedin className="group-hover:text-[#0A66C2]" />
                        <span>LinkedIn</span>
                    </a>
                    <a className="group button" onClick={mailMe} role="button" aria-label="Mail">
                        <AtSign />
                        <span>Mail</span>
                    </a>
                </nav>
                <nav className="menu motion-fade-down">
                    <button className="relative button-icon" onClick={updateTheme} aria-label="Thème">
                        {(theme === 'dark' && window.matchMedia('screen').matches) || (!theme && window.matchMedia('screen and (prefers-color-scheme: dark)').matches) ?
                            <Sun /> :
                            <Moon />}
                    </button>
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

        <section className="sticky top-0 bg-neutral-800 z-[2]">
            <div className="flex items-center justify-center h-8 bg-neutral-50 dark:bg-neutral-900 rounded-b-xl shadow-xl shadow-black">
                <div className="w-16 h-1 rounded-md bg-neutral-200 dark:bg-neutral-700 md:hidden"></div>
            </div>
        </section>

        <footer className="flex flex-col flex-wrap bg-neutral-800 text-white z-[1]">
            <div className="container py-16 flex flex-wrap items-stretch justify-center gap-4">
                <div className="flex flex-col gap-4 flex-auto">
                    <Code content={{
                        about: {
                            version,
                            social: {
                                github: "https://github.com/quentindion",
                                youtube: "https://www.youtube.com/@vs2kf",
                                linkedin: "https://www.linkedin.com/in/quentindion"
                            }
                        }
                    }} />
                    <Code content={{
                        resources: [
                            "https://vitejs.dev",
                            "https://tailwindcss.com",
                            "https://www.framer.com/motion",
                            "https://lucide.dev"
                        ]
                    }}/>
                </div>
                <Code className="flex-auto" content={{changelog}} />
            </div>
        </footer>
    </>
}

const Card = motion(forwardRef<HTMLDivElement, ComponentPropsWithoutRef<'div'> & {mouseX: MotionValue<number>, mouseY: MotionValue<number>}>(
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Code = forwardRef<HTMLPreElement, Omit<ComponentPropsWithoutRef<'pre'>, 'content'> & {content: unknown}>(({className, content}, ref) => {
    
    const parse = (content: unknown, prop?: string, indent = -1, isLast = true): JSX.Element => {

        const isObject = (item: unknown): item is object => Object.prototype.toString.call(item) === "[object Object]";
        const isArray = (item: unknown): item is Array<unknown> => Array.isArray(item);
        const isNumeric = (item: unknown): item is string => /^[\d.]+$/i.test(item as string);
        const isLink = (item: unknown): item is string => /^(https?:\/\/)?([\da-z.-]+)\.([a-z]{2,6})([/\w.-]*)*\/?/i.test(item as string);

        const padLeft = indent > 0 ? '    '.repeat(indent - 1) : '';

        if(indent === 0)
            return <>
                <code>
                    <span className="text-cyan-400">const </span> 
                    <span className="text-blue-400">{prop}</span>
                    <span className="text-red-400">: </span>
                    <span className="text-blue-400 capitalize">
                        {isObject(content) ? prop : 
                        isArray(content) ? <>
                            Array
                            <span className="text-purple-400">{'<'}</span>
                            {typeof content[0]}
                            <span className="text-purple-400">{'>'}</span>
                        </> : 
                        typeof content}
                    </span>
                    <span className="text-red-400"> = </span>
                    {isObject(content) ? '{' : isArray(content) ? '[' : ''}
                </code>
                {parse(content, undefined, indent + 1)}
                <code>
                    {isObject(content) ? '}' : isArray(content) ? ']' : ''}
                </code>
            </>
        else if(isObject(content)) {
            const items = Object.entries(content);
            return <>
                {indent > 1 && <code>{padLeft}{prop && <><span className="text-cyan-400">{prop}</span>: </>}{'{'}</code>}
                {items.map(([prop, item], i) => <Fragment key={i}>{parse(item, prop, indent + 1, i === items.length - 1)}</Fragment>)}
                {indent > 1 && <code>{padLeft}{'}'}{!isLast && ','}</code>}
            </>
        } else if(isArray(content))
            return <>
                {indent > 1 && <code>{padLeft}{prop && <><span className="text-cyan-400">{prop}</span>: </>}{'['}</code>}
                {content.map((item, i) => <Fragment key={i}>{parse(item, undefined, indent + 1, i === content.length - 1)}</Fragment>)}
                {indent > 1 && <code>{padLeft}{']'}{!isLast && ','}</code>}
            </>
        else
            return <code>
                {padLeft}
                {prop && <><span className="text-cyan-400">{prop}</span>: </>}
                {isNumeric(content) ? <span className="text-purple-400">{content}</span> : 
                isLink(content) ? <span className="text-red-400"><a href={content}>{content}</a> <SquareArrowOutUpRight className="inline-block size-3" /></span> :
                <><span className="text-yellow-400">"{content as string}"</span></>}
                {!isLast && ','}
            </code>;
    }
    
    return <pre ref={ref} className={cn("code", className)}>{parse(content)}</pre>;
});