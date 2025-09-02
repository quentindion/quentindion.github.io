import { HTMLProps, useEffect, useImperativeHandle, useMemo, useRef } from 'react';
import { LucideIcon, AtSignIcon, CircleCheckIcon, CircleXIcon } from 'lucide-react';
import wavingHand from '../src/assets/Waving Hand.webp'
import { cn } from './utils';
import useAnimateInView from './useAnimateInView';
import { animate, motion, MotionValue, useMotionValue, useTransform } from 'framer-motion';
import GithubIcon from "./assets/github-181717.svg?react";
import LinkedinIcon from "./assets/linkedin-0A66C2.svg?react";
import YoutubeIcon from "./assets/youtube-FF0000.svg?react";
import useTheme from './useTheme';
import { useCopyToClipboard } from 'usehooks-ts';
import { toast, Toaster } from 'sonner';
import ThemeIcon from './components/ThemeIcon';
import DockerIcon from "./assets/docker-2496ED.svg?react";
import CaddyIcon from "./assets/caddy-1F88C0.svg?react";
import GitIcon from "./assets/git-F05032.svg?react";
import LaravelIcon from "./assets/laravel-FF2D20.svg?react";
import NodeJSIcon from "./assets/nodedotjs-5FA04E.svg?react";
import ViteIcon from "./assets/vite-646CFF.svg?react";
import TSIcon from "./assets/typescript-3178C6.svg?react";
import ReactIcon from "./assets/react-61DAFB.svg?react";
import TailwindCssIcon from "./assets/tailwindcss-06B6D4.svg?react";
import InfiniteLooper from './components/InfiniteLooper';

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
        {Icon: CaddyIcon,       className: "fill-[#1F88C0]", name: "Caddy"},
        {Icon: GitIcon,         className: "fill-[#F05032]", name: "Git"},
        {Icon: LaravelIcon,     className: "fill-[#FF2D20]", name: "Laravel"},
        {Icon: NodeJSIcon,      className: "fill-[#5FA04E]", name: "Node JS"},
        {Icon: ViteIcon,        className: "fill-[#646CFF]", name: "Vite"},
        {Icon: TSIcon,          className: "fill-[#3178C6]", name: "Typescript"},
        {Icon: ReactIcon,       className: "fill-[#61DAFB]", name: "React"},
        {Icon: TailwindCssIcon, className: "fill-[#06B6D4]", name: "Tailwind CSS"}
    ], []);

    const [, toggleTheme] = useTheme();

    useAnimateInView({
        ".motion-fade": {initial: {opacity: 0}, animate: {opacity: 1}},
        ".motion-fade-up": {initial: {opacity: 0, y: 25}, animate: {opacity: 1, y: 0}},
        ".motion-fade-down": {initial: {opacity: 0, y: -25}, animate: {opacity: 1, y: 0}},
        ".motion-fade-left": {initial: {opacity: 0, x: -25}, animate: {opacity: 1, x: 0}},
        ".motion-fade-right": {initial: {opacity: 0, x: 25}, animate: {opacity: 1, x: 0}},
        ".motion-fade-scale": {initial: {opacity: 0, scale: 0}, animate: {opacity: 1, scale: 1}}
    });

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
        
        toast.success("Copié dans le presse-papiers.", {id: "copy-contact"});
    }

    return <>
        <div className="relative">
            <div className="absolute h-screen w-full bg-[radial-gradient(#71717a40_1px,transparent_1px)] [background-size:16px_16px] 
                [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
        </div>
        <article className="container p-0 grid grid-cols-[1rem_1fr_1rem] md:grid-cols-[2rem_1fr_2rem]">
            <div className="min-w-4 md:min-w-8 bg-dashed border-x dark:border-white/10 border-black/5" />
            <div>
                <section className="h-12"></section>
                <div className="flex flex-row items-start justify-between mx-2 md:mx-8">
                    <nav className="flex flex-wrap gap-2 justify-start">
                        <a className="button" href="https://github.com/quentindion" role="button" aria-label="Github">
                            <GithubIcon className="size-6 fill-current github-icon transition-colors" /> Github
                        </a>
                        <a className="button" href="https://www.youtube.com/@vs2kf" role="button" aria-label="Youtube">
                            <YoutubeIcon className="size-6 fill-current youtube-icon transition-colors" /> Youtube
                        </a>
                        <a className="button" href="https://www.linkedin.com/in/quentindion" role="button" aria-label="LinkedIn">
                            <LinkedinIcon className="size-6 fill-current linkedin-icon transition-colors" /> LinkedIn
                        </a>
                        <a className="button" onClick={() => document.getElementById("contact")?.scrollIntoView({behavior: "smooth"})} 
                            role="button" aria-label="Mail">
                            <AtSignIcon className="transition-colors" /> Contact
                        </a>
                    </nav>
                    <div>
                        <button className="relative button-icon" onClick={toggleTheme} aria-label="Thème">
                            <div className="relative inline-flex gap-2 items-center">
                                <ThemeIcon />
                            </div>
                        </button>
                    </div>
                </div>

                <section className="relative mt-20 md:mt-32 px-2">
                    <div className="absolute -left-[100vw] w-[200vw] border-b dark:border-white/10 border-black/5" />
                    <div className="font-medium text-lg text-neutral-600 dark:text-neutral-400 motion-fade-up">
                        Hello <img src={wavingHand} alt="Waving hand" className="inline size-8 align-text-bottom" />, je suis Quentin Dion
                    </div>
                    <div className="absolute -left-[100vw] w-[200vw] border-b dark:border-white/10 border-black/5" />
                    <h1 className="mb-2 motion-fade-up drop-shadow-md dark:shadow-black">
                        Lead Web
                        <span className="text-gradient-primary"> Developer</span>
                    </h1>
                    <div className="absolute -left-[100vw] w-[200vw] border-b dark:border-white/10 border-black/5" />
                    <p className="font-medium text-lg max-w-(--breakpoint-md) text-neutral-600 dark:text-neutral-400 motion-fade-up">
                        Depuis {seniority} ans, passionné d’informatique et des nouvelles technologies qui font le web d'aujourd'hui.
                    </p>
                    <div className="absolute -left-[100vw] w-[200vw] border-b dark:border-white/10 border-black/5" />
                </section>

                <section className="relative mt-20 md:mt-32">
                    <div className="absolute -left-[100vw] w-[200vw] border-b dark:border-white/10 border-black/5" />
                    <h2 className="pt-2 px-2 motion-fade">Mes outlis</h2>
                    <InfiniteLooper className="mb-4 motion-fade-left" duration={10} direction="left">
                        {tech.map(({Icon, className, name}) => <div key={name} className="flex gap-2 items-center w-max text-2xl font-bold">
                            <Icon className={cn("size-12", className)} /> {name}
                        </div>)}
                    </InfiniteLooper>
                    <div className="absolute -left-[100vw] w-[200vw] border-b dark:border-white/10 border-black/5" />
                </section>

                <section className="relative mt-20 md:mt-32 px-2">
                    <div className="absolute -left-[100vw] w-[200vw] border-b dark:border-white/10 border-black/5" />
                    <h2 className="pt-2 motion-fade-up">Compétences</h2>
                    <div className="flex flex-wrap items-stretch justify-start gap-2 py-2">
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
                    <div className="absolute -left-[100vw] w-[200vw] border-b dark:border-white/10 border-black/5" />
                </section>

                <section className="relative mt-20 md:mt-32 px-2">
                    <div className="absolute -left-[100vw] w-[200vw] border-b dark:border-white/10 border-black/5" />
                    <h2 className="pt-2 motion-fade-up">Expériences</h2>
                    <Timeline items={experiences} className="py-2" />
                    <div className="absolute -left-[100vw] w-[200vw] border-b dark:border-white/10 border-black/5" />
                </section>

                <section className="relative mt-20 md:mt-32 px-2">
                    <div className="absolute -left-[100vw] w-[200vw] border-b dark:border-white/10 border-black/5" />
                    <h2 className="pt-2 motion-fade-up">Formations</h2>
                    <Timeline items={training} className="py-2" />
                    <div className="absolute -left-[100vw] w-[200vw] border-b dark:border-white/10 border-black/5" />
                </section>

                <section id="contact" className="relative mt-20 md:mt-32 px-2">
                    <div className="absolute -left-[100vw] w-[200vw] border-b dark:border-white/10 border-black/5" />
                    <h2 className="pt-2 motion-fade-up">Contact</h2>
                    <a className="motion-fade cursor-pointer" onClick={copyContact}>contact@quentindion.me</a>
                    <div className="absolute -left-[100vw] w-[200vw] border-b dark:border-white/10 border-black/5" />
                </section>

                <section className="h-36"></section>
            </div>

            <div className="min-w-4 md:min-w-8 bg-dashed border-x dark:border-white/10 border-black/5" />
        </article>
        <Toaster position="bottom-center" toastOptions={{
            unstyled: true,
            classNames: {
                toast: "flex flex-shrink-0 gap-4 w-fit overflow-hidden p-6 rounded-full transition-all transform-gpu \
                    shadow shadow-2xl bg-neutral-950 dark:bg-neutral-50",
                content: "flex-1 flex flex-col justify-center",
                title: "font-semibold",
                icon: "size-6",
                success: "text-accent-300 [&_svg]:fill-accent-300 [&_svg_path]:stroke-neutral-950 \
                    dark:text-primary-600 dark:[&_svg]:fill-primary-600 dark:[&_svg_path]:stroke-neutral-50"
            }
        }} icons={{
            success: <CircleCheckIcon />,
            error: <CircleXIcon />,
        }} />
    </>
}    

