import { AfterViewInit, Component, HostListener } from '@angular/core';
import { FeatherIconNames } from 'feather-icons';
import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from '../../tailwind.config';
import { Config, KeyValuePair } from 'tailwindcss/types/config';
import { Observable, fromEvent, map, startWith } from 'rxjs';
import { panelAnimation } from './dropdown-trigger-for.directive';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe-decorator';
import { ScrollRevealService } from './scroll-reveal.service';

export type Theme = undefined | 'light' | 'dark';
export type ThemableWindow = Window & typeof globalThis & {updateTheme: Function};

export type Skill = {
    category: string,
    icon: FeatherIconNames,
    items: string[],
    description: string
}

export type Experience = {
    title?: string,
    company: string,
    dates: string[],
    description: string
}

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    animations: [panelAnimation]
})
export class AppComponent implements AfterViewInit  {

    @HostListener('window:scroll') onScroll () {

        this.navScrollProgress = ((document.documentElement.scrollTop - 80) / 176 * 100).clamp(0, 100);
    }

    @HostListener('window:resize') onResize () {

        const breakpoints: KeyValuePair = this.config.theme?.screens as KeyValuePair;

        this.isMd = matchMedia(`(min-width: ${breakpoints['sm']})`).matches;
    }

    private config: Config = resolveConfig(tailwindConfig);

    navScrollProgress: number = 0

    seniority: number = (new Date).getFullYear() - 2013;

    skills: Skill[] = [
        {
            category: 'BI',
            icon: 'bar-chart-2',
            items: ['Qlik Sense', 'Power BI'],
            description: 'Collecte et agrégation de données multi-plateformes en indicateurs de gestion et publication de rapports aux collaborateurs.'
        },
        {
            category: 'Interface Web',
            icon: 'layout',
            items: ['HTML', 'CSS', 'JS', 'Angular', 'Tailwind'],
            description: 'Développement de PWA et d\'interfaces utilisateur pour de la gestion métier (planifications, gestion de ressources internes).'
        },
        {
            category: 'Langage Serveur',
            icon: 'server',
            items: ['PHP', 'NodeJS', 'Laravel'],
            description: 'Développement d\'applications backend de gestion, d\'API Rest pour applications mobiles et gestion de tâches automatiques entre systèmes.'
        },
        {
            category: 'Base de donnée',
            icon: 'database',
            items: ['SQL', 'MongoDB', 'Redis'],
            description: 'Développement de requêtes et de modèles de base de donnée pour des applications temps réel et des rapports BI.'
        },
        {
            category: 'CMS',
            icon: 'globe',
            items: ['Wordpress'],
            description: 'Maintenance de sites internet et développement de thèmes et plugins sous Wordpress.'
        }
    ];

    experiences: Experience[] = [
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

    training: Experience[] = [
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

    themes: {name: string, icon: FeatherIconNames, action: () => void}[] = [
        {name: 'Clair', icon: 'sun', action: () => this.setTheme('light')},
        {name: 'Sombre', icon: 'moon', action: () => this.setTheme('dark')},
        {name: 'Système', icon: 'monitor', action: () => this.setTheme(undefined)}
    ];

    theme: Theme = localStorage.getItem('theme') as Theme;

    isMd: boolean = false;

    constructor(private scrollReveal: ScrollRevealService) { 
        
        this.onResize();

        this.onMedia('(prefers-color-scheme: dark)')
            .subscribe(() => setTimeout(() => (window as ThemableWindow).updateTheme(), 0));
    }

    ngAfterViewInit(): void {
        this.scrollReveal.sync();
    }

    mailMe () {
        location.href = 'mailto:' + ['contact@quentindion', 'me'].join('.');
    }

    setTheme (value: Theme) {

        if(value) localStorage.setItem('theme', value);
        else localStorage.removeItem('theme');

        this.theme = value;

        (window as ThemableWindow).updateTheme();
    }

    @AutoUnsubscribe()
    onMedia (query: string): Observable<Boolean> {

        const mediaQuery = matchMedia(query);
        
        return fromEvent<MediaQueryList>(mediaQuery, 'change').pipe(
            startWith(mediaQuery),
            map((list: MediaQueryList) => list.matches)
        );
    }
}
