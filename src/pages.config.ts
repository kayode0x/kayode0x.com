/**
 * Page Metadata Configuration
 * 
 * Centralized SEO metadata for all static pages. Single source of truth
 * for titles and descriptions to ensure consistency across the site.
 * 
 * Usage:
 * ```astro
 * ---
 * import BaseLayout from '../layouts/BaseLayout.astro';
 * import SEO from '../components/SEO.astro';
 * import { pagesConfig } from '../pages.config';
 * ---
 * 
 * <BaseLayout>
 *   <SEO 
 *     slot="head"
 *     title={pagesConfig.projects.title}
 *     description={pagesConfig.projects.description}
 *   />
 *   <!-- Page content -->
 * </BaseLayout>
 * ```
 * 
 * @module pages.config
 */

/**
 * Page metadata interface
 */
interface PageMeta {
    /** Page title (used in browser tab and SEO) */
    title: string;

    /** Page description (used in meta tags and SEO) */
    description: string;

    /** Page heading (displayed as h1, optional - defaults to title) */
    heading?: string;

    /** Page intro text (displayed below heading, optional) */
    intro?: string;
}

/**
 * Pages configuration object
 * 
 * Contains metadata for all static pages. Dynamic pages (like individual
 * project or article pages) generate their own metadata from content.
 */
export const pagesConfig = {
    /**
     * Home page (/)
     * Note: Home page uses siteConfig for title/description as it represents the site itself
     */
    home: {
        title: 'Home',
        // description: "I'm a software engineer who enjoys building things I actually want to use, from backend services to mobile apps and car projects. When I'm not coding, I'm into cars, product ideas, and soccer.",
        description: 'I\'m a software engineer who loves building things I want. From backend systems to mobile apps, and car projects. Big on shipping ideas, tweaking cars, and watching / playing football (soccer).',
    },

    /**
     * Projects listing page (/projects)
     */
    projects: {
        title: 'Projects',
        description: 'Things I\'ve built around software, car projects, and experiments, along with the problems, decisions, and results.',
        heading: 'Projects',
        intro: 'A collection of things I\'ve worked on, from software systems to car projects. I break down the problems, constraints, decisions, and outcomes. Basically how ideas turn into real builds.',
    },

    /**
     * Writing/blog listing page (/writing)
     */
    writing: {
        title: 'Writing',
        description: 'Longer-form thoughts and lessons from building software, working on cars, and figuring things out.',
        heading: 'Writing',
        intro: 'Deeper write-ups from things I\'m building or learning on software architecture, product ideas, car projects, and anything else that feels worth documenting.',
    },

    /**
     * Rants listing page (/rants)
     */
    rants: {
        title: 'Rants',
        description: 'Unfiltered opinions on tech, cars, building products, and whatever else is on my mind.',
        heading: 'Rants',
        intro: 'This is where I\'m more raw. Thoughts on engineering, cars, product building, and random industry takes mostly based on my own experiences and perspective.',
    },

    /**
     * Notes listing page (/notes)
     */
    notes: {
        title: 'Notes',
        description: 'Short thoughts, ideas, and observations from day-to-day life.',
        heading: 'Notes',
        intro: 'Quick notes and lightweight thoughts on software, cars, and building things. Stuff that doesn\'t need a full article but still feels useful or interesting.',
    },

    /**
     * Uses/tools page (/uses)
     */
    uses: {
        title: 'Uses',
        description: 'The tools, tech, and setup I use, both for development and hands-on projects.',
        heading: 'Uses',
        intro: 'A rundown of the tools, software, hardware, and environment I use day to day, from coding to car work. I keep this updated as my workflow changes.',
    },

    /**
     * Contact page (/contact)
     */
    contact: {
        title: 'Contact',
        description: 'Reach out if you want to collaborate, talk tech, or build something together.',
        heading: 'Let\'s Talk',
    },
} as const;

/**
 * Type export for the pages configuration
 */
export type PagesConfig = typeof pagesConfig;

/**
 * Type export for a single page metadata
 */
export type PageConfig = PageMeta;
