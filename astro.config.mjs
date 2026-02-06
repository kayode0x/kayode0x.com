import { defineConfig, envField } from 'astro/config';
import { loadEnv } from 'vite';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

/**
 * Load environment variables from .env file
 * 
 * Uses Vite's loadEnv to read environment variables at build time.
 * Falls back to 'production' if NODE_ENV is not set.
 */
const { SITE_URL } = loadEnv(process.env.NODE_ENV || 'production', process.cwd(), '');

/**
 * Astro configuration object
 * 
 * Defines all build-time settings, integrations, and optimizations for the site.
 * 
 * @see https://astro.build/config
 */
export default defineConfig({
    output: 'static',
    integrations: [mdx(), sitemap()],
    site: SITE_URL || 'https://kayode0x.com',
    env: {
        schema: {
            // Site configuration
            SITE_URL: envField.string({ context: 'client', access: 'public', default: 'https://kayode0x.com' }),
            SITE_LANGUAGE: envField.string({ context: 'client', access: 'public', default: 'en' }),
            SITE_TITLE: envField.string({ context: 'client', access: 'public', default: 'Kayode O. - Software Engineer' }),
            SITE_DESCRIPTION: envField.string({ context: 'client', access: 'public', default: 'Software engineer focused on backend development, mobile apps, and automotive technology.' }),

            // Author information
            SITE_AUTHOR_NAME: envField.string({ context: 'client', access: 'public', default: 'Kayode O.' }),
            SITE_AUTHOR_TITLE: envField.string({ context: 'client', access: 'public', default: 'Software Engineer' }),
            SITE_AUTHOR_BIO: envField.string({ context: 'client', access: 'public', default: 'Software Engineer specializing in building scalable backend systems and mobile applications. I build what I wish existed, including car projects + lessons learned along the way.' }),
            SITE_AUTHOR_EMAIL: envField.string({ context: 'client', access: 'public', default: 'yo@kayode0x.com' }),
            SITE_AUTHOR_LOCATION: envField.string({ context: 'client', access: 'public', default: '' }),

            // Social media links (empty string = hidden)
            SOCIAL_GITHUB: envField.string({ context: 'client', access: 'public', default: 'https://github.com/kayode0x' }),
            SOCIAL_LINKEDIN: envField.string({ context: 'client', access: 'public', default: 'https://linkedin.com/in/kayode0x' }),
            SOCIAL_TWITTER: envField.string({ context: 'client', access: 'public', default: 'https://x.com/kayode0x' }),
            SOCIAL_INSTAGRAM: envField.string({ context: 'client', access: 'public', default: 'https://instagram.com/kayode0x' }),
        },
    },
    markdown: {
        shikiConfig: {
            theme: 'dracula',
            wrap: true
        }
    }
});