const Card = motion.create((
    {children, className, mouseX, mouseY, ref: forwardedRef}: 
    HTMLProps<HTMLElement> & {mouseX: MotionValue<number>, mouseY: MotionValue<number>}
) => {

    const ref = useRef<HTMLDivElement>(null);
    useImperativeHandle(forwardedRef, () => ref.current as HTMLDivElement);

    const refX = useMotionValue(0);
    const refY = useMotionValue(0);

    const updateRefPosition = () => {
        if(ref.current) {
            refX.set(ref.current.getBoundingClientRect().left);
            refY.set(ref.current.getBoundingClientRect().top);
        }
    }

    useEffect(() => {
        updateRefPosition();
        window.addEventListener("scroll", updateRefPosition);

        return () => {
            window.removeEventListener("scroll", updateRefPosition);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const relativeX = useTransform<number, string>([mouseX, refX], ([mouseX, refX]) => `${ref.current ? mouseX - refX : mouseX}px`);
    const relativeY = useTransform<number, string>([mouseY, refY], ([mouseY, refY]) => `${ref.current ? mouseY - refY : mouseY}px`);

    return <motion.div ref={ref} className={cn("card", className)} style={{
        "--spotlight-x": relativeX,
        "--spotlight-y": relativeY,
    }}>
        <div className="card-content transition-all">{children}</div>
    </motion.div>
});

const Timeline = ({items, className}: HTMLProps<HTMLElement> & {items: Experience[]}) =>
    <div className={className}>
        {items.map(({dates, title, company, description}, i) => <div key={i} className="relative flex flex-col">
            {dates[0] && <h3 className="my-4 max-w-30 md:text-right motion-fade-right text-neutral-600 dark:text-neutral-400">{dates[0]}</h3>}            
            <div className="relative flex flex-col items-start ml-8 md:ml-40">
                <div className="absolute -top-1 -left-5 md:-left-14 h-[calc(100%_+_0.75rem)] w-[1px] dark:bg-white/10 bg-black/5"></div>
                <h3 className="motion-fade-left">{title}</h3>
                {company && <h3 className="text-gradient-primary motion-fade-left">{company}</h3>}
                <p className="leading-4 motion-fade-left">{description}</p>
            </div>
            {dates[1] && (dates[1] !== items[i + 1].dates[0]) && 
                <h3 className="my-4 max-w-30 md:text-right motion-fade-right text-neutral-600 dark:text-neutral-400">{dates[1]}</h3>}
        </div>)}
    </div>;